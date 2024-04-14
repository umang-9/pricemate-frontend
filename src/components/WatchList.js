import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const WatchList = ({ product, token, headers, setProduct }) => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const isProductInWatchlist = product.watch.some(watchItem => String(watchItem.product) === String(id));

    // console.log("isProductInWatchlist:" +isProductInWatchlist);

    const addWishlist = async (productId) => {
        try {   
            if (productId != null) {
                const response = await axios.post(
                    'http://127.0.0.1:8000/products/watch/',
                    { product: productId },
                    { headers: headers }
                );

                // if (response.status === 200) {
                    setMessage('Product is added into watchlist');
                    console.log("Added");
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);

                    // Update the product object
                    setProduct(prevProduct => ({
                        ...prevProduct,
                        watch: [...prevProduct.watch, response.data]
                    }));
                // }
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.non_field_errors) {
                setMessage(error.response.data.non_field_errors);
            }
        }
    };

    const handleWishlist = async (productId, watchId) => {
        try {
            if (watchId === null) {
                const response = await axios.post(
                    'http://127.0.0.1:8000/products/watch/',
                    { product: productId },
                    { headers: headers }
                );
                if (response.status === 200) {
                    setMessage('Product is added into watchlist');
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);

                    // Update the product object
                    setProduct(prevProduct => ({
                        ...prevProduct,
                        watch: [...prevProduct.watch, response.data]
                    }));
                }
            } else {
                const response = await axios.delete(
                    `http://127.0.0.1:8000/products/watch/delete/${watchId}/`,
                    { headers: headers }
                );
                if (response.status === 204) {
                    setMessage('Product is removed from watchlist');
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);

                    // Update the product object by filtering out the removed item
                    setProduct(prevProduct => ({
                        ...prevProduct,
                        watch: prevProduct && prevProduct.watch ? prevProduct.watch.filter(item => item.id !== watchId) : []
                    }));
                    
                }
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.non_field_errors) {
                setMessage(error.response.data.non_field_errors);
            }
        }
    };

    return (
        <div className='mt-4 mb-3'>
            {token && product.watch.length === 0 && (
                <div>
                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => addWishlist(product.id)}
                    >
                        <i className="fa fa-heart"></i> Add to watchlist
                    </button>
                    {message && <div className="text-success fw-semibold" role="alert">{message}</div>}
                </div>
            )}

            {token && product.watch.length > 0 && (
                product.watch.map((watchData) => (
                    <div key={watchData.id}>
                        <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() => handleWishlist(product.id, watchData.id)}
                        >
                            <i className="fa fa-heart"></i> Remove watchlist
                        </button>
                        {message && <div className="text-success fw-semibold" role="alert">{message}</div>}
                    </div>
                ))
            )}
        </div>
    );
};

export default WatchList;
