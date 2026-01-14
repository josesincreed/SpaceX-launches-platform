import json
from unittest.mock import patch

import pytest

# Importamos desde el módulo real
from ingest.app import lambda_handler, normalize_key


def test_normalize_key():
    assert normalize_key(" success ") == "SUCCESS"
    assert normalize_key("failed") == "FAILED"
    assert normalize_key(" Upcoming ") == "UPCOMING"


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
    """
    Test unitario del handler de ingest:
    - No llama APIs reales
    - No escribe en DynamoDB real
    - Valida el flujo completo
    """

    # ---------- Arrange (datos de entrada mockeados) ----------

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
            "rocket": "R1",        # mismo rocket → prueba cache
            "launchpad": "L1",     # mismo launchpad → prueba cache
            "date_utc": "2026-01-01T00:00:00Z",
            "payloads": [],
        }
    ]

    mock_get_historical.return_value = historical_launches
    mock_get_upcoming.return_value = upcoming_launches
    mock_derive_status.return_value = "success"
    mock_get_rocket_name.return_value = "Falcon 9"
    mock_get_launchpad_name.return_value = "Cape Canaveral"

    # ---------- Act ----------

    response = lambda_handler(event={}, context={})

    # ---------- Assert (validaciones) ----------

    # Respuesta HTTP
    assert response["statusCode"] == 200
    assert "body" in response

    body = json.loads(response["body"])

    assert body["processed"] == 2
    assert body["historical_launches"] == 1
    assert body["upcoming_launches"] == 1
    assert body["total"] == 2

    # Dependencias llamadas correctamente
    mock_get_historical.assert_called_once()
    mock_get_upcoming.assert_called_once_with(limit=5)

    # upsert_launch debe llamarse una vez por launch procesado
    assert mock_upsert_launch.call_count == 2

    # Cache funcionando: mismos IDs → solo una llamada
    mock_get_rocket_name.assert_called_once_with("R1")
    mock_get_launchpad_name.assert_called_once_with("L1")
