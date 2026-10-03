import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-hmm-clarity-engine-secret-key-linges-d-waran')

DEBUG = os.environ.get('DEBUG', 'True').lower() in ('true', '1')

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'hmm_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'hmm_backend.wsgi.application'

# =========================================================================
# DATABASE: MySQL Server (Railway & Cloud Configurable with Local Fallback)
# STRICTLY NO SQLITE
# =========================================================================
import urllib.parse

db_host = os.environ.get('MYSQLHOST') or os.environ.get('DB_HOST', 'localhost')
db_port = os.environ.get('MYSQLPORT') or os.environ.get('DB_PORT', '3306')
db_user = os.environ.get('MYSQLUSER') or os.environ.get('DB_USER', 'root')
db_password = os.environ.get('MYSQLPASSWORD') or os.environ.get('MYSQL_ROOT_PASSWORD') or os.environ.get('DB_PASSWORD', 'Lingeswaran@123')
db_name = os.environ.get('MYSQLDATABASE') or os.environ.get('MYSQL_DATABASE') or os.environ.get('DB_NAME', 'hmm_db')

# Support Railway / Cloud direct connection URL
mysql_conn_url = os.environ.get('MYSQL_URL') or os.environ.get('DATABASE_URL')
if mysql_conn_url:
    try:
        parsed_url = urllib.parse.urlparse(mysql_conn_url)
        db_host = parsed_url.hostname or db_host
        db_port = str(parsed_url.port or db_port)
        db_user = parsed_url.username or db_user
        db_password = urllib.parse.unquote(parsed_url.password or '') or db_password
        db_name = parsed_url.path.lstrip('/') or db_name
    except Exception as e:
        pass

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': db_name,
        'USER': db_user,
        'PASSWORD': db_password,
        'HOST': db_host,
        'PORT': db_port,
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}

# CORS settings to allow frontend communication
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    'https://*.up.railway.app',
    'https://*.railway.app',
    'http://localhost:8000',
    'http://localhost:5173',
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
