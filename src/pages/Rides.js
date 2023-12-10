/* eslint-disable */

import React from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Card from 'react-bootstrap/Card';

import 'react-image-gallery/styles/css/image-gallery.css';

import '../main.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchBackend } from '../FetchConfig';

import { Button, Col, Row } from 'react-bootstrap';
import { faMap } from '@fortawesome/free-regular-svg-icons/faMap';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const { PUBLIC_URL } = process.env;


class Rides extends React.Component {
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
        title='Rides'
      >
        <article className="post" id="rides">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/rides">Rides</Link></h2>
            </div>
          </header>
          {/* <div className='testImgContainer'> */}
          {/*   <img className='testImg' width='600px' src={`${PUBLIC_URL}/images/ride_images/${this.props.rides[0].codename}.jpg`}/> */}
          {/* </div> */}
          <Row xs={1} sm={1} md={2} lg={2} xl={2} className="g-4">
            {this.props.rides.map(ride => {
              return (
                <Col key={ride.codename}>
                  <Link to={`/rides/${ride.codename}/blog`} style={{'borderBottom': null}}>
                    <div className="local-bootstrap">
                      <Card
                        style={{borderWidth: 1, "--bs-card-border-color": "#f4f4f4"}}>
                        <div className='ride-card-image-container'>
                          <Card.Img variant="top" src={`${PUBLIC_URL}/images/ride_images/${ride.codename}.jpg`} />
                        </div>
                        <Card.ImgOverlay>
                          {ride.starred && <FontAwesomeIcon className="ride-star fa-solid" icon={faStar}/>}
                          <Link to={`/rides/${ride.codename}/route-map`} style={{'borderBottom': null}}>
                            <Button variant='secondary' className='maps-button' style={{backgroundColor: 'white'}}>
                              <FontAwesomeIcon icon={faMap} />
                            </Button>
                          </Link>
                          <div className='ride-card-body'>
                            <p style={{fontWeight: 'bold'}} className="card-title h5">{ride.title}</p>
                            <p className="card-subtitle h6">{ride.description}</p>
                          </div>
                        </Card.ImgOverlay>


                        {/* <Card.Body style={{backgroundColor: "#f4f4f4"}}> */}
                        {/*   <p style={{fontWeight: 'bold'}} className="card-title h5">{ride.title}</p> */}
                        {/*   /!* <Card.Title className="mb-2 text-muted">{ride.title}</Card.Title> *!/ */}
                        {/*   <p className="card-subtitle h6">{ride.description}</p> */}
                        {/*   /!* {article.subtitle && (<p className="card-subtitle h6">{article.subtitle}</p>)} *!/ */}
                        {/*   /!* <Card.Text> *!/ */}
                        {/*   /!*   {article.organization} *!/ */}
                        {/*   /!*   <br /> *!/ */}
                        {/*   /!*   {new Date(article.date).toDateString()} *!/ */}
                        {/*   /!* </Card.Text> *!/ */}
                        {/*   /!* {article.mp3_url && ( *!/ */}
                        {/*   /!*   <div onClick={e => e.stopPropagation()}> *!/ */}
                        {/*   /!*     <AudioPlayer *!/ */}
                        {/*   /!*       src={article.mp3_url} *!/ */}
                        {/*   /!*       onPlay={e => console.log("onPlay")} *!/ */}
                        {/*   /!*       showJumpControls={false} *!/ */}
                        {/*   /!*     /> *!/ */}
                        {/*   /!*   </div> *!/ */}
                        {/*   /!* )} *!/ */}
                        {/*   /!* <a href={article.url} target="_blank" rel="noreferrer" className="button">See the news</a> *!/ */}
                        {/* </Card.Body> */}
                      </Card>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </article>
      </Main>
    );
  }
}

export default Rides;
