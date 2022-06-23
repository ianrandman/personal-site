from flask import request
from flask_restful import Resource

from util.db_utils import get_activities


class StravaResource(Resource):

    def get(self):
        # args = request.args
        # request_type = args.get('request_type')
        # activity_num = args.get('activity_num')

        try:
            return [activity.json for activity in get_activities()]
        except Exception:
            return list()
