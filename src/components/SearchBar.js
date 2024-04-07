import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/products/search/?q=${query}`);
            if (response.ok) {
                const data = await response.json();

                // Navigate to another page with search results
                navigate(`/search/results/?product=${query}`, { state: { results: data, query } });
                setQuery("");

                // Close the navbar
                props.setSearchNavbarExpanded(false);
            } else {
                console.error('Error fetching search results:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <form className="search-form me-0 me-sm-3" onSubmit={handleSearch}>
            <div className="search-form-container bg-light rounded rounded-pill shadow-sm ">
                <div className="input-group">
                    <input type="search" placeholder="What're you searching for?" aria-describedby="btnSearch" className="form-control border-0 bg-light"
                        value={query} onChange={handleChange} />
                    <div className="input-group-append">
                        <button id="btnSearch" type="submit" className="btn btn-sm btn-link text-primary"><i className="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchBar
