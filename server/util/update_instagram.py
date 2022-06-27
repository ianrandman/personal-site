from datetime import datetime

import requests

from init_db import db
from util.model import InstagramHighlight


def update_instagram_highlight(url):
    request = requests.get(url)

    try:
        if request.status_code == 200:
            # remove videos
            json = request.json()
            json['data'] = [data for data in json['data'] if data['media_type'] == 'image']

            # for media in json['data']:
            #     media['thumbnail'] = media['thumbnail'][27:]
            #     media['source'] = media['source'][27:]

            instagram_highlight_obj = InstagramHighlight.query.limit(1).all()[0]
            instagram_highlight_obj.json = json
            instagram_highlight_obj.time_fetched = datetime.now()

            db.session.commit()
        else:
            request.json()['url'] = url
            return False, request.json()
    except Exception as e:
        print(e)
        request.json()['url'] = url
        False, request.json()

    return True, None
