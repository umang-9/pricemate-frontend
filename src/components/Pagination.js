import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState([]);

    const fetchProducts = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8000/products/list/?page=${page}`);
            //const { products, totalPages } = response.data.results;
            setProducts(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 12));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            {/* Display the products */}
            {products.map((product) => (
                <div key={product.id}>{product.name}</div>
            ))}

            {/* Pagination controls */}
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous Page
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next Page
            </button>
        </div>
    );
};

export default Pagination