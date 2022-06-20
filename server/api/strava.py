from flask import request
from flask_restful import Resource

from util.db_utils import get_activity_count, get_activity_by_num


class StravaResource(Resource):

    def get(self):
        args = request.args
        request_type = args.get('request_type')
        activity_num = args.get('activity_num')

        try:
            if request_type == 'activity_count':
                return {
                    'activity_count': get_activity_count()
                }
            elif request_type == 'activity_by_num':
                return get_activity_by_num(int(activity_num)).json
        except Exception:
            return dict()

        return dict()
