import ast
from time import sleep

from selenium.webdriver.support.wait import WebDriverWait

from init_db import db
from util.model import LocationURL, Location
from util.selenium_utils import get_driver

from seleniumwire.utils import decode


def update_location():
    print('Updating location')

    driver = get_driver()
    location_share_url = LocationURL.query.limit(1).all()[0].google_location_share_link
    driver.get(location_share_url)
    wait = WebDriverWait(driver, 10)

    try:
        # need the inner request that contains coordinates and timestamp
        wait.until(lambda d: len(d.current_url.split('/')[4]) > 1)
        request = [request for request in driver.requests if 'maps/rpc/locationsharing' in request.url][-1]
        response = decode(request.response.body, request.response.headers.get('Content-Encoding', 'identity'))
        response = response.decode('utf-8')[5:]
        response = response.replace('null', '"null"')
        response = ast.literal_eval(response)
        lat_lon = response[0][0][1][1][1:][::-1]
        recorded_time = response[0][0][1][2]

        current_location_obj = Location.query.limit(1).all()[0]
        current_location_obj.lat = lat_lon[0]
        current_location_obj.lon = lat_lon[1]
        current_location_obj.recorded_time = recorded_time
        current_location_obj.url = location_share_url

        db.session.commit()

        print('Location updated')

        # # lat_lon = driver.current_url.split('/')[4][1:].split(',')[:2]
        # lat_lon = {
        #     'lat': lat_lon[0],
        #     'lon': lat_lon[1],
        #     'recorded_time': recorded_time,
        #     'url': location_share_url
        # }
        #
        # with open(os.path.join(os.path.dirname(__file__), '..', 'resources', 'location.json'), 'w') as fp:
        #     json.dump(lat_lon, fp)
        #     print('Location Updated')

    except Exception as e:
        print('Could not get location')
        print(e)

    driver.quit()
