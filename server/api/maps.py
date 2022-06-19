from flask_restful import Resource

from util.model import Location


class LocationResource(Resource):

    def get(self):
        try:
            current_location_obj = Location.query.limit(1).all()[0]
            lat_lon_time = current_location_obj.json
        except Exception:
            lat_lon_time = dict()

        return lat_lon_time
