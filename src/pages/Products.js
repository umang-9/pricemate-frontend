import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { Links } from '../App';
// import CTABanner from '../components/CATBanner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Define a function to fetch products from the Django API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/list/');
                setProducts(response.data); // Set the products state with the received data
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Call the fetchProducts function when the component mounts
        fetchProducts();
    }, []);

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    function stripHTML(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    return (
        <div>
            {/* <CTABanner
				title="Ready to Start Saving?"
				text="Take the first step towards unlocking unbeatable deals and maximizing your savings potential."
				img="assets/images/cta-banner1.jpg"
			/> */}

            <section className='features-section'>
                <Container>
                    <h2 className='text-center mb-5'>Products</h2>
                    <Row>
            
                        {products.map(product => (
                            <Col className="mb-5" key={product.id} md={4}>
                                <div className="product">
                                    <Link
                                        onClick={() => window.top(0, 0)}
                                        to={`/products/detail/${product.id}`}
                                        className='product-header'
                                    >   
                                        <img src={product.image} alt="product1" />
                                    </Link>
                                    <h4>{product.title}</h4>
                                    <div className="product-details mt-5">
                                        <p className="product-platform">{product.platform}</p>
                                        {/* <p>{truncateText(stripHTML(product.about), 300)}</p> */}
                                        <Link className="btn btn-primary" to={Links.products}>
                                            Compare Price
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    )
}
