import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function FilterSection({ products }) {

    const [filters, setFilters] = useState({
        platform: '',
        price: '',
    });

    return (
        <div class="filter-section-container row flex-lg-column">
            
            <h4 className='fw-semibold mb-4 d-none d-lg-block col col-12'>Filters</h4>

            {/* Sort by filter */}
            <Form.Group className="mb-0 mb-lg-3 col-12 col-sm-6 col-lg-12 sort-by-select-group" controlId="sortFIlter">
                <Form.Label>Sort By:</Form.Label>
                <Form.Select aria-label="sort-filter">
                    <option>Select</option>
                    <option value="1">Alphabetically, A-Z</option>
                    <option value="2">Alphabetically, Z-A</option>
                    <option value="3">Price, low to high</option>
                    <option value="4">Price, high to low</option>
                </Form.Select>
            </Form.Group>

            {/* Main filter start  */}
            <div className='filter-section col-12 col-sm-6 col-lg-12'>
                <Navbar expand='lg' className=''>

                    {/* Filter title and filter icon for mobile view */}
                    <Navbar.Toggle className="navbar-toggler" aria-controls="filterSection">
                        <span>Filter</span>
                        <span class="navbar-toggler-icon"><i class="fa fa-sliders" aria-hidden="true"></i></span>
                    </Navbar.Toggle>
                    
                    {/* Filter menu */}
                    <Navbar.Collapse className="flex-column" id="filterSection">

                        {/* Filter menu close button for mobile */}
                        <Navbar.Toggle className="navbar-toggler navbar-toggler-close" aria-controls="filterSection">
                            <span class="navbar-toggler-icon"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                        </Navbar.Toggle>

                        {/* Platform Filter */}
                        <Form.Group className="filter-input mb-3" controlId="platform">
                            <Form.Label>Platform</Form.Label>
                            <Form.Select
                                as="select"
                                name="platform"
                                value={filters.platform}
                                
                            >
                                {products.map((product, index) => (
                                    <option key={index} value={product.platform}>
                                        {product.platform}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Category filter */}
                        <Form.Group className="filter-input mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                as="select"
                                name="category"
                                value={filters.price}
                                
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
        </div>
    );
}

export default FilterSection;
