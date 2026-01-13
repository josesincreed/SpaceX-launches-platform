import requests
from typing import Dict

SPACEX_BASE_URL = "https://api.spacexdata.com/v4"


def get_launches(limit: int = 56):
    """
    Obtiene los últimos lanzamientos pasados (ordenados por fecha descendente)
    """
    response = requests.post(
        f"{SPACEX_BASE_URL}/launches/query",
        json={
            "query": {
                "date_utc": {"$lt": "now"}
            },
            "options": {
                "limit": limit,
                "sort": {
                    "date_utc": "desc"
                }
            }
        },
        timeout=10
    )
    response.raise_for_status()
    return response.json()["docs"]


def get_upcoming_launches(limit: int = 10):
    """
    Obtiene los próximos lanzamientos futuros (upcoming)
    """
    response = requests.post(
        f"{SPACEX_BASE_URL}/launches/query",
        json={
            "query": {
                "upcoming": True
            },
            "options": {
                "limit": limit,
                "sort": {
                    "date_utc": "asc"
                }
            }
        },
        timeout=10
    )
    response.raise_for_status()
    return response.json()["docs"]


def derive_launch_status(launch: dict) -> str:
    """
    Determina el estado CANÓNICO del lanzamiento.
    Evita UNKNOWN para mantener consistencia en métricas y UI.
    """

    if launch.get("upcoming") is True:
        return "SCHEDULED"

    if launch.get("success") is True:
        return "SUCCESS"

    # Incluye success == False o None
    return "FAILED"



def get_rocket_name(rocket_id: str) -> str:
    response = requests.get(
        f"{SPACEX_BASE_URL}/rockets/{rocket_id}",
        timeout=10
    )
    response.raise_for_status()
    return response.json().get("name", "UNKNOWN")


def get_launchpad_name(launchpad_id: str) -> str:
    response = requests.get(
        f"{SPACEX_BASE_URL}/launchpads/{launchpad_id}",
        timeout=10
    )
    response.raise_for_status()
    return response.json().get("name", "UNKNOWN")
