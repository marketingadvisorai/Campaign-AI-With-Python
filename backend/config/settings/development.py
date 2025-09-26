from .base import *  # noqa

DEBUG = True
ALLOWED_HOSTS = ['*']
INTERNAL_IPS = ['127.0.0.1']

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

INSTALLED_APPS += [  # type: ignore[name-defined]
    'django_extensions',
]

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [  # type: ignore[name-defined]
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]
