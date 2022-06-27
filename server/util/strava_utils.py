import pickle
import time
from datetime import datetime

import requests
import json

import yaml
from stravalib import Client

from init_db import db
from util import SENSITIVE_INFO_YAML_NAME
from util.model import Activity, Media


def load_sensitive_info():
    with open(SENSITIVE_INFO_YAML_NAME, 'r') as file:
        sensitive_info = yaml.load(file, Loader=yaml.FullLoader)

    return sensitive_info

########################################
client = Client()


def load_existing_strava_data(only_new=False):
    authenticate()
    activities = client.get_activities(after=datetime(year=2022, month=6, day=1))  # June 1, 2022 todo
    if only_new:
        db_activities = Activity.query.all()
        db_activity_ids = [activity.id for activity in db_activities]
        activities = [activity for activity in activities if activity.id not in db_activity_ids]

    for activity_summary in activities:
        get_activity_and_insert(activity_summary.id)


def get_activity_and_insert(activity_id, authenticated=True):
    if not authenticated:
        authenticate()
    activity = client.get_activity(activity_id=activity_id)

    activity_obj = Activity(
        id=activity.id,
        name=activity.name,
        description=activity.description,
        distance=activity.distance.num,
        moving_time=str(activity.moving_time),
        elapsed_time=str(activity.elapsed_time),
        start_latlng=str(list(activity.start_latlng)),
        end_latlng=str(list(activity.end_latlng)),
        start_date=int(activity.start_date.timestamp()),
        polyline=activity.map.polyline,
        summary_polyline=activity.map.summary_polyline
    )

    media = get_activity_media(activity_id=activity.id)
    activity_obj.media.extend(media)

    db.session.add(activity_obj)


def get_activity_media(activity_id):
    temp_media_list = list()

    response = requests.get(
        url=f'https://www.strava.com/api/v3/activities/{activity_id}/photos',
        params={
            'photo_sources': True,
            'size': 100
        },
        headers={
            'accept': 'application/json',
            'authorization': f'Bearer {client.access_token}'
        }
    )

    for media in response.json():
        media_obj = Media(
            id=media['unique_id'],
            activity_id=media['activity_id'],
            is_video=bool('video_url' in media),
            default_photo=media['default_photo'],
            video_url=media.get('video_url'),
            small_image_url=media['urls']['100'],
            location=str(media.get('location'))
        )
        temp_media_list.append(media_obj)

    response = requests.get(
        url=f'https://www.strava.com/api/v3/activities/{activity_id}/photos',
        params={
            'photo_sources': True,
            'size': 3000
        },
        headers={
            'accept': 'application/json',
            'authorization': f'Bearer {client.access_token}'
        }
    )

    for media in response.json():
        media_obj = next(item for item in temp_media_list if item.id == media['unique_id'])
        media_obj.large_image_url = media['urls']['3000']

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

    return media_list


def authenticate():
    sensitive_info = load_sensitive_info()

    strava_client_id = sensitive_info['strava_client_id']
    strava_client_secret = sensitive_info['strava_client_secret']
    strava_refresh_token = sensitive_info['strava_refresh_token']
    strava_expires_at = sensitive_info['strava_expires_at']

    if time.time() > strava_expires_at:
        print('Token has expired, will refresh')
        refresh_response = client.refresh_access_token(client_id=strava_client_id,
                                                       client_secret=strava_client_secret,
                                                       refresh_token=strava_refresh_token)

        sensitive_info['strava_access_token'] = refresh_response['access_token']
        sensitive_info['strava_refresh_token'] = refresh_response['refresh_token']
        sensitive_info['strava_expires_at'] = refresh_response['expires_at']

        with open(SENSITIVE_INFO_YAML_NAME, 'w') as f:
            yaml.dump(sensitive_info, f)
        print('Refreshed strava token saved to file')
        client.access_token = refresh_response['access_token']
        client.refresh_token = refresh_response['refresh_token']
        client.token_expires_at = refresh_response['expires_at']

    else:
        print('Token still valid, expires at {}'
              .format(time.strftime("%a, %d %b %Y %H:%M:%S %Z", time.localtime(strava_expires_at))))
        client.access_token = sensitive_info['strava_access_token']
        client.refresh_token = sensitive_info['strava_refresh_token']
        client.token_expires_at = strava_expires_at


def one_time():
    sensitive_info = load_sensitive_info()

    strava_client_id = sensitive_info['strava_client_id']
    strava_client_secret = sensitive_info['strava_client_secret']
    strava_access_token = sensitive_info['strava_access_token']
    strava_refresh_token = sensitive_info['strava_refresh_token']
    strava_expires_at = sensitive_info['strava_expires_at']

    url = client.authorization_url(client_id=strava_client_id, redirect_uri='http://localhost/exchange_token',
                                   scope=['read_all', 'profile:read_all', 'activity:read_all'])
    print(url)


def second_time():
    sensitive_info = load_sensitive_info()

    strava_client_id = sensitive_info['strava_client_id']
    strava_client_secret = sensitive_info['strava_client_secret']
    strava_access_token = sensitive_info['strava_access_token']
    strava_refresh_token = sensitive_info['strava_refresh_token']
    strava_expires_at = sensitive_info['strava_expires_at']

    access_token = client.exchange_code_for_token(client_id=strava_client_id, client_secret=strava_client_secret,
                                                  code='456e4c2593f6c765d20eb14344ebb40581ce57d2')

    print(access_token)


if __name__ == '__main__':
    load_existing_strava_data()
