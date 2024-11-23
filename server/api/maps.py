from flask import request
from flask_restful import Resource

import traceback

from init_db import limiter
from util.db_utils import get_current_location
from util.update_location import update_location_using_inner


class LocationResource(Resource):
    decorators = [limiter.limit('4/minute; 1 per 15 seconds', methods=["GET"], override_defaults=True,
                                exempt_when=lambda: not eval(request.args.get('do_refresh')))]

    def get(self):
        args = request.args
        do_refresh = eval(args.get('do_refresh'))
        ride_codename = args.get('ride_codename')

        try:
            if do_refresh:
                update_location_using_inner(ride_codename)

            current_location_obj = get_current_location(ride_codename)
            lat_lon_time = current_location_obj.json
        except Exception:
            print(traceback.print_exc())
            lat_lon_time = None

        return lat_lon_time
