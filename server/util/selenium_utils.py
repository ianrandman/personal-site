import os

from selenium.webdriver.common.keys import Keys
from seleniumwire import webdriver

options = webdriver.ChromeOptions()
options.add_argument('headless')


def get_driver():
    """Make a new Chrome driver"""
    driver = webdriver.Chrome(executable_path=os.path.join(os.path.dirname(__file__), '..', 'chromedriver.exe'),
                              chrome_options=options)
    return driver
