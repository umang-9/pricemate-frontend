import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const featureItems = [
    {
        image: 'assets/images/banner1.jpg',
        title: 'Price Mate:',
        content: 'Bridging the Gap between Budget and Bargains!'
    },
    {
        image: 'assets/images/banner2.jpg',
        title: 'Say Goodbye to Overpaying!',
        content: 'Price Mate Finds the Best Deals for You.'
    },
    {
        image: 'assets/images/banner3.jpg',
        title: 'Match. Save. Smile. Repeat.',
        content: 'Experience the Price Mate Advantage!'
    }
]

function FeaturesSection() {
  return (
    <section className='bannner-section pb-5'>
        <Container>
            <h2>Our Features</h2>
            <Row>
                {featureItems.map((item, i) => (
                    <Col key={i} md={4}>
                        <Card>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </section>
  )
}

export default FeaturesSection