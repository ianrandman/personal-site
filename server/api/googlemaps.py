from flask_restful import Resource
import requests
import os

from selenium.common import TimeoutException
from selenium.webdriver.support.wait import WebDriverWait

from api import config

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

options = webdriver.ChromeOptions()
options.add_argument('headless')
driver = webdriver.Chrome(executable_path=os.path.join(os.path.dirname(__file__), '..', 'chromedriver.exe'),
                          chrome_options=options)


class GoogleMapsResource(Resource):

    def get(self):
        location_share_url = config['google_location_share_link']
        driver.get(location_share_url)

        # site needs to redirect to have the location in the URL, but that takes time
        wait = WebDriverWait(driver, 10)
        try:
            wait.until(lambda d: len(d.current_url.split('/')[4]) > 1)
            lat_lon = driver.current_url.split('/')[4][1:].split(',')[:2]
            lat_lon = {
                'lat': lat_lon[0],
                'lon': lat_lon[1]
            }
        except TimeoutException:
            print('Could not get coordinates from URL. Current URL is:')
            print(driver.current_url)
            lat_lon = dict()

        return lat_lon
