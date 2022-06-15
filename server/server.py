from flask import Flask
from flask_restful import Resource, Api

from api.googlemaps import GoogleMapsResource

app = Flask(__name__)  # create Flask instance

api = Api(app)  # api router

# api.add_resource(StravaResource, '/strava')
api.add_resource(GoogleMapsResource, '/googlemaps')

if __name__ == '__main__':
    print("Starting flask")
    app.run(debug=True),  # starts Flask
