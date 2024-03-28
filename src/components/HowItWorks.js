import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const steps = [
    {
        step: '1',
        title: 'Search for a Product',
        content: 'Begin by searching for the products you want to track. Enter the product name or URL into our search bar to get started.'
    },
    {
        step: '2',
        title: 'Track Prices',
        content: "Once you've found the product you're interested in, add it to your tracking list. Our system will start monitoring its price across various online retailers."
    },
    {
        step: '3',
        title: 'Receive Alerts',
        content: " Sit back and relax while our system keeps an eye on the prices for you. Whenever there's a price drop or special offer, you'll receive instant notifications via email or mobile app."
    },
    {
        step: '4',
        title: 'Make Informed Decisions',
        content: "With real-time price tracking and alerts, you'll always know when it's the best time to make your purchase. Take advantage of discounts and deals to save money on your favorite products."
    }
]

function HowItWorks() {
  return (
    <section className='how-it-works-section'>
    <Container>
        <h2 className="text-center">How It Works</h2>
        <p className="text-center mb-5">Find the Best Deals with Ease</p>
        <Row className='mb-4'>
            {steps.map((item, i) => (
                <Col key={i} md={6} className='mb-5'>
                    <Badge pill bg="primary" as="h5">{item.step}</Badge>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </div>
                </Col>
            ))}
        </Row>
        <p>By using the Price Mate service, users can enjoy significant savings on their purchases. They can feel confident that they have found the best deal and can make their purchase with peace of mind.</p>
        <p>Overall, the Price Mate service simplifies the process of finding the best prices for products online, saving users time and money.</p>
    </Container>
</section>
  )
}

export default HowItWorks