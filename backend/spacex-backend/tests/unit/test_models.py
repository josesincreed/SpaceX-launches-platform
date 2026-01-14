from ingest.models import Launch


def test_launch_model_creation():
    launch = Launch(
        launch_id="123",
        mission_name="FalconSat",
        mission_purpose="Test mission",
        rocket_name="FALCON 1",
        launch_date="2006-03-24T22:30:00.000Z",
        status="FAILED",
        launchpad="Kwajalein Atoll",
        payloads=["FalconSAT-2"]
    )

    assert launch.launch_id == "123"
    assert launch.mission_name == "FalconSat"
    assert launch.mission_purpose == "Test mission"
    assert launch.rocket_name == "FALCON 1"
    assert launch.launch_date == "2006-03-24T22:30:00.000Z"
    assert launch.status == "FAILED"
    assert launch.launchpad == "Kwajalein Atoll"
    assert launch.payloads == ["FalconSAT-2"]
