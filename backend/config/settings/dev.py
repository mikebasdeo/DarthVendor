from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

PROJECT_APPS = [
    'backend.apps.v1.accounts.apps.AccountsConfig',
    'backend.apps.v1.inventory.apps.InventoryConfig',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
