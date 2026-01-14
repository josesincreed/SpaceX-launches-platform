import json
from urllib.parse import unquote_plus

from dynamodb_query_repository import (
    query_all,
    query_by_status,
    query_by_rocket,
    query_by_launchpad,
    query_by_launch_date,
)

def normalize_key(value: str) -> str:
    return unquote_plus(value).strip().upper()

def lambda_handler(event, context):
    params = event.get("pathParameters") or {}

    if "status" in params:
        items = query_by_status(normalize_key(params["status"]))
    elif "rocket" in params:
        items = query_by_rocket(normalize_key(params["rocket"]))
    elif "launchpad" in params:
        items = query_by_launchpad(normalize_key(params["launchpad"]))
    elif "launch_date" in params:
        items = query_by_launch_date(params["launch_date"].strip())
    else:
        items = query_all()

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        "body": json.dumps(items),
    }
