from flask import request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy


def limiter_helper():
    if 'X-Real-IP' in request.headers:
        return request.headers['X-Real-IP']
    else:
        return get_remote_address()


db = SQLAlchemy()
limiter = Limiter(
    key_func=limiter_helper,
    default_limits=['20 per minute']
)
