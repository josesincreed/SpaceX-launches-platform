from dataclasses import dataclass
from typing import List


@dataclass
class Launch:
    launch_id: str
    mission_name: str
    mission_purpose: str
    rocket_name: str
    launch_date: str
    status: str
    launchpad: str
    payloads: List[str]
