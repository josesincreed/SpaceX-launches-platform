import os
import boto3
from datetime import datetime
from .models import Launch

table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])


def upsert_launch(launch: Launch):
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
