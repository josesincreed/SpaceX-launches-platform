import os
import boto3
from boto3.dynamodb.conditions import Key

table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])


def query_by_status(status: str):
    response = table.query(
        IndexName="GSI_Status",
        KeyConditionExpression=Key("status").eq(status)
    )
    return response.get("Items", [])


def query_by_rocket(rocket_name: str):
    response = table.query(
        IndexName="GSI_Rocket",
        KeyConditionExpression=Key("rocket_name").eq(rocket_name)
    )
    return response.get("Items", [])


def query_by_launchpad(launchpad: str):
    response = table.query(
        IndexName="GSI_Launchpad",
        KeyConditionExpression=Key("launchpad").eq(launchpad)
    )
    return response.get("Items", [])


def query_by_launch_date(launch_date: str):
    response = table.query(
        IndexName="GSI_LaunchDate",
        KeyConditionExpression=Key("launch_date").eq(launch_date)
    )
    return response.get("Items", [])


def query_all():
    items = []
    response = table.scan()
    items.extend(response.get("Items", []))

    while "LastEvaluatedKey" in response:
        response = table.scan(
            ExclusiveStartKey=response["LastEvaluatedKey"]
        )
        items.extend(response.get("Items", []))

    return items
