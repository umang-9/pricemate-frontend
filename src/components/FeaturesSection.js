import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const featureItems = [
    {
        image: 'assets/images/price_comparison_engine_icon.svg',
        title: 'Price Comparison Engine',
        content: 'Easily compare prices across multiple retailers with our intuitive price comparison engine. Find the best deals on the products you love without the hassle of visiting numerous websites.'
    },
    {
        image: 'assets/images/wide_retailer_network_icon.png',
        title: 'Wide Retailer Network',
        content: "Gain access to a vast network of reputable retailers, including major brands and online marketplaces. Shop confidently knowing that you're getting competitive prices from trusted sources."
    },
    {
        image: 'assets/images/mobile_accessaibility_icon.svg',
        title: 'Mobile Accessibility',
        content: "Access our price matching platform anytime, anywhere, with our mobile-friendly interface. Whether you're at home or on the go, take advantage of our features conveniently from your smartphone or tablet."
    }
]

function FeaturesSection() {
  return (
    <section className='features-section'>
        <Container>
            <h2 className="text-center">Our Features</h2>
            <p className='text-center mb-5'>With our comprehensive suite of features, Price Match empowers you to shop smarter, save money, and enjoy hassle-free shopping experiences.</p>
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