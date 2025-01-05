import os
from datetime import datetime

import pytz

SENSITIVE_INFO_YAML_NAME = os.path.join(os.path.dirname(__file__), '..', 'sensitive_info.yml')

rides = {
    'florida-to-alaska': {
        'start_date': datetime(year=2022, month=6, day=1, tzinfo=pytz.timezone('US/Eastern')),
        'end_date': datetime(year=2022, month=10, day=3, tzinfo=pytz.timezone('US/Eastern'))
    },
    'san-francisco-portland': {
        'start_date': datetime(year=2024, month=11, day=23, hour=17, tzinfo=pytz.timezone('US/Pacific')),
        'end_date': datetime(year=2024, month=12, day=3, tzinfo=pytz.timezone('US/Pacific'))
    },
    'santa-cruz-big-basin': {
        'start_date': datetime(year=2024, month=2, day=24, tzinfo=pytz.timezone('US/Pacific')),
        'end_date': datetime(year=2024, month=2, day=25, tzinfo=pytz.timezone('US/Pacific'))
    },
    'san-jose-to-los-angeles': {
        'start_date': datetime(year=2023, month=11, day=18, tzinfo=pytz.timezone('US/Pacific')),
        'end_date': datetime(year=2023, month=11, day=26, tzinfo=pytz.timezone('US/Pacific'))
    },
    'san-jose-labor-day-2023': {
        'start_date': datetime(year=2023, month=9, day=1, tzinfo=pytz.timezone('US/Pacific')),
        'end_date': datetime(year=2023, month=9, day=4, tzinfo=pytz.timezone('US/Pacific'))
    },
    'san-jose-yosemite': {
        'start_date': datetime(year=2023, month=6, day=9, tzinfo=pytz.timezone('US/Pacific')),
        'end_date': datetime(year=2023, month=6, day=13, tzinfo=pytz.timezone('US/Pacific'))
    },
    'san-jose-big-sur': {
        'start_date': datetime(year=2021, month=11, day=24, tzinfo=pytz.timezone('US/Pacific')),
        'end_date': datetime(year=2021, month=11, day=29, tzinfo=pytz.timezone('US/Pacific'))
    },
    'san-jose-mt-tam': {
        'start_date': datetime(year=2021, month=10, day=9, tzinfo=pytz.timezone('US/Pacific')),
        'end_date': datetime(year=2021, month=10, day=10, tzinfo=pytz.timezone('US/Pacific'))
    },
    'rochester-niagara-falls': {
        'start_date': datetime(year=2021, month=5, day=11, tzinfo=pytz.timezone('US/Eastern')),
        'end_date': datetime(year=2021, month=5, day=12, tzinfo=pytz.timezone('US/Eastern'))
    },
    'rochester-letchworth': {
        'start_date': datetime(year=2020, month=9, day=5, tzinfo=pytz.timezone('US/Eastern')),
        'end_date': datetime(year=2020, month=9, day=6, tzinfo=pytz.timezone('US/Eastern'))
    },
    'tri-state-loop': {
        'start_date': datetime(year=2020, month=8, day=7, tzinfo=pytz.timezone('US/Eastern')),
        'end_date': datetime(year=2020, month=8, day=9, tzinfo=pytz.timezone('US/Eastern'))
    },
    'north-bellmore-orient-point': {
        'start_date': datetime(year=2018, month=8, day=18, tzinfo=pytz.timezone('US/Eastern')),
        'end_date': datetime(year=2018, month=8, day=19, tzinfo=pytz.timezone('US/Eastern'))
    }
}
