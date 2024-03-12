import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const steps = [
    {
        step: '1',
        title: 'Search for a Product',
        content: 'Users start by searching for a product they want to purchase. They can enter the product name, description, or any relevant keywords into the search bar.'
    },
    {
        step: '2',
        title: 'Compare Prices',
        content: "The service then scours various online retailers and stores to find the best prices for the searched product. It compares prices from multiple sources to ensure users get the most value for their money."
    },
    {
        step: '3',
        title: 'Display Results',
        content: "After comparing prices, the service displays the results to the user. It presents a list of retailers along with their prices for the product. Users can easily see which retailer offers the best deal."
    },
    {
        step: '4',
        title: 'Choose Retailer',
        content: "Users can select the retailer that offers the price and terms that best suit their preferences. They can click on the retailer's link to proceed with the purchase directly on the retailer's website."
    },
    {
        step: '5',
        title: 'Purchase',
        content: "Once the user selects a retailer, they are redirected to the retailer's website to complete the purchase. The user follows the retailer's checkout process as usual, confident that they are getting the best price available."
    },
    {
        step: '6',
        title: 'Enjoy Savings',
        content: "By using the Price Match service, users can enjoy significant savings on their purchases. They can feel confident that they have found the best deal and can make their purchase with peace of mind."
    }
]

function HowItWorks() {
  return (
    <section className='how-it-works-section pt-5 pb-5'>
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
        <p>By using the Price Match service, users can enjoy significant savings on their purchases. They can feel confident that they have found the best deal and can make their purchase with peace of mind.</p>
        <p>Overall, the Price Match service simplifies the process of finding the best prices for products online, saving users time and money.</p>
    </Container>
</section>
  )
}

export default HowItWorks