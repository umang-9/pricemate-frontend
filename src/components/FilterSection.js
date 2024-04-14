import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function FilterSection({ products, handleSort, navigateToFirstPage, handleFilterByPrice }) {

    const [priceRange, setPriceRange] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [navbarExpanded, setNavbarExpanded] = useState(false);

    const handlePriceRangeChange = (e) => {
        const { value } = e.target;
        console.log("prize filter value: " + value)
        setPriceRange(value);
        handleFilterByPrice(value);
        navigateToFirstPage();
        setNavbarExpanded(false);
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortBy(value);
        handleSort(value);
        navigateToFirstPage();
    };

    return (
        <div className="filter-section-container row flex-lg-column" sticky="top">
            
            <h4 className='fw-semibold mb-4 d-none d-lg-block col col-12'>Filters</h4>

            {/* Sort by filter */}
            <Form.Group className="mb-0 mb-lg-3 col-12 col-sm-6 col-lg-12 sort-by-select-group" controlId="sortFIlter">
                <Form.Label>Sort By:</Form.Label>
                <Form.Select aria-label="sort-filter" onChange={handleSortChange} value={sortBy}>
                    <option>Select</option>
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price__amount">Price, low to high</option>
                    <option value="-price__amount">Price, high to low</option>
                </Form.Select>
            </Form.Group>

            {/* Main filter start  */}
            <div className='filter-section col-12 col-sm-6 col-lg-12'>

                {/* Category filter */}
                <Form.Group className="filter-input mb-0 mb-md-4" controlId="category">
                    <Form.Label>Price</Form.Label>
                    <Form.Select
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                    >
                        <option value="">All</option>
                        <option value="price__0__100">$0 - $100</option>
                        <option value="price__100__500">$100 - $500</option>
                        <option value="price__500__1000">$500 - $1000</option>
                        <option value="price__1000__2000">$1000 - $2000</option>
                    </Form.Select>
                </Form.Group>
                
            </div>
        </div>
    );
}

export default FilterSection;
