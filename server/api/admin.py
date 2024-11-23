from flask import request
from flask_restful import Resource
import traceback

from util.db_utils import update_location_url, \
    fetch_new_strava_activities, update_strava_activity, delete_strava_activity, delete_recent_strava_activity, \
    update_location_zoleo_db
from util.strava_utils import load_sensitive_info
from util.update_instagram import update_instagram_highlight
from util.update_location import update_location_selenium


class AdminResource(Resource):

    def post(self):
        content = request.get_json()
        request_type = content.get('request_type')
        ride_codename = content.get('ride_codename')
        password = content.get('password')
        google_location_share_link = content.get('google_location_share_link')
        update_location_zoleo = content.get('update_location_zoleo')
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

                update_location_url(google_location_share_link, ride_codename)
                success, reason = update_location_selenium(ride_codename)
                if not success:
                    return {
                        'success': False,
                        'reason': reason
                    }
            elif request_type == 'update_location_zoleo':
                if update_location_zoleo is None or update_location_zoleo == '':
                    return {
                        'success': False,
                        'reason': 'no zoleo message supplied'
                    }

                if 'location is ' not in update_location_zoleo:
                    return {
                        'success': False,
                        'reason': 'no location found'
                    }
                if 'sms2zoleo.com' not in update_location_zoleo:
                    return {
                        'success': False,
                        'reason': 'no sms2zoleo.com link found'
                    }

                coordinate_string = update_location_zoleo[
                                    update_location_zoleo.index('location is ') + 12:
                                    update_location_zoleo.index(' Map')]
                lat_lon = [float(num) for num in coordinate_string.split(', ')]
                url = update_location_zoleo[update_location_zoleo.index('http'):]

                update_location_zoleo_db(lat_lon, url)
            elif request_type == 'fetch_new_strava_activities':
                fetch_new_strava_activities(ride_codename=ride_codename)
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

            elif request_type == 'delete_recent_strava_activity':
                delete_recent_strava_activity(ride_codename=ride_codename)

            elif request_type == 'refresh_instagram_highlight':
                url = 'https://instastories.watch/api/profile/highlight_items?highlightId=highlight%3A17880159521677171'
                success, reason = update_instagram_highlight(url)
                if not success:
                    return {
                        'success': False,
                        'reason': reason
                    }
        except Exception as e:
            traceback.print_exc() 
            return {
                'success': False,
                'reason': str(e), 
                'traceback': traceback.format_exc() 
            }

        return {
            'success': True
        }
