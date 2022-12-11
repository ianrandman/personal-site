import datetime

import stravalib.exc

from init_db import db
from util.strava_utils import load_existing_strava_data, get_activity_and_insert
from util.model import LocationURL, Activity, Location, Media, InstagramHighlight
from util.update_instagram import update_instagram_highlight


def fetch_new_strava_activities():
    try:
        load_existing_strava_data(only_new=True)
    except Exception:
        pass
    db.session.commit()


def update_strava_activity(activity_id):
    if 'blog' in activity_id:
        activity_id = activity_id.split('/')[-1]
    activity_obj = Activity.query.filter_by(id=activity_id).first()
    db.session.delete(activity_obj)
    get_activity_and_insert(activity_id, authenticated=False)
    db.session.commit()


def delete_strava_activity(activity_id):
    if 'blog' in activity_id:
        activity_id = activity_id.split('/')[-1]
    activity_obj = Activity.query.filter_by(id=activity_id).first()
    db.session.delete(activity_obj)
    db.session.commit()


def delete_recent_strava_activity():
    activity_obj = Activity.query.order_by(Activity.start_date.desc()).first()
    db.session.delete(activity_obj)
    db.session.commit()


def get_current_location():
    return Location.query.limit(1)[0]


def get_instagram_highlight():
    return InstagramHighlight.query.limit(1).all()[0]


def get_activities():
    return Activity.query.order_by(Activity.start_date.asc()).all()


def get_activity(id):
    return Activity.query.filter_by(id=id).first()


def update_location_url(google_location_share_link):
    location_url_obj = LocationURL.query.limit(1).all()[0]
    location_url_obj.google_location_share_link = google_location_share_link
    db.session.commit()


def update_location_zoleo_db(lat_lon, url):
    location_obj = Location.query.limit(1).all()[0]
    location_obj.lat, location_obj.lon = lat_lon
    location_obj.recorded_time = int(datetime.datetime.now().timestamp() * 1000)
    location_obj.url = url
    location_obj.is_google = False
    db.session.commit()


def populate_db():
    # db.drop_all()
    # db.create_all()
    db.metadata.create_all(db.engine, tables=[
        Activity.__table__,
        Media.__table__,
    ])

    # location_share_obj = LocationURL(
    #     google_location_share_link='https://maps.app.goo.gl/AHuw73ei2MEe5vZX9',
    #     inner_google_location_share_link='https://www.google.com/maps/rpc/locationsharing/read?authuser=0&hl=en&gl=us&pb=!1e1!2m2!1sjG-2YvCeGMOIptQPv6GEwAo!7e81!3m2!1s109215517752537741597!2sChZsUHFZNU43N1BYT2VFNnhtVTNFWDVnEggHBeI8OzhB5w%3D%3D'
    # )
    # db.session.add(location_share_obj)

    # current_location_obj = Location(
    #     lat=24.546543,
    #     lon=-81.797505,
    #     recorded_time=1654041600000,
    #     url='https://maps.app.goo.gl/BDqvKB1CVeCFgJ3z9',
    #     is_google=True
    # )
    # db.session.add(current_location_obj)

    try:
        load_existing_strava_data()
    except stravalib.exc.RateLimitExceeded:
        print('Rate limit exceeded')

    db.session.commit()

    # instagram_highlight_obj = InstagramHighlight(json=dict(), time_fetched=datetime.now())
    # db.session.add(instagram_highlight_obj)
    # db.session.commit()
    # url = 'https://instasave.biz/api/search/highlightedStories/highlight:17880159521677171'
    # update_instagram_highlight([url])


def test_db():
    activities = Activity.query.all()
    x=1


if __name__ == '__main__':
    from server import config_db
    config_db()
    populate_db()
    test_db()
