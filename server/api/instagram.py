from datetime import datetime

from flask_restful import Resource

from util.db_utils import get_instagram_highlight
from util.update_instagram import update_instagram_highlight


class InstagramResource(Resource):

    def get(self):
        instagram_highlight_obj = get_instagram_highlight()
        if (datetime.now() - instagram_highlight_obj.time_fetched).days > 1:
            url = 'https://instasave.biz/api/search/highlightedStories/highlight:17880159521677171'
            success, _ = update_instagram_highlight(url)
            if success:
                instagram_highlight_obj = get_instagram_highlight()

        return instagram_highlight_obj.json
