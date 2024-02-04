import React from 'react';

import { Links } from '../App'; 

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Index() {
	return (
		<main>

			{/* Banner section start */}
			<section className='bannner-section pb-5'>
				<Carousel>

          <Carousel.Item>
            <Image src="assets/images/banner1.jpg" alt="Price Mate" fluid />
            <div className='bg-overlay'></div>
            <Carousel.Caption>
              <div className='price-mate-icon'>
                <Image src="assets/images/icon.png" alt="Price Mate Icon" />
              </div>
              <h3>Price Mate:</h3>
              <p>Bridging the Gap between Budget and Bargains!</p>
              <Link className="btn btn-primary" to={Links.indexURL}> 
                  Price Match Now
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Image src="assets/images/banner2.jpg" alt="Never Overpay Again" fluid />
            <div className='bg-overlay'></div>
            <Carousel.Caption>
              <div className='price-mate-icon'>
                <Image src="assets/images/icon.png" alt="Price Mate Icon" />
              </div>
              <h3>Say Goodbye to Overpaying!</h3>
              <p>Price Mate Finds the Best Deals for You.</p>
              <Link className="btn btn-primary" to={Links.indexURL}> 
                  Price Match Now
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Image src="assets/images/banner3.jpg" alt="Match. Save. Smile. Repeat." fluid />
            <div className='bg-overlay'></div>
            <Carousel.Caption>
              <div className='price-mate-icon'>
                <Image src="assets/images/icon.png" alt="Price Mate Icon" />
              </div>
              <h3>Match. Save. Smile. Repeat.</h3>
              <p>Experience the Price Mate Advantage!</p>
              <Link className="btn btn-primary" to={Links.indexURL}> 
                  Price Match Now
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
			</section>
			{/* Banner section end */}
		</main>
	);
}

export default Index;
