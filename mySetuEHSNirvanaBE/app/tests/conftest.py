import pytest
from starlette.testclient import TestClient
from app.main import app
from app.database import override_get_db

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture(scope="module")
def override_get_db():
    # Implement override logic as needed
    pass
