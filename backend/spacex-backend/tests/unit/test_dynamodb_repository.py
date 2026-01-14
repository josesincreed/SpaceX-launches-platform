import os
from unittest.mock import patch, MagicMock

import pytest

from ingest.dynamodb_repository import upsert_launch
from ingest.models import Launch


def create_launch():
    return Launch(
        launch_id="L1",
        mission_name="Mission Test",
        mission_purpose="Testing DynamoDB",
        rocket_name="FALCON 9",
        launch_date="2022-01-01T00:00:00Z",
        status="SUCCESS",
        launchpad="CAPE CANAVERAL",
        payloads=["P1", "P2"],
    )


# -------------------------
# Tests
# -------------------------

def test_upsert_launch_local_mode(capsys):
    """
    Si AWS_SAM_LOCAL=true:
    - No debe llamar a boto3
    - Solo imprime el mensaje
    """
    os.environ["AWS_SAM_LOCAL"] = "true"

    launch = create_launch()

    upsert_launch(launch)

    captured = capsys.readouterr()
    assert "[LOCAL MODE] Upsert launch L1" in captured.out

    # Limpieza
    del os.environ["AWS_SAM_LOCAL"]


@patch("ingest.dynamodb_repository.boto3")
def test_upsert_launch_dynamodb(mock_boto3):
    """
    Test real del put_item:
    - Mock de boto3
    - Verifica que se llame put_item con los campos correctos
    """
    os.environ["TABLE_NAME"] = "fake-table"
    os.environ.pop("AWS_SAM_LOCAL", None)

    launch = create_launch()

    mock_table = MagicMock()
    mock_resource = MagicMock()
    mock_resource.Table.return_value = mock_table
    mock_boto3.resource.return_value = mock_resource

    upsert_launch(launch)

    mock_boto3.resource.assert_called_once_with("dynamodb")
    mock_resource.Table.assert_called_once_with("fake-table")

    mock_table.put_item.assert_called_once()
    args, kwargs = mock_table.put_item.call_args

    item = kwargs["Item"]

    assert item["launch_id"] == "L1"
    assert item["mission_name"] == "Mission Test"
    assert item["rocket_name"] == "FALCON 9"
    assert item["status"] == "SUCCESS"
    assert "last_updated" in item

    # Limpieza
    del os.environ["TABLE_NAME"]
