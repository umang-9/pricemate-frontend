import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilterSection from '../components/FilterSection';

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // Display 12 products per page
    const [totalPages, setTotalPages] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [priceRangeFilter, setPriceRangeFilter] = useState('All');
    const [totalCount, setTotalCount] = useState(0);
    const [totalUniqueProductsCount, setTotalUniqueProductsCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `http://127.0.0.1:8000/products/list/?page=${currentPage}`;
                if (sortBy) {
                    url += `&orderby=${sortBy}`;
                }
                if (priceRangeFilter) {
                    console.log("priceRangeFilter=" +priceRangeFilter);
                    url += `&filterby=${priceRangeFilter}`;
                }
                console.log(url);
                const response = await axios.get(url);
                const { results, next, previous } = response.data;
                // console.log(response.data);
                // Filter out duplicates based on product id
                const uniqueProducts = results.filter((product, index, self) =>
                    index === self.findIndex((p) => p.id === product.id)
                );
                setProducts(uniqueProducts);
                // Calculate total count of unique products
                const totalUniqueProductsCount = uniqueProducts.length;
                const totalCount = response.data.count;
                setTotalCount(totalCount);
                setTotalUniqueProductsCount(totalUniqueProductsCount);
                // Recalculate total pages based on the total count and items per page
                setTotalPages(Math.ceil(totalCount / itemsPerPage));
                // Set next and previous page URLs
                setNextPage(next);
                setPrevPage(previous);
                // Update URL
                navigate(`/products/list/?page=${currentPage}`);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage, sortBy, priceRangeFilter]);

    const handleSort = (value) => {
        setSortBy(value);
    };

    const handleFilterByPrice = (value) => {
        setPriceRangeFilter(value);
    };

    const handleNextPage = () => {
        if (nextPage) {
            // const page = nextPage.split("=")[1];
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
                    <h2 className="text-center mb-5">Products</h2>
                    <div className="row">
                        <div className="col-lg-3 mb-5 mb-lg-0">
                            <FilterSection products={products} handleSort={handleSort} handleFilterByPrice={handleFilterByPrice} navigateToFirstPage={navigateToFirstPage} />
                        </div>
                        <div className="col-lg-9">
                            <p className='text-end'>{totalUniqueProductsCount} results </p>
                            {/* Product Listing */}
                            <Row>
                                {products.map(product => (
                                    <Col className="mb-4" key={product.id} md={6} lg={4}>
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
                                ))}
                            </Row>

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

export default Products;
