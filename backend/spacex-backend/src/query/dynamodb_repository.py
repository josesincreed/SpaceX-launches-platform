import os
import boto3


def _get_table():
    return boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])


def query_all():
    table = _get_table()
    return table.scan()["Items"]


def query_by_status(status: str):
    table = _get_table()
    return table.query(
        IndexName="status-index",
        KeyConditionExpression="status = :s",
        ExpressionAttributeValues={":s": status}
    )["Items"]


def query_by_rocket(rocket: str):
    table = _get_table()
    return table.query(
        IndexName="rocket_name-index",
        KeyConditionExpression="rocket_name = :r",
        ExpressionAttributeValues={":r": rocket}
    )["Items"]


def query_by_launchpad(launchpad: str):
    table = _get_table()
    return table.query(
        IndexName="launchpad-index",
        KeyConditionExpression="launchpad = :l",
        ExpressionAttributeValues={":l": launchpad}
    )["Items"]


def query_by_launch_date(date: str):
    table = _get_table()
    return table.query(
        IndexName="launch_date-index",
        KeyConditionExpression="launch_date = :d",
        ExpressionAttributeValues={":d": date}
    )["Items"]
