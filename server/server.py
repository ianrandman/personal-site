import datetime

from flask import Flask
from flask_restful import Resource, Api
from apscheduler.schedulers.background import BackgroundScheduler

from api.maps import LocationResource, RouteResource
from util.update_location import update_location

app = Flask(__name__)  # create Flask instance

api = Api(app)  # api router

# api.add_resource(StravaResource, '/strava')
api.add_resource(LocationResource, '/location')
# api.add_resource(RouteResource, '/route')

print("Starting location update job")
scheduler = BackgroundScheduler()
job = scheduler.add_job(update_location, 'interval', seconds=15, next_run_time=datetime.datetime.now())  # todo reduce
scheduler.start()


@app.after_request
def after_request(response):
    """CORS"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    print("Starting flask")
    app.run(debug=True, use_reloader=False),  # starts Flask
