from flask_restful import Resource

from util.db_utils import get_current_location


class LocationResource(Resource):

    def get(self):
        try:
            current_location_obj = get_current_location()
            lat_lon_time = current_location_obj.json
        except Exception:
            lat_lon_time = dict()

        return lat_lon_time
