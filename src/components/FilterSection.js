import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function FilterSection({ products, handleFilterChange }) {
    const [filters, setFilters] = useState({
        platform: '',
        price: '',
    });

    useEffect(() => {
        // const uniquePlatforms = Array.from(new Set(products.map(product => product.platform)));
        // if (uniquePlatforms.length > 0) {
        //     setFilters(prevFilters => ({
        //         ...prevFilters,
        //         platform: uniquePlatforms[0]
        //     }));
        //     handleFilterChange({ ...filters, platform: uniquePlatforms[0] });
        // }
    }, [products, filters, handleFilterChange]);

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        // setFilters(prevFilters => ({
        //     ...prevFilters,
        //     [name]: value
        // }));
        // handleFilterChange({ ...filters, [name]: value });
    };

    return (
        <div class="filter-section-container row flex-column">
            
            <h4 className='fw-semibold mb-4 d-none d-lg-block col col-12'>Filters</h4>

            <Form.Group className="mb-0 mb-lg-3 col-6 col-lg-12" controlId="sortFIlter">
                <Form.Label>Sort By:</Form.Label>
                <Form.Select aria-label="sort-filter">
                    <option>Select</option>
                    <option value="1">Alphabetically, A-Z</option>
                    <option value="2">Alphabetically, Z-A</option>
                    <option value="3">Price, low to high</option>
                    <option value="4">Price, high to low</option>
                </Form.Select>
            </Form.Group>
            
            <Navbar sticky='top' expand='lg' className='filter-section col-6 col-lg-12'>
                <Navbar.Toggle className="navbar-toggler" aria-controls="filterSection">
                    <span class="navbar-toggler-icon">Filter</span>
                </Navbar.Toggle>
                <Navbar.Collapse className="flex-column" id="filterSection">
                    <Navbar.Toggle className="navbar-toggler d-lg-none d-xl-block" aria-controls="filterSection">
                        <span class="navbar-toggler-icon">X</span>
                    </Navbar.Toggle>
                    <Form.Group className="mb-3" controlId="platform">
                        <Form.Label>Platform</Form.Label>
                        <Form.Select
                            as="select"
                            name="platform"
                            value={filters.platform}
                            onChange={handleInputChange}
                        >
                            {products.map((product, index) => (
                                <option key={index} value={product.platform}>
                                    {product.platform}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            as="select"
                            name="category"
                            value={filters.price}
                            onChange={handleInputChange}
                        >
                            <option value="">All</option>
                            <option value="under20">$0 - $500</option>
                            <option value="20to50">$500 - $1000</option>
                            <option value="50to100">$1000 - $2000</option>
                        </Form.Select>
                    </Form.Group>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default FilterSection;
