import os
from datetime import datetime
from models import Launch

IS_LOCAL = os.environ.get("AWS_SAM_LOCAL") == "true"


def upsert_launch(launch: Launch):
    if IS_LOCAL:
        # Simulación local
        print(f"[LOCAL MODE] Upsert launch {launch.launch_id}")
        return

    import boto3

    table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])

    table.put_item(
        Item={
            "launch_id": launch.launch_id,
            "mission_name": launch.mission_name,
            "mission_purpose": launch.mission_purpose,
            "rocket_name": launch.rocket_name,
            "launch_date": launch.launch_date,
            "status": launch.status,
            "launchpad": launch.launchpad,
            "payloads": launch.payloads,
            "last_updated": datetime.utcnow().isoformat()
        }
    )
