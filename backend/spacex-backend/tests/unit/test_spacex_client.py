from unittest.mock import patch, MagicMock
import pytest

from ingest.spacex_client import (
    get_historical_launches,
    get_upcoming_launches,
    derive_launch_status,
    get_rocket_name,
    get_launchpad_name,
)
# Helpers
def mock_response(json_data, status_code=200):
    mock = MagicMock()
    mock.status_code = status_code
    mock.json.return_value = json_data
    mock.raise_for_status.return_value = None
    return mock

# Tests
@patch("ingest.spacex_client.requests.post")
def test_get_upcoming_launches(mock_post):
    mock_post.return_value = mock_response({
        "docs": [
            {"id": "1", "upcoming": True},
            {"id": "2", "upcoming": True},
        ]
    })

    launches = get_upcoming_launches(limit=2)

    assert len(launches) == 2
    assert launches[0]["upcoming"] is True
    mock_post.assert_called_once()


@patch("ingest.spacex_client.requests.post")
def test_get_historical_launches(mock_post):
    # Cada llamada por año devuelve 1 launch
    mock_post.return_value = mock_response({
        "docs": [{"id": "H1"}]
    })

    launches = get_historical_launches()

    # De 2022 a 2008 = 15 años
    assert len(launches) == 15
    assert mock_post.call_count == 15


def test_derive_launch_status():
    assert derive_launch_status({"upcoming": True}) == "SCHEDULED"
    assert derive_launch_status({"success": True}) == "SUCCESS"
    assert derive_launch_status({"success": False}) == "FAILED"
    assert derive_launch_status({}) == "FAILED"


@patch("ingest.spacex_client.requests.get")
def test_get_rocket_name(mock_get):
    mock_get.return_value = mock_response({"name": "Falcon 9"})

    name = get_rocket_name("rocket-id")

    assert name == "Falcon 9"
    mock_get.assert_called_once()


@patch("ingest.spacex_client.requests.get")
def test_get_launchpad_name(mock_get):
    mock_get.return_value = mock_response({"name": "Cape Canaveral"})

    name = get_launchpad_name("launchpad-id")

    assert name == "Cape Canaveral"
    mock_get.assert_called_once()
