from spacex_client import get_launches, get_rocket_name, get_launchpad_name
from dynamodb_repository import upsert_launch
from models import Launch


def lambda_handler(event, context):
    launches = get_launches()

    # 🔹 Limitar ingestión (últimos 10 lanzamientos)
    launches = launches[:10]

    rocket_cache = {}
    launchpad_cache = {}

    processed = 0

    for item in launches:
        status = (
            "SUCCESS" if item.get("success") is True
            else "FAILED" if item.get("success") is False
            else "SCHEDULED"
        )

        rocket_id = item["rocket"]
        launchpad_id = item["launchpad"]

        if rocket_id not in rocket_cache:
            rocket_cache[rocket_id] = get_rocket_name(rocket_id)

        if launchpad_id not in launchpad_cache:
            launchpad_cache[launchpad_id] = get_launchpad_name(launchpad_id)

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
        "body": {
            "processed": processed
        }
    }
