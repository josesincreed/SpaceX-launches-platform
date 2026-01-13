from spacex_client import (get_historical_launches,   get_upcoming_launches,   get_rocket_name,   get_launchpad_name,   derive_launch_status)
from dynamodb_repository import upsert_launch
from models import Launch
import json


def normalize_key(value: str) -> str:
    return value.strip().upper()


def lambda_handler(event, context):
   
    historical_launches = get_historical_launches()
    upcoming_launches = get_upcoming_launches(limit=5)

    launches_map = {
        launch["id"]: launch for launch in historical_launches
    }

    for launch in upcoming_launches:
        launches_map[launch["id"]] = launch

    all_launches = list(launches_map.values())

    rocket_cache: dict[str, str] = {}
    launchpad_cache: dict[str, str] = {}

    processed = 0

    for item in all_launches:
        status = normalize_key(derive_launch_status(item))

        rocket_id = item.get("rocket")
        launchpad_id = item.get("launchpad")

        if not rocket_id or not launchpad_id:
            continue

        # Cache de nombres, reduce llamadas HTTP
        if rocket_id not in rocket_cache:
            rocket_cache[rocket_id] = normalize_key(
                get_rocket_name(rocket_id)
            )

        if launchpad_id not in launchpad_cache:
            launchpad_cache[launchpad_id] = normalize_key(
                get_launchpad_name(launchpad_id)
            )

        launch = Launch(
            launch_id=item["id"],
            mission_name=item.get("name", "UNKNOWN"),
            mission_purpose=item.get("details") or "",
            rocket_name=rocket_cache[rocket_id],
            launch_date=item["date_utc"],
            status=status,
            launchpad=launchpad_cache[launchpad_id],
            payloads=item.get("payloads", [])
        )

        upsert_launch(launch)
        processed += 1

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization"
        },
        "body": json.dumps({
            "processed": processed,
            "historical_launches": len(historical_launches),
            "upcoming_launches": len(upcoming_launches),
            "total": processed
        })
    }
