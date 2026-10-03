# Hmm — Django Backend (MySQL 8.0 & Function-Based Views)

This directory contains the Django backend for **Hmm**, built strictly with **MySQL Server 8.0** (no SQLite) and **Function-Based Views/Models**.

---

## Configuration & Architecture

- **Framework**: Django 5.1
- **Database Engine**: `django.db.backends.mysql` (via `pymysql`)
- **Database Name**: `hmm_db`
- **Host / Port**: `localhost:3306`
- **Architecture**: Function-Based Views (`api/views.py`) with direct helper methods in `api/models.py`.

---

## Project Structure

```
backend_django/
├── api/
│   ├── models.py       # HmmUser and SimplifiedDocument models + function-based helpers
│   ├── views.py        # Function-based views: health_check, signup, login, etc.
│   ├── urls.py         # App URL routing
│   └── migrations/     # Django database migrations applied to MySQL
├── hmm_backend/
│   ├── __init__.py     # PyMySQL MySQLdb installation
│   ├── settings.py     # MySQL 8.0 DATABASES config + CORS
│   ├── urls.py         # Root router
│   └── wsgi.py         # WSGI application
├── manage.py
└── requirements.txt
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health/` | Health check reporting MySQL connection and row counts |
| `POST` | `/api/auth/signup/` | Registers citizen in MySQL (`django_users`) with bcrypt/pbkdf2 hashing |
| `POST` | `/api/auth/login/` | Authenticates citizen credentials against MySQL |
| `GET` | `/api/documents/history/?userId=<id>` | Fetches user's saved document simplification history from MySQL |
| `POST` | `/api/process-document/` | Saves and processes uploaded document in MySQL |

---

## Running the Django Server

To run the Django server on port 8000:

```bash
cd backend_django
python manage.py runserver 8000
```
