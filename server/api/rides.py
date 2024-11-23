from datetime import datetime

from flask import request
from flask_restful import Resource

from util import rides


class RidesResource(Resource):

    def get(self):
        args = request.args
        ride_codename = args.get('ride_codename', default=None)
        local_tz = datetime.now().astimezone().tzinfo
        current_date = datetime.now(local_tz)
        start_date = rides[ride_codename]['start_date'].astimezone(local_tz)
        end_date = rides[ride_codename]['end_date'].astimezone(local_tz)
        return dict(
            is_current=start_date <= current_date <= end_date
        )


