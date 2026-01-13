import json
from urllib.parse import unquote_plus

from dynamodb_repository import (
    query_all,
    query_by_status,
    query_by_rocket,
    query_by_launchpad,
    query_by_launch_date
)


def normalize_key(value: str) -> str:
    return unquote_plus(value).strip().upper()


def lambda_handler(event, context):
    params = event.get("pathParameters") or {}

    # /api/v1/launches/status/{status}
    if "status" in params:
        items = query_by_status(normalize_key(params["status"]))

    # /api/v1/launches/rocket/{rocket}
    elif "rocket" in params:
        items = query_by_rocket(normalize_key(params["rocket"]))

    # /api/v1/launches/launchpad/{launchpad}
    elif "launchpad" in params:
        items = query_by_launchpad(normalize_key(params["launchpad"]))

    # /api/v1/launches/date/{launch_date}
    elif "launch_date" in params:
        items = query_by_launch_date(params["launch_date"].strip())

    # /api/v1/launches
    else:
        items = query_all()

    return {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization"
    },
    "body": json.dumps(items)
}

