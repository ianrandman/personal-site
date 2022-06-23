from flask_restful import Resource

from util.db_utils import get_instagram_highlight


class InstagramResource(Resource):

    def get(self):
        instagram_highlight_obj = get_instagram_highlight()
        return instagram_highlight_obj.json
