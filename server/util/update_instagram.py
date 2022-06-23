
import requests

from init_db import db
from util.model import InstagramHighlight


def update_instagram_highlight(url):
    request = requests.get(url)

    if request.status_code == 200:
        # remove videos
        json = request.json()
        json['data'] = [data for data in json['data'] if data['media_type'] == 'image']

        instagram_highlight_obj = InstagramHighlight.query.limit(1).all()[0]
        instagram_highlight_obj.json = json

        db.session.commit()
        return True

    return False
