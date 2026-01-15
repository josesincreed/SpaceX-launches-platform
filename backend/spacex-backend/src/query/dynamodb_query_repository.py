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
        IndexName="GSI_Status",
        KeyConditionExpression="#st = :s",
        ExpressionAttributeNames={
            "#st": "status"
        },
        ExpressionAttributeValues={
            ":s": status
        }
    )["Items"]


def query_by_rocket(rocket: str):
    table = _get_table()
    return table.query(
        IndexName="GSI_Rocket",
        KeyConditionExpression="#rk = :r",
        ExpressionAttributeNames={
            "#rk": "rocket_name"
        },
        ExpressionAttributeValues={
            ":r": rocket
        }
    )["Items"]


def query_by_launchpad(launchpad: str):
    table = _get_table()
    return table.query(
        IndexName="GSI_Launchpad",
        KeyConditionExpression="#lp = :l",
        ExpressionAttributeNames={
            "#lp": "launchpad"
        },
        ExpressionAttributeValues={
            ":l": launchpad
        }
    )["Items"]


def query_by_launch_date(date: str):
    table = _get_table()
    return table.query(
        IndexName="GSI_LaunchDate",
        KeyConditionExpression="#ld = :d",
        ExpressionAttributeNames={
            "#ld": "launch_date"
        },
        ExpressionAttributeValues={
            ":d": date
        }
    )["Items"]
