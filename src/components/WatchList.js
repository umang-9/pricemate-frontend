// WatchList.js
import React, {useState} from 'react';
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
	const Link = ({ id, children, title }) => (
		<OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
		  <a href="#">{children}</a>
		</OverlayTrigger>
	);

    const addWishlist = async (productId) => {
        try {
            if (productId != null) {
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
    
                    // Update the product.watch array locally
                    const updatedProduct = { ...product };
                    updatedProduct.watch.push(response.data);
                    setProduct(updatedProduct);
                }
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
    
                    // Update the product.watch array locally
                    const updatedProduct = { ...product };
                    updatedProduct.watch.push(response.data);
                    setProduct(updatedProduct);
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
    
                    // Update the product.watch array locally
                    const updatedProduct = { ...product };
                    updatedProduct.watch = updatedProduct.watch.filter(watchItem => watchItem.id !== watchId);
                    setProduct(updatedProduct);
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
                <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => addWishlist(product.id)}
                >
                    {/* <Link title="Add this product to your watchlist to track it's price" id="t-1"> */}
                        <i className="fa fa-heart"></i> Add to watchlist
                    {/* </Link>{' '} */}
                    
                </button>
            )}

            {token && product.watch.length > 0 && (
                product.watch.map((watchData) => (
                    <div key={watchData}>
                        <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() => handleWishlist(product.id, watchData.id)}
                        >
                            {/* <Link title="Remove this product from your watchlist to stop tracking it's price" id="t-1"> */}
                                <i className="fa fa-heart"></i> Remove watchlist
                            {/* </Link>{' '} */}
                        </button>
                        {message && <div>{message}</div>}
                        {/* <p>Watch ID: {watchData.id}</p> */}
                    </div>
                ))
            )}
        </div>
    );
};

export default WatchList;
