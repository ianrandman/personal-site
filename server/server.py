from flask import Flask
from flask_restful import Resource, Api

from api.maps import LocationResource, RouteResource

app = Flask(__name__)  # create Flask instance

api = Api(app)  # api router

# api.add_resource(StravaResource, '/strava')
api.add_resource(LocationResource, '/location')
api.add_resource(RouteResource, '/route')


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    print("Starting flask")
    app.run(debug=True),  # starts Flask
