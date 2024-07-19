import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Test database URL
SQLALCHEMY_TEST_DATABASE_URL = "postgresql://postgres:8182@localhost/Bipindb10_test"

# Create an engine and sessionmaker for testing
engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the get_db dependency with a test session
@pytest.fixture(scope="module")
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Use dependency override in the app
app.dependency_overrides[get_db] = override_get_db

# TestClient fixture with setup and teardown
@pytest.fixture(scope="module")
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)

# Test cases
def test_create_task(client):
    response = client.post(
        "/tasks",
        json={"title": "Test Task", "description": "Task description", "priority": "High", "target_date": "2024-07-18T00:00:00"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["description"] == "Task description"

def test_read_tasks(client):
    response = client.get("/tasks")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
