import os
from unittest.mock import MagicMock, patch

from query.dynamodb_query_repository import (
    query_all,
    query_by_status,
    query_by_rocket,
    query_by_launchpad,
    query_by_launch_date
)


@patch.dict(os.environ, {"TABLE_NAME": "test-table"})
@patch("query.dynamodb_query_repository.boto3")
def test_query_all(mock_boto3):
    mock_table = MagicMock()
    mock_table.scan.return_value = {"Items": [{"id": "1"}]}

    mock_boto3.resource.return_value.Table.return_value = mock_table

    items = query_all()

    assert items == [{"id": "1"}]
    mock_table.scan.assert_called_once()


@patch.dict(os.environ, {"TABLE_NAME": "test-table"})
@patch("query.dynamodb_query_repository.boto3")
def test_query_by_status(mock_boto3):
    mock_table = MagicMock()
    mock_table.query.return_value = {"Items": [{"status": "SUCCESS"}]}

    mock_boto3.resource.return_value.Table.return_value = mock_table

    items = query_by_status("SUCCESS")

    assert items == [{"status": "SUCCESS"}]

    mock_table.query.assert_called_once_with(
        IndexName="GSI_Status",
        KeyConditionExpression="#st = :s",
        ExpressionAttributeNames={"#st": "status"},
        ExpressionAttributeValues={":s": "SUCCESS"}
    )


@patch.dict(os.environ, {"TABLE_NAME": "test-table"})
@patch("query.dynamodb_query_repository.boto3")
def test_query_by_rocket(mock_boto3):
    mock_table = MagicMock()
    mock_table.query.return_value = {"Items": [{"rocket_name": "FALCON 9"}]}

    mock_boto3.resource.return_value.Table.return_value = mock_table

    items = query_by_rocket("FALCON 9")

    assert items == [{"rocket_name": "FALCON 9"}]

    mock_table.query.assert_called_once_with(
        IndexName="GSI_Rocket",
        KeyConditionExpression="#rk = :r",
        ExpressionAttributeNames={"#rk": "rocket_name"},
        ExpressionAttributeValues={":r": "FALCON 9"}
    )


@patch.dict(os.environ, {"TABLE_NAME": "test-table"})
@patch("query.dynamodb_query_repository.boto3")
def test_query_by_launchpad(mock_boto3):
    mock_table = MagicMock()
    mock_table.query.return_value = {"Items": [{"launchpad": "KSC"}]}

    mock_boto3.resource.return_value.Table.return_value = mock_table

    items = query_by_launchpad("KSC")

    assert items == [{"launchpad": "KSC"}]

    mock_table.query.assert_called_once_with(
        IndexName="GSI_Launchpad",
        KeyConditionExpression="#lp = :l",
        ExpressionAttributeNames={"#lp": "launchpad"},
        ExpressionAttributeValues={":l": "KSC"}
    )


@patch.dict(os.environ, {"TABLE_NAME": "test-table"})
@patch("query.dynamodb_query_repository.boto3")
def test_query_by_launch_date(mock_boto3):
    mock_table = MagicMock()
    mock_table.query.return_value = {"Items": [{"launch_date": "2020-05-30"}]}

    mock_boto3.resource.return_value.Table.return_value = mock_table

    items = query_by_launch_date("2020-05-30")

    assert items == [{"launch_date": "2020-05-30"}]

    mock_table.query.assert_called_once_with(
        IndexName="GSI_LaunchDate",
        KeyConditionExpression="#ld = :d",
        ExpressionAttributeNames={"#ld": "launch_date"},
        ExpressionAttributeValues={":d": "2020-05-30"}
    )
