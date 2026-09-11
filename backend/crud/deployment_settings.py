import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ.get["percipio-fullstack-project-production.up.railway.app"]]
CSRF_TRUSTED_ORIGINS = ["https://" + os.environ.get["percipio-fullstack-project-production.up.railway.app"]]

DEBUG = False
SECRET_KEY = os.environ.get["SECRET_KEY"]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = ["percipio-fullstack-project-production.up.railway.app"]

STORAGES = {
    "default": {
        "BACKEND" : "django.core.storage.FileSystemStorage",
    },
    # ,
    # "staticfiles" : {
    #     "BACKEND" : "whitenoise.storage.CompressedStaticFilesStorage",
    # }
}