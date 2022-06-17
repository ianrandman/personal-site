import ast
import json
import os

from api import config

from seleniumwire import webdriver
from seleniumwire.utils import decode


options = webdriver.ChromeOptions()
options.add_argument('headless')
driver = webdriver.Chrome(executable_path=os.path.join(os.path.dirname(__file__), '..', 'chromedriver.exe'),
                          chrome_options=options)


def update_location():
    print('Updating location')

    location_share_url = config['google_location_share_link']
    driver.get(location_share_url)

    # site needs to redirect to have the location in the URL, but that takes time
    # wait = WebDriverWait(driver, 10)
    try:
        # wait.until(lambda d: len(d.current_url.split('/')[4]) > 1)

        # need the inner request
        request = [request for request in driver.requests if 'maps/rpc/locationsharing' in request.url][0]
        response = decode(request.response.body, request.response.headers.get('Content-Encoding', 'identity'))
        response = response.decode('utf-8')[5:]
        response = response.replace('null', '"null"')
        response = ast.literal_eval(response)
        lat_lon = response[0][0][1][1][1:][::-1]
        recorded_time = response[0][0][1][2]

        # lat_lon = driver.current_url.split('/')[4][1:].split(',')[:2]
        lat_lon = {
            'lat': lat_lon[0],
            'lon': lat_lon[1],
            'recorded_time': recorded_time,
            'url': location_share_url
        }

        with open(os.path.join(os.path.dirname(__file__), '..', 'resources', 'location.json'), 'w') as fp:
            json.dump(lat_lon, fp)

    except Exception:
        print('Could not get coordinates from URL. Current URL is:')
        print(driver.current_url)
