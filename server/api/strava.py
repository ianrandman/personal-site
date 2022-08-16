from flask import request
from flask_restful import Resource

from util.db_utils import get_activities, get_activity


class StravaResource(Resource):

    def get(self):
        args = request.args
        get_all = args.get('get_all', default=False)
        get_polyline = bool(args.get('get_polyline', default=False))
        get_summary_polyline = bool(args.get('get_summary_polyline', default=False))
        get_media = bool(args.get('get_media', default=False))
        id = args.get('id')
        # request_type = args.get('request_type')
        # activity_num = args.get('activity_num')

        try:
            if get_all:
                activities = get_activities()
                return [activity.json(get_polyline, get_summary_polyline, get_media) for activity in activities]
            elif id is not None:
                activity = get_activity(id)
                return activity.json(get_polyline, get_summary_polyline, get_media)
            # for activity in activities:
            #     temp_media_list = activity.media
            #     media_list = list()
            #     for media_obj in temp_media_list:
            #         if media_obj.default_photo:
            #             media_list.append(media_obj)
            #             temp_media_list.remove(media_obj)
            #             break
            #     for media_obj in temp_media_list:
            #         if media_obj.is_video:
            #             media_list.append(media_obj)
            #     for media_obj in temp_media_list:
            #         if not media_obj.is_video:
            #             media_list.append(media_obj)
            #     activity.media = media_list
        except Exception:
            if id is None:
                return list()
            return None
