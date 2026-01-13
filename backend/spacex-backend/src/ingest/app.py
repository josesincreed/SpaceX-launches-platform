from spacex_client import (
    get_launches,
    get_upcoming_launches,
    get_rocket_name,
    get_launchpad_name,
    derive_launch_status
)
from dynamodb_repository import upsert_launch
from models import Launch
import json


def normalize_key(value: str) -> str:
    return value.strip().upper()


def lambda_handler(event, context):
    """
    Ingesta automática y manual de lanzamientos SpaceX.

    - Ejecutada cada 6 horas vía EventBridge
    - Ejecutable manualmente vía API Gateway
    - Ingiere:
        • Últimos 56 lanzamientos pasados
        • Próximos 4 lanzamientos (upcoming)
    - Aplica upsert idempotente en DynamoDB
    - Estado normalizado desde spacex_client (single source of truth)
    """

    past_launches = get_launches(limit=56)
    upcoming_launches = get_upcoming_launches(limit=4)

    all_launches = past_launches + upcoming_launches

    rocket_cache = {}
    launchpad_cache = {}
    processed = 0

    for item in all_launches:
        # 🔹 Estado CANÓNICO
        status = normalize_key(derive_launch_status(item))

        rocket_id = item["rocket"]
        launchpad_id = item["launchpad"]

        # Cache de nombres (optimización)
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
            mission_name=item.get("name", "Unknown"),
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
            "past_launches": len(past_launches),
            "upcoming_launches": len(upcoming_launches),
            "total": processed
        })
    }
