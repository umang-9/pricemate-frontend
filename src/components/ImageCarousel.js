import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { Links } from '../App'; 

import { Link } from 'react-router-dom';

const carouselItems = [
    {
        image: 'assets/images/banner1.jpg',
        title: 'Price Mate:',
        content: 'Bridging the Gap between Budget and Bargains!'
    },
    {
        image: 'assets/images/banner2.jpg',
        title: 'Say Goodbye to Overpaying!',
        content: 'Bridging the Gap between Budget and Bargains!'
    },
    {
        image: 'assets/images/banner3.jpg',
        title: 'Match. Save. Smile. Repeat.',
        content: 'Experience the Price Mate Advantage!'
    }
]

function ImageCarousel() {

    return (
        <section className='bannner-section pb-5'>
            <Carousel fade>
                {carouselItems.map(item => (
                    <Carousel.Item>
                        <Image src={item.image} alt={item.title} fluid />
                        <div className='bg-overlay'></div>
                        <Carousel.Caption>
                            <div className='price-mate-icon'>
                                <Image src="assets/images/icon.png" alt="Price Mate Icon" />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                            <Link className="btn btn-primary" to={Links.indexURL}> 
                                Price Match Now
                            </Link>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}

            </Carousel>
        </section>
    );
}

export default ImageCarousel;