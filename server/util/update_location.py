import ast
from time import sleep

import requests
from selenium.webdriver.support.wait import WebDriverWait

from init_db import db
from util.model import LocationURL, Location
from util.selenium_utils import get_driver

from seleniumwire.utils import decode


def update_location_selenium():
    print('Updating location')

    driver = get_driver()
    location_share_url_obj = LocationURL.query.limit(1).all()[0]
    location_share_url = location_share_url_obj.google_location_share_link
    driver.get(location_share_url)
    wait = WebDriverWait(driver, 10)

    try:
        # need the inner request that contains coordinates and timestamp
        wait.until(lambda d: len(d.current_url.split('/')[4]) > 1)
        request = [request for request in driver.requests if 'maps/rpc/locationsharing' in request.url][-1]

        location_share_url_obj.inner_google_location_share_link = request.url

        response = decode(request.response.body, request.response.headers.get('Content-Encoding', 'identity'))

        update_location_given_response(response, location_share_url)

    except Exception as e:
        print('Could not get location')
        print(e)
        return False, e

    driver.quit()

    return True, None


def update_location_using_inner():
    location_share_url_obj = LocationURL.query.limit(1).all()[0]
    inner_location_share_url = location_share_url_obj.inner_google_location_share_link

    try:
        request = requests.get(inner_location_share_url)
        update_location_given_response(request.content)
    except Exception as e:
        print('Could not get location')
        print(e)


def update_location_given_response(response, location_share_url=None):
    response = response.decode('utf-8')[5:]
    response = response.replace('null', '"null"')
    response = ast.literal_eval(response)
    lat_lon = response[0][0][1][1][1:][::-1]
    recorded_time = response[0][0][1][2]

    current_location_obj = Location.query.limit(1).all()[0]
    current_location_obj.lat = lat_lon[0]
    current_location_obj.lon = lat_lon[1]
    current_location_obj.recorded_time = recorded_time
    if location_share_url is not None:
        current_location_obj.url = location_share_url

    db.session.commit()

    print('Location updated')
