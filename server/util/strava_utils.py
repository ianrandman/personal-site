import pickle
import time
from datetime import datetime

import requests
import json

import yaml
from stravalib import Client

from util import SENSITIVE_INFO_YAML_NAME


def load_sensitive_info():
    with open(SENSITIVE_INFO_YAML_NAME, 'r') as file:
        sensitive_info = yaml.load(file, Loader=yaml.FullLoader)

    return sensitive_info


def test_api():
    strava_access_token = load_sensitive_info()['strava_access_token']

    response = requests.get(
        url='https://www.strava.com/api/v3/athlete/activities?per_page=30',
        headers={
            'accept': 'application/json',
            'authorization': f'Bearer {strava_access_token}'
        }
    )

    if response.status_code == 401:
        code = response.json()['errors'][0]['code']
        authenticate(code)

    x=1


def get_access_token():
    sensitive_info = load_sensitive_info()

    strava_client_id = sensitive_info['strava_client_id']
    strava_client_secret = sensitive_info['strava_client_secret']
    strava_access_token = sensitive_info['strava_access_token']
    strava_refresh_token = sensitive_info['strava_refresh_token']

    r = requests.post(
        url='https://www.strava.com/api/v3/oauth/token',
        params={
            'scope': 'activity:read_all'
        },
        data={
            'client_id': strava_client_id,
            'client_secret': strava_client_secret,
            'refresh_token': strava_refresh_token,
            'grant_type': 'refresh_token',
            'f': 'json'
        },
        verify=False
    )

    access_token = r.json()['access_token']
    return access_token


def authenticate_old():
    sensitive_info = load_sensitive_info()

    # Make Strava auth API call with your
    # client_code, client_secret and code
    strava_client_id = sensitive_info['strava_client_id']
    strava_client_secret = sensitive_info['strava_client_secret']
    strava_access_token = sensitive_info['strava_access_token']
    strava_refresh_token = sensitive_info['strava_refresh_token']

    response = requests.post(
        url='https://www.strava.com/api/v3/oauth/token',
        data={
            'client_id': strava_client_id,
            'client_secret': strava_client_secret,
            'code': 'cebb5969d4ed80862225399f927388f1cded6995',
            'grant_type': 'authorization_code'
        }
    )

    x=1
########################################
client = Client()


def test_client():
    authenticate()
    activities = client.get_activities(after=datetime(year=2022, month=6, day=6))  # June 1, 2022 todo
    for activity in activities:
        activity_dict = activity.to_dict()
        activity_photos_list = get_activity_photos(activity_id=activity.id)
        break

    x=1


def get_activity_photos(activity_id):
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

    response = response.json()

    photo_dict = dict()

    return {}


def authenticate():
    sensitive_info = load_sensitive_info()

    strava_client_id = sensitive_info['strava_client_id']
    strava_client_secret = sensitive_info['strava_client_secret']
    strava_access_token = sensitive_info['strava_access_token']
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
    test_client()
