import requests

BASE_URL = "https://api.spacexdata.com/v4"


def get_launches():
    response = requests.get(f"{BASE_URL}/launches")
    response.raise_for_status()
    return response.json()


def get_rocket_name(rocket_id):
    response = requests.get(f"{BASE_URL}/rockets/{rocket_id}")
    response.raise_for_status()
    return response.json().get("name")


def get_launchpad_name(launchpad_id):
    response = requests.get(f"{BASE_URL}/launchpads/{launchpad_id}")
    response.raise_for_status()
    return response.json().get("name")
