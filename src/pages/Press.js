/* eslint-disable */

import React from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Card from 'react-bootstrap/Card';

import 'react-image-gallery/styles/css/image-gallery.css';

import '../main.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchBackend } from '../FetchConfig';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import 'bootstrap/dist/css/bootstrap.min.css';


const articles = [
  {
    "title": "Bellmore Man Bikes More Than 6,000 Miles Raising Money For Cancer",
    "subtitle": "Ian Randman, as a tribute to his late cousin, traveled for several weeks from Florida to Alaska.",
    "url": "https://patch.com/new-york/bellmore/bellmore-man-bikes-more-6-000-miles-raising-money-cancer",
    "image_url": "https://patch.com/img/cdn20/users/24966732/20220929/024936/styles/patch_image/public/patch-am-randman___29144112298.png",
    "organization": "Bellmore Patch",
    "date": "09/29/2022"
  },
  {
    "title": "From Key West, Fla. to Prudhoe Bay, Alaska",
    "subtitle": "North Bellmore bicyclist makes daring, once-in-a-lifetime journey for a good cause.",
    "url": "https://liherald.com/bellmore/stories/from-key-west-fla-to-prudhoe-bay-alaska,144327",
    "image_url": "https://gamma.creativecirclecdn.com/liherald/original/20220922-105543-95071%20A%20BelMer%20Alaska%209_22.JPG",
    "organization": "LI Herald",
    "date": "09/22/2022"
  },
  {
    "title": "Biker riding from Florida to Alaska for charity",
    "subtitle": "Ian Randman is undertaking a long journey in support of pediatric cancer research in his cousin’s memory.",
    "url": "https://www.whitehorsestar.com/Sports/biker-riding-from-florida-to-alaska-for-charity",
    "image_url": "https://whitehorsestar.blob.core.windows.net/images/StoryPhoto_54636.jpg",
    "organization": "Whitehorse Daily Star",
    "date": "09/16/2022"
  },
  {
    "title": "North to Alaska",
    "subtitle": "American cyclist Ian Randman explains why he's riding a bicycle from Florida to Prudhoe Bay in Alaska.",
    "url": "https://www.cbc.ca/listen/live-radio/1-81-airplay/clip/15935204-north-alaska",
    "image_url": "https://www.politics.ox.ac.uk/sites/default/files/styles/standard_mobile/public/2022-07/logo-cbc-listen.jpg?itok=C1aW25E-",
    "mp3_url": "https://mp3.cbc.ca/radio/CBC_Radio_VMS/15/703/dave-MAC3l2OM-20220907_1662597975813.mp3",
    "organization": "CBC/Radio-Canada",
    "date": "09/07/2022"
  },
  {
    "title": "Coffee Time: Cyclist traveling from Florida to Alaska to raise funds for ‘Tackle Kids Cancer’ stops in Lander, shares story.",
    "url": "https://county10.com/coffee-time-cyclist-traveling-from-florida-to-alaska-to-raise-funds-for-tackle-kids-cancer-stops-in-lander-shares-story",
    "image_url": "https://cdn.county10.com/wp-content/uploads/2022/08/298546527_10110747291049504_8047213773787257116_n-768x576.jpg",
    "mp3_url": "https://content.blubrry.com/10cast/Ian_Randman.mp3",
    "organization": "County 10 (Lander Radio Show)",
    "date": "08/12/2022"
  },
  {
    "title": "Cyclist stops in Longmont on his way across country",
    "subtitle": "Ian Randman is riding from Florida to Alaska as a fundraiser in memory of his cousin.",
    "url": "https://www.longmontleader.com/local-news/cyclist-stops-in-longmont-on-his-way-across-country-5661137",
    "image_url": "https://www.vmcdn.ca/f/files/longmontleader/_mg_1704.JPG;w=960",
    "organization": "Longmont Leader",
    "date": "08/05/2022"
  },
  {
    "title": "Cyclist Trekking from Florida to Alaska Stops in Council Grove",
    "subtitle": "Ian Randman of New Jersey stopped at the Republican office Thursday to chat with reporters on his bicycle trek from Key West, Florida, north to Alaska. Randman is undertaking the trip to raise money for the nonprofit Tackle Kids Cancer.",
    "url": "https://kansaspositivepress.kspress.com/articles/cyclist-trekking-from-florida-to-alaska-stops-in-council-grove/",
    "image_url": "https://kansaspositivepress.kspress.com/wp-content/uploads/2022/07/ian-randman-council-grove-republican-400x300.jpg",
    "organization": "Council Grove Republican",
    "date": "07/29/2022"
  },
  {
    "title": "A Cross-Country Journey to Tackle Kids Cancer",
    "url": "https://www.hackensackmeridianhealth.org/en/patient-perspectives/A-Cross-Country-Journey-to-Tackle-Kids-Cancer",
    "image_url": "https://www.hackensackmeridianhealth.org/-/media/Project/HMH/HMH/Public/Foundation-Items/Foundation-Newsletter-Images/August-2022/Resized---2-A-Cross-Country-Journey-to-Tackle-Kids-Cancer.jpg?h=225&iar=0&w=300&hash=5C53B54867E69E1CDF26B9F3DCEF9DA1",
    "organization": "Hackensack Meridian Health",
    "date": "07/14/2022"
  },
  {
    "title": "Top 25 boys bowlers for 2016-17",
    "subtitle": "The Mepham student leads a talented Bellmore-Merrick team with a 219 average and a 720 high series this season.",
    "url": "https://www.newsday.com/sports/high-school/bowling/top-25-long-island-boys-bowlers-for-2016-17-b59142",
    "image_url": "https://www.newsday.com/_next/image?url=https%3A%2F%2Fcdn.newsday.com%2Fimage-service%2Fversion%2Fc%3AZTI0ODIzMzAtYzM0Yi00%3AODk2NzI3%2Frandman-webbbowl25.jpg%3Ff%3DFreeform%26w%3D770%26q%3D1&w=1920&q=60",
    "organization": "Newsday",
    "date": "12/15/2016"
  },
  {
    "title": "Mepham Student Revitalizes Calhoun Courtyard",
    "url": "https://www.bellmore-merrick.k12.ny.us/news/article.aspx?id=81336",
    "image_url": "https://www.bellmore-merrick.k12.ny.us/NewsImages/111416_main(3).jpg",
    "organization": "Bellmore-Merrick Central High School District",
    "date": "11/14/2016"
  },
  {
    "title": "Mepham Eagle Scout Builds New Gazebo in Memory of Calhoun Student",
    "subtitle": "As part of his eagle project, he renovated the courtyard at Calhoun High School.",
    "url": "https://patch.com/new-york/bellmore/mepham-eagle-scout-builds-new-gazebo-memory-calhoun-student",
    "image_url": "https://patch.com/img/cdn20/users/22892005/20161107/013630/styles/raw/public/article_images/calhoun_mepham_gazebo_2-1478543759-14.jpg",
    "organization": "Bellmore Patch",
    "date": "11/07/2016"
  },
  {
    "title": "News 12 Eagle Scout",
    "url": "https://www.youtube.com/watch?v=F3SBD1D-p2g",
    "image_url": "https://i.ytimg.com/vi/F3SBD1D-p2g/hqdefault.jpg",
    "organization": "News 12",
    "date": "10/04/2016"
  },
  {
    "title": "Boy Scout Dedicating Courtyard to his Deceased Friend",
    "subtitle": "Eagle Scout project will rebuild gazebo and benches, clean area, and dedicate it to Shawn Asman.",
    "url": "https://patch.com/new-york/bellmore/boy-scout-dedicating-calhoun-courtyard-his-deceased-friend",
    "image_url": "https://patch.com/img/cdn20/users/22892005/20160816/011156/styles/raw/public/article_images/gazebo-1471367371-2874.png",
    "organization": "Bellmore Patch",
    "date": "08/16/2016"
  },
  // {
  //   "title": "",
  //   "subtitle": "",
  //   "url": "",
  //   "image_url": "",
  //   "organization": "",
  //   "date": ""
  // },
]

class Press extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Main
        title='Press'
      >
        <article className="post" id="press">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/press">Press</Link></h2>
            </div>
          </header>
          {articles.map(article => {
            return (
              <div className="local-bootstrap">
                <Card onClick={() => {window.open(article.url, '_blank'); return false;}}
                style={{borderWidth: 1, "--bs-card-border-color": "#f4f4f4"}}>
                  <Card.Img variant="top" src={article.image_url} />
                  <Card.Body style={{backgroundColor: "#f4f4f4"}}>
                    <p style={{fontWeight: 'bold'}} className="card-title h5">{article.title}</p>
                    {/*<Card.Title className="mb-2 text-muted">{article.title}</Card.Title>*/}
                    {article.subtitle && (<p className="card-subtitle h6">{article.subtitle}</p>)}
                    <Card.Text>
                      {article.organization}
                      <br />
                      {new Date(article.date).toDateString()}
                    </Card.Text>
                    {article.mp3_url && (
                      <div onClick={e => e.stopPropagation()}>
                        <AudioPlayer
                          src={article.mp3_url}
                          onPlay={e => console.log("onPlay")}
                          showJumpControls={false}
                        />
                      </div>
                    )}
                    <a href={article.url} target="_blank" rel="noreferrer" className="button">See the news</a>
                  </Card.Body>
                </Card>
                <hr />
              </div>
            );
          })}
        </article>
      </Main>
    );
  }
}

export default Press;
