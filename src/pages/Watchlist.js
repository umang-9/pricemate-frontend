import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WatchList from '../components/WatchList';

function Watchlist() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // Display 12 products per page
    const [totalPages, setTotalPages] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalUniqueProductsCount, setTotalUniqueProductsCount] = useState(0);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Token ${token}`
    };

    useEffect(() => {
        if (!token) {
            // Handle case where token is missing
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/products/list/?filterby=watching`,
                    { headers: headers }
                );
                const { results, next, previous, count } = response.data;

                setProducts(results);
                setTotalCount(count);
                setTotalUniqueProductsCount(results.length);
                setTotalPages(Math.ceil(count / itemsPerPage));
                setNextPage(next);
                setPrevPage(previous);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage, itemsPerPage, headers, token]);

    const handleNextPage = () => {
        if (nextPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const navigateToFirstPage = () => {
        setCurrentPage(1);
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li className="page-item" key={i}>
                    <a
                        href="#"
                        onClick={() => {
                            setCurrentPage(i);
                            window.scrollTo(0, 0);
                        }}
                        className={`page-link ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            <section className="features-section">
                <Container>
                    <h2 className="text-center mb-5">Watchlist Products</h2>
                    <div className="row">
                        <div className="col-lg-12">
                            {totalUniqueProductsCount > 0 && <p className='text-end'>{totalUniqueProductsCount} results </p>}
                            {/* Product Listing */}
                            {Array.isArray(products) && products.length > 0 ? (
                            <Row>
                                {products.map(product => (
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
                                            {/* Add Product to watch list */}
                                            <WatchList product={product} token={token} headers={headers} setProduct={setProducts} />
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
                                ))}
                            </Row>
                            ) : (
                                <p className='text-center text-danger fw-bold'>No Products in watchlist</p>
                            )}

                            {/* Pagination */}
                            <nav className="pagination-section" aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={handlePrevPage} disabled={!prevPage} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {renderPageNumbers()}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a className="page-link" href="#" onClick={handleNextPage} disabled={!nextPage} aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Watchlist;
