import json
from unittest.mock import patch

from ingest.app import lambda_handler, normalize_key


def test_normalize_key():
    assert normalize_key(" success ") == "SUCCESS"
    assert normalize_key("failed") == "FAILED"


@patch("ingest.app.upsert_launch")
@patch("ingest.app.get_launchpad_name")
@patch("ingest.app.get_rocket_name")
@patch("ingest.app.derive_launch_status")
@patch("ingest.app.get_upcoming_launches")
@patch("ingest.app.get_historical_launches")
def test_lambda_handler_happy_path(
    mock_get_historical,
    mock_get_upcoming,
    mock_derive_status,
    mock_get_rocket_name,
    mock_get_launchpad_name,
    mock_upsert_launch,
):
    historical_launches = [
        {
            "id": "H1",
            "name": "Mission One",
            "details": "Test mission",
            "rocket": "R1",
            "launchpad": "L1",
            "date_utc": "2022-01-01T00:00:00Z",
            "payloads": ["P1"],
        }
    ]

    upcoming_launches = [
        {
            "id": "U1",
            "name": "Mission Two",
            "details": None,
            "rocket": "R1",
            "launchpad": "L1",
            "date_utc": "2026-01-01T00:00:00Z",
            "payloads": [],
        }
    ]

    mock_get_historical.return_value = historical_launches
    mock_get_upcoming.return_value = upcoming_launches
    mock_derive_status.return_value = "success"
    mock_get_rocket_name.return_value = "Falcon 9"
    mock_get_launchpad_name.return_value = "Cape Canaveral"

    response = lambda_handler({}, {})

    body = json.loads(response["body"])

    assert response["statusCode"] == 200
    assert body["processed"] == 2
    assert body["historical_launches"] == 1
    assert body["upcoming_launches"] == 1
    assert body["total"] == 2

    assert mock_upsert_launch.call_count == 2
    mock_get_rocket_name.assert_called_once_with("R1")
    mock_get_launchpad_name.assert_called_once_with("L1")
