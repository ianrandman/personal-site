from init_db import db


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(10000), nullable=True)
    distance = db.Column(db.Float, nullable=False)
    total_elevation_gain = db.Column(db.Float, nullable=False)
    moving_time = db.Column(db.Integer, nullable=False)
    elapsed_time = db.Column(db.Integer, nullable=False)
    start_latlng = db.Column(db.String(100), nullable=False)
    end_latlng = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Integer, nullable=False)

    polyline = db.Column(db.String(20000), nullable=False)
    summary_polyline = db.Column(db.String(20000), nullable=False)

    ride_codename = db.Column(db.String(100), nullable=False)

    media = db.relationship('Media', backref='media', lazy=False, cascade="all, delete-orphan")

    def json(self, polyline=False, summary_polyline=False, media=False):
        json = dict(
            id=self.id,
            name=self.name,
            description=self.description,
            distance=self.distance,
            total_elevation_gain=self.total_elevation_gain,
            moving_time=self.moving_time,
            elapsed_time=self.elapsed_time,
            start_latlng=self.start_latlng,
            end_latlng=self.end_latlng,
            start_date=self.start_date,
            ride_codename=self.ride_codename
            # polyline=self.polyline,
            # summary_polyline=self.summary_polyline,
            # media=[m.json for m in self.media]
        )

        if polyline:
            json['polyline'] = self.polyline
        if summary_polyline:
            json['summary_polyline'] = self.summary_polyline
        if media:
            json['media'] = [m.json for m in self.media]

        return json

    def __repr__(self):
        return self.name


class Media(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    order_num = db.Column(db.Integer, nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
    is_video = db.Column(db.Boolean, nullable=False)
    default_photo = db.Column(db.Boolean, nullable=False)
    video_url = db.Column(db.String(200), nullable=True)
    small_image_url = db.Column(db.String(200), nullable=False)
    large_image_url = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(50), nullable=True)

    @property
    def json(self):
        return dict(
            id=self.id,
            order_num=self.order_num,
            activity_id=self.activity_id,
            is_video=self.is_video,
            default_photo=self.default_photo,
            video_url=self.video_url,
            small_image_url=self.small_image_url,
            large_image_url=self.large_image_url,
            location=self.location
        )


class LocationURL(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    google_location_share_link = db.Column(db.String(100), nullable=False)
    inner_google_location_share_link = db.Column(db.String(400), nullable=True)
    ride_codename = db.Column(db.String(100), nullable=False)

    @property
    def json(self):
        return dict(
            google_location_share_link=self.google_location_share_link
        )


class InstagramHighlight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    json = db.Column(db.JSON, nullable=False)
    time_fetched = db.Column(db.DateTime, nullable=False)


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Integer, nullable=False)
    recorded_time = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(100), nullable=False)
    is_google = db.Column(db.Boolean, nullable=False)
    ride_codename = db.Column(db.String(100), nullable=False)

    @property
    def json(self):
        return dict(
            lat=self.lat,
            lon=self.lon,
            recorded_time=self.recorded_time,
            url=self.url,
            is_google=self.is_google,
            ride_codename = self.ride_codename
        )
