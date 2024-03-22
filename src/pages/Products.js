import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { Links } from '../App';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/list/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <section className='features-section'>
                <Container>
                    <h2 className='text-center mb-5'>Products</h2>
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <Form className="form-with-bg" style={{ marginBottom: 20 + 'px' }}>
                                <Form.Group className='mb-3' controlId='searchProduct'>
                                    <Form.Control
                                        type='text'
                                        placeholder='Search Product'
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        {products
                            .filter((product) => {
                                const productName = product.title && product.title.toLowerCase();
                                const isMatching = !search || (productName && productName.includes(search.toLowerCase()));
                                return isMatching;
                            }).map(product => (
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
                                            <Link className="btn btn-primary" to={Links.products}>
                                                Compare Price
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    {search && products.filter((product) => {
                        const productName = product.title && product.title.toLowerCase();
                        const isMatching = !search || (productName && productName.includes(search.toLowerCase()));
                        return isMatching;
                    }).length === 0 && (
                            <div className="text-center">No Products Found.</div>
                        )}
                </Container>
            </section>
        </div>
    )
}
