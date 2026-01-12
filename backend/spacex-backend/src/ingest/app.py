from .spacex_client import get_launches, get_rocket_name, get_launchpad_name
from .dynamodb_repository import upsert_launch
from .models import Launch


def lambda_handler(event, context):
    launches = get_launches()
    processed = 0

    for item in launches:
        status = (
            "SUCCESS" if item.get("success") is True
            else "FAILED" if item.get("success") is False
            else "SCHEDULED"
        )

        rocket_name = get_rocket_name(item["rocket"])
        launchpad_name = get_launchpad_name(item["launchpad"])

        launch = Launch(
            launch_id=item["id"],
            mission_name=item.get("name", "Unknown"),
            mission_purpose=item.get("details") or "",
            rocket_name=rocket_name,
            launch_date=item["date_utc"],
            status=status,
            launchpad=launchpad_name,
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
