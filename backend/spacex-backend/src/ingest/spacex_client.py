import requests
from typing import List
from datetime import datetime, timezone

SPACEX_BASE_URL = "https://api.spacexdata.com/v4"

def _query_launches_by_year(year: int, limit: int = 20) -> List[dict]:
    response = requests.post(
        f"{SPACEX_BASE_URL}/launches/query",
        json={
            "query": {
                "upcoming": False,
                "date_utc": {
                    "$gte": f"{year}-01-01T00:00:00.000Z",
                    "$lte": f"{year}-12-31T23:59:59.999Z"
                }
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


def get_historical_launches() -> List[dict]:
    launches: List[dict] = []

    for year in range(2022, 2007, -1):  # 2022 → 2008
        yearly_launches = _query_launches_by_year(year, limit=20)
        launches.extend(yearly_launches)

    return launches

def get_upcoming_launches(limit: int = 5) -> List[dict]:

    now_iso = datetime.now(timezone.utc).isoformat()

    response = requests.post(
        f"{SPACEX_BASE_URL}/launches/query",
        json={
            "query": {
                "upcoming": True,
                "date_utc": {
                    "$gt": now_iso
                }
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

    if launch.get("upcoming") is True:
        return "SCHEDULED"

    if launch.get("success") is True:
        return "SUCCESS"

    if launch.get("success") is False:
        return "FAILED"

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
