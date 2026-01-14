import json
import os
from unittest.mock import patch

from src.query.app import lambda_handler, normalize_key


# ---- SETUP GLOBAL PARA TESTS ----
def setup_module(module):
    # Evita KeyError: TABLE_NAME en imports internos
    os.environ["TABLE_NAME"] = "test-table"


def test_normalize_key():
    assert normalize_key("success") == "SUCCESS"
    assert normalize_key("Falcon%209") == "FALCON 9"


@patch("src.query.app.query_by_status")
def test_query_by_status(mock_query_by_status):
    mock_query_by_status.return_value = [{"id": "1"}]

    event = {
        "pathParameters": {
            "status": "success"
        }
    }

    response = lambda_handler(event, None)
    body = json.loads(response["body"])

    assert response["statusCode"] == 200
    assert body == [{"id": "1"}]

    mock_query_by_status.assert_called_once_with("SUCCESS")


@patch("src.query.app.query_by_rocket")
def test_query_by_rocket(mock_query_by_rocket):
    mock_query_by_rocket.return_value = [{"id": "2"}]

    event = {
        "pathParameters": {
            "rocket": "Falcon%209"
        }
    }

    response = lambda_handler(event, None)
    body = json.loads(response["body"])

    assert body == [{"id": "2"}]
    mock_query_by_rocket.assert_called_once_with("FALCON 9")


@patch("src.query.app.query_all")
def test_query_all(mock_query_all):
    mock_query_all.return_value = [{"id": "ALL"}]

    event = {}

    response = lambda_handler(event, None)
    body = json.loads(response["body"])

    assert body == [{"id": "ALL"}]
    mock_query_all.assert_called_once()
