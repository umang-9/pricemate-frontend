import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from '@material-ui/lab/Pagination';
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
    const [watchlist, setWatchlist] = useState([]);
    const [message, setMessage] = useState('');
    const [nonFieldErrors, setNonFieldErrors] = useState([]);



    // Token and headers to get User.
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };
    const token = localStorage.getItem('token');
    if (token != null) {
        headers['Authorization'] = `Token ${token}`;
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/list/?page=${currentPage}`, {
                    headers: headers,
                },);
                setWatchlist(response.data.results.map(product => product.watch));
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

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset current page when search query changes
    };

    const handleFilterChange = (newFilters) => {
        // Update selected filters state
        setSelectedFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
        setCurrentPage(1); // Reset current page when filters change
    };

    const filteredProducts = products.filter((product) => {
        // Filter by search query
        const productName = product.title && product.title.toLowerCase();
        const isMatchingSearch = !search || (productName && productName.includes(search.toLowerCase()));

        // Filter by selected filters
        const isMatchingFilters = Object.keys(selectedFilters).every(filterKey => {
            return selectedFilters[filterKey] === '' || selectedFilters[filterKey] === product[filterKey];
        });

        return isMatchingSearch && isMatchingFilters;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (nextPage) {
            const page = nextPage.split("=")[1]; // Extract the page number from the URL
            console.log("page" + page);
            setCurrentPage(page);
        }
    };

    const handlePrevPage = () => {
        if (prevPage) {
            const page = prevPage.split("=")[1]; // Extract the page number from the URL
            setCurrentPage(page);
        }
    };


    // Wishlist Products 
    const handleWishlist = async (productId) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        };
        if (token != null) {
            headers['Authorization'] = `Token ${token}`;
        }
        console.log("headers : " + { token })

        try {
            // Check if the product is already in the watchlist
            const isAlreadyInWishlist = isProductInWishlist(productId);

            // If the product is not in the watchlist, add it
            if (!isAlreadyInWishlist) {
                const response = await axios.post(
                    'http://localhost:8000/products/watch/',
                    { product: productId },
                    {
                        headers: headers,
                    },
                );
                console.log("Product" + productId)
                console.log(response);

                if (response.status === 200) {
                    setMessage('Product is added into watchlist');
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);
                }
            } else {
                // Product is already in the watchlist, display a message or handle accordingly
                console.log('Product is already in the watchlist');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.non_field_errors) {
                setMessage(error.response.data.non_field_errors);
            }
        }
    };

    const isProductInWishlist = async (product_id, watch) => {
        try {
            const watchId = watch.map(watch => ({ watch }))
            const res = JSON.stringify(watchId)
            const parseData = JSON.parse(res)
            const watch_id = res.includes(product_id) ? true : false;
            console.log("Res" + res)
            return res
        } catch (err) {
            console.error("Error while processing watch data : ", err);
            return false
        }
    };


    return (
        <div>
            <section className="features-section">
                <Container>
                    <h2 className="text-center mb-5">Products</h2>
                    {/* Non field errors */}

                    <div className="row">
                        <div className="col-lg-3 mb-5 mb-lg-0">
                            <FilterSection products={products} handleFilterChange={handleFilterChange} />
                        </div>
                        <div className="col-lg-9">
                            {/* Product Listing */}
                            <Row>
                                {currentProducts.map((product) => (
                                    <Col className="mb-4" key={product.id} md={6} lg={4}>
                                        <div className="product">
                                            <Link
                                                onClick={() => window.top(0, 0)}
                                                to={`/products/detail/${product.id}`}
                                                className="product-header"
                                            >
                                                <img src={product.image} alt="product1" />
                                            </Link>
                                            {token &&

                                                (<button

                                                    type="button"
                                                    className={`btn bt-danger mb-1 ${isProductInWishlist(product.id, product.watch) ? 'active' : 'inactive'}`}
                                                    onClick={() => handleWishlist(product.id)}
                                                >
                                                    <i className='fa fa-heart'></i>
                                                </button>)}
                                            {message && <div>{message}</div>}
                                            <span className='product-line'></span>
                                            <p className="product-platform fw-normal">{product.platform}</p>
                                            <p className="product-title fw-semibold">{product.title}</p>
                                            <div className="product-details">
                                                {/* Display only the first price */}
                                                {product.prices.length > 0 && (
                                                    <div>
                                                        <h6>${product.prices[0].amount}</h6>
                                                    </div>
                                                )}
                                                <Link className="btn btn-primary btn-sm mt-3" to={`/products/detail/${product.id}`}>
                                                    Compare Price
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            {/* No Product found condition */}
                            {search && currentProducts.length === 0 && (
                                <div className="text-center">No Products Found.</div>
                            )}

                            {/* Pagination */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <button className="btn btn-primary btn-sm mt-3" onClick={handlePrevPage} disabled={!prevPage}>Previous</button>
                                <button className="btn btn-primary btn-sm mt-3" onClick={handleNextPage} disabled={!nextPage}>Next</button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Products;
