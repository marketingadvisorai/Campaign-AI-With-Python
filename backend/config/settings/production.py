from .base import *  # noqa

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [  # type: ignore[name-defined]
    'rest_framework.renderers.JSONRenderer',
]
