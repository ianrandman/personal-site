from flask import request
from flask_restful import Resource

from util.db_utils import get_activities


class StravaResource(Resource):

    def get(self):
        # args = request.args
        # request_type = args.get('request_type')
        # activity_num = args.get('activity_num')

        try:
            activities = get_activities()
            for activity in activities:
                temp_media_list = activity.media
                media_list = list()
                for media_obj in temp_media_list:
                    if media_obj.default_photo:
                        media_list.append(media_obj)
                        temp_media_list.remove(media_obj)
                        break
                for media_obj in temp_media_list:
                    if media_obj.is_video:
                        media_list.append(media_obj)
                for media_obj in temp_media_list:
                    if not media_obj.is_video:
                        media_list.append(media_obj)
                activity.media = media_list
            return [activity.json for activity in activities]
        except Exception:
            return list()
