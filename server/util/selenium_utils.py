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
    if platform.system() == 'Windows':
        driver = webdriver.Chrome(executable_path=os.path.join(os.path.dirname(__file__), '..', 'chromedriver.exe'),
                                  chrome_options=options)
    else:
        driver = webdriver.Chrome(chrome_options=options)
    return driver
