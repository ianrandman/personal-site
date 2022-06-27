from flask import request
from flask_restful import Resource

from util.db_utils import update_location_url, \
    fetch_new_strava_activities, update_strava_activity, delete_strava_activity
from util.strava_utils import load_sensitive_info
from util.update_instagram import update_instagram_highlight
from util.update_location import update_location_selenium


class AdminResource(Resource):

    def post(self):
        content = request.get_json()
        request_type = content.get('request_type')
        password = content.get('password')
        google_location_share_link = content.get('google_location_share_link')
        strava_activity_id = content.get('strava_activity_id')

        sensitive_info = load_sensitive_info()
        if password != sensitive_info['password']:
            return {
                'success': False,
                'reason': 'wrong password'
            }

        try:
            if request_type == 'update_google_location_share_link':
                if google_location_share_link is None or google_location_share_link == '':
                    return {
                        'success': False,
                        'reason': 'no google share link supplied'
                    }

                if not google_location_share_link.startswith('https'):
                    google_location_share_link = google_location_share_link[google_location_share_link.index('http'):]

                update_location_url(google_location_share_link)
                update_location_selenium()
            elif request_type == 'fetch_new_strava_activities':
                fetch_new_strava_activities()
            elif request_type == 'update_strava_activity':
                if strava_activity_id is None or strava_activity_id == '':
                    return {
                        'success': False,
                        'reason': 'no strava activity id supplied'
                    }

                update_strava_activity(strava_activity_id)
            elif request_type == 'delete_strava_activity':
                if strava_activity_id is None or strava_activity_id == '':
                    return {
                        'success': False,
                        'reason': 'no strava activity id supplied'
                    }

                delete_strava_activity(strava_activity_id)
            elif request_type == 'refresh_instagram_highlight':
                url = 'https://instasave.biz/api/search/highlightedStories/highlight:17880159521677171'
                success = update_instagram_highlight(url)
                if not success:
                    return {
                        'success': False,
                        'reason': url
                    }
        except Exception as e:
            return {
                'success': False,
                'reason': str(e)
            }

        return {
            'success': True
        }
