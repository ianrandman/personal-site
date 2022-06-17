import json

from flask import send_file
from flask_restful import Resource
import os

class LocationResource(Resource):

    def get(self):
        try:
            with open(os.path.join(os.path.dirname(__file__), '..', 'resources', 'location.json'), 'r') as fp:
                lat_lon_time = json.load(fp)
        except Exception:
            lat_lon_time = dict()

        return lat_lon_time
        # return {
        #     'lat': 36.105069,
        #     'lon': -88.995115,
        #     'recorded_time': 1655421363635
        # }


class RouteResource(Resource):

    def get(self):
        route_filename = os.path.join(os.path.dirname(__file__), '..', 'resources', 'Florida_to_Alaska.kml')
        return send_file(route_filename)
        # with open(route_filename, 'rb') as f:
        #     return f
