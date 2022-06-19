from init_db import db
from server import config_db
from util.strava_utils import load_existing_strava_data
from util.model import LocationURL, Activity, Location


def populate_db():
    db.drop_all()
    db.create_all()
    # db.metadata.create_all(db.engine, tables=[
    #     Location.__table__
    # ])

    location_share_obj = LocationURL(google_location_share_link='https://maps.app.goo.gl/AHuw73ei2MEe5vZX9')
    db.session.add(location_share_obj)

    current_location_obj = Location(
        lat=24.546543,
        lon=-81.797505,
        recorded_time=1654041600000,
        url='https://maps.app.goo.gl/AHuw73ei2MEe5vZX9'
    )
    db.session.add(current_location_obj)

    load_existing_strava_data()

    db.session.commit()


def test_db():
    activities = Activity.query.all()
    x=1


if __name__ == '__main__':
    # populate_db()
    config_db()
    test_db()
