import os
import platform

from seleniumwire import webdriver

options = webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument("disable-infobars")
options.add_argument("--disable-extensions")
options.add_argument("--disable-gpu")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--no-sandbox")


def get_driver():
    """Make a new Chrome driver"""
    driver_name = 'chromedriver.exe' if platform.system() == 'Windows' else 'chromedriver'

    driver = webdriver.Chrome(executable_path=os.path.join(os.path.dirname(__file__), '..', driver_name),
                              chrome_options=options)
    return driver
