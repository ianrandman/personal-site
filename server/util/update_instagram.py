from datetime import datetime

import requests

from init_db import db
from util.model import InstagramHighlight


def update_instagram_highlight(urls):
    instagram_highlight_obj = InstagramHighlight.query.limit(1).all()[0]
    jsons = list()

    for url in urls:
        request = requests.get(url)

        try:
            if request.status_code == 200:
                # remove videos
                json = request.json()

                result = dict()
                result['data'] = [data for data in json if data['type'] == 'photo' or data['type'] == 'video']
                for media in result['data']:
                    media['url'] = 'https://instastories.watch' + media['url']
                    if media['type'] != 'video':
                        media['originalUrl'] = 'https://instastories.watch' + media['originalUrl']

                # for media in json['data']:
                #     media['thumbnail'] = media['thumbnail'][27:]
                #     media['source'] = media['source'][27:]

                jsons.append(result)

            else:
                error = dict()
                error['url'] = url
                error['result'] = request.json()
                return False, error
        except Exception as e:
            print(e)
            error = dict()
            error['url'] = url
            error['result'] = request.json()
            return False, error

    instagram_highlight_obj.json = {
        'data': [item for sublist in jsons for item in sublist['data']]
    }
    instagram_highlight_obj.time_fetched = datetime.now()
    db.session.commit()

    return True, None
