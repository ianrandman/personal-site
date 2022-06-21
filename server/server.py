import datetime
import os

from flask import Flask
from flask_restful import Api
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
# from apscheduler.schedulers.background import BackgroundScheduler
from api.admin import AdminResource

app = Flask(__name__)  # create Flask instance

api = Api(app)  # api router

from api.maps import LocationResource
from api.strava import StravaResource
from util.update_location import update_location

from init_db import db


@app.before_first_request
def config_db():
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] =\
            'sqlite:///' + os.path.join(basedir, 'database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    print('Connecting to db')
    # app.app_context().push()
    db.app = app
    db.init_app(app)

    # print("Starting location update job")
    # scheduler = BackgroundScheduler()
    # scheduler.add_job(update_location, 'interval', seconds=15,
    #                   next_run_time=datetime.datetime.now())  # todo maybe reduce
    # scheduler.start()


api.add_resource(LocationResource, '/location')
api.add_resource(StravaResource, '/strava')
api.add_resource(AdminResource, '/admin')

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["1 per second", "20 per minute"]
)


@app.after_request
def after_request(response):
    """CORS"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    # config_db()

    print("Starting flask")
    app.run(host='0.0.0.0', debug=True, use_reloader=False),  # starts Flask
