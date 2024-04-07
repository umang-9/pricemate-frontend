import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchResult = () => {

    const location = useLocation();
    const { state } = location;
    const results = state ? state.results.results : [];
    const query = state.query;

    const totalCount = results.length;
    return (
        <div>
            <section className="features-section">
                <Container>
                    <h2 className="text-center mb-5">Search Results for "{query}"</h2>
                    <div className="row">
                        <div className="col-12">
                            <p className='text-end'>{totalCount} results </p>
                            {/* Product Listing */}
                            <Row>
                                {totalCount > 0 ? (
                                    results.map(product => (
                                        <Col className="mb-4" key={product.id} md={6} lg={3}>
                                            <div className="product">
                                                <Link
                                                    onClick={() => window.top(0, 0)}
                                                    to={`/products/detail/${product.id}`}
                                                    className="product-header"
                                                >
                                                    <img src={product.image} alt="product1" />
                                                </Link>
                                                <span className='product-line'></span>
                                                <p className="product-platform fw-normal">{product.platform}</p>
                                                <p className="product-title fw-semibold">{product.title}</p>
                                                {/* Display only the first price */}
                                                {product.prices.length > 0 && (
                                                    <div>
                                                        <h6>${product.prices[0].amount}</h6>
                                                    </div>
                                                )}
                                                <Link className="btn btn-primary btn-sm mt-auto" to={`/products/detail/${product.id}`}>
                                                    Track Price
                                                </Link>
                                            </div>
                                        </Col>
                                    ))
                                ) : (
                                    <h5 className='text-center text-danger'>No products found.</h5>
                                )}
                            </Row>


                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default SearchResult