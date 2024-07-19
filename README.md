Task Management Application
Table of Contents
•	Requirements
•	Setup
•	Project Structure
•	Configuration
•	Database
•	Running the Application
•	Running Tests
Requirements
Python 3.12.3
PostgreSQL
Node.js
npm or yarn
Setup
Clone the repository:
git clone https://github.com/your-repo/task_management.git
cd task_management
Create and activate a virtual environment:
python -m venv env
source env/bin/activate  # On Windows: .\env\Scripts\activate
Install the Python dependencies:
pip install -r requirements.txt
Install the frontend dependencies:
cd frontend
npm install  # or yarn install
cd ..
Project Structure
mySetuEHSNirvanaBE/
├── alembic/
├── app/
│   ├── __init__.py
│   ├── auth.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── crud/
│   │   ├── __init__.py
│   │   ├── tasks.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── tasks.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_main.py
├── requirements.txt
mySetuEHSNirvanaFE/
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   ├── LoginPage.js
│   ├── contexts/
│   │   ├── AuthProvider.js
│   ├── tests/
│   │   ├── App.test.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
Configuration
Create a .env file in the root directory with the following content:
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
Database
Run database migrations using Alembic:
alembic upgrade head
Running the Application
Start the FastAPI server:
uvicorn app.main:app --reload
Start the frontend development server:
cd frontend
npm start
Running Tests
Install test dependencies:
pip install pytest pytest-asyncio pytest-anyio httpx
Run the tests:
pytest
