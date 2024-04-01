import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilterSection from '../components/FilterSection';

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // Display 12 products per page
    const [selectedFilters, setSelectedFilters] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/list/?page=${currentPage}`);
                // console.log("currentPage" + currentPage);
                setProducts(response.data.results);
                setTotalPages(Math.ceil(response.data.count / itemsPerPage));
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage]);

    // const handleSearchChange = (e) => {
    //     setSearch(e.target.value);
    //     setCurrentPage(1); // Reset current page when search query changes
    // };

    // const handleFilterChange = (newFilters) => {
    //     // Update selected filters state
    //     setSelectedFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    //     setCurrentPage(1); // Reset current page when filters change
    // };

    // const filteredProducts = products.filter((product) => {
    //     // Filter by search query
    //     const productName = product.title && product.title.toLowerCase();
    //     const isMatchingSearch = !search || (productName && productName.includes(search.toLowerCase()));

    //     // Filter by selected filters
    //     const isMatchingFilters = Object.keys(selectedFilters).every(filterKey => {
    //         return selectedFilters[filterKey] === '' || selectedFilters[filterKey] === product[filterKey];
    //     });

    //     return isMatchingSearch && isMatchingFilters;
    // });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (nextPage) {
            const page = nextPage.split("=")[1]; // Extract the page number from the URL
            // console.log("page" + page);
            setCurrentPage(parseInt(page));
        }
    };

    const handlePrevPage = () => {
        if (prevPage) {
            const page = prevPage.split("=")[1]; // Extract the page number from the URL
            setCurrentPage(parseInt(page));
        }
    };

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
                            <FilterSection products={products} />
                        </div>
                        <div className="col-lg-9">
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
                                                Compare Price
                                            </Link>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            {/* No Product found condition */}
                            {/* {search && currentProducts.length === 0 && (
                                <div className="text-center">No Products Found.</div>
                            )} */}

                            {/* Pagination */}
                            <nav className="pagination-section" aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <a class="page-link" href="#" onClick={handlePrevPage} disabled={!prevPage} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {renderPageNumbers()}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" href="#" onClick={handleNextPage} disabled={!nextPage} aria-label="Next">
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
