// WatchList.js
import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

const WatchList = ({ product, token, headers }) => {

    const { id } = useParams();
    const [message, setMessage] = useState('');
	const navigate = useNavigate();

    // Wishlist Products 
  const handleWishlist = async (productId, watchId) => {
    try {
      // Check if the product is already in the watchlist

      // If the product is not in the watchlist, add it
      if (watchId === null) {
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
        console.log("token", headers)
        // if product already added into watchlist
        const response = await axios.delete(
          `http://localhost:8000/products/watch/delete/${watchId}/`,
          {
            headers: headers,
          },
        );
        console.log(response);

        if (response.status === 204) {
          setMessage('Product is removed from watchlist');
          setTimeout(() => {
            navigate(`/products/detail/${id}`);
            setMessage('');
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.non_field_errors) {
        setMessage(error.response.data.non_field_errors);
      }
    }
  };

  const addWishlist = async (productId) => {
    try {
      // Check if the product is already in the watchlist

      // If the product is not in the watchlist, add it
      if (productId != null) {
        const response = await axios.post(
          'http://localhost:8000/products/watch/',
          { product: productId },
          {
            headers: headers,
          },
        );
        // console.log("Product" + productId)
        // console.log(response);

        if (response.status === 200) {
          setMessage('Product is added into watchlist');
          setTimeout(() => {
            setMessage('');
          }, 3000);
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
            <i className="fa fa-heart"></i> Add to watchlist
          </button>
        )}
        {token && product.watch.length > 0 && (
          product.watch.map((watchData) => (
            <div key={watchData}>
              <button
                type="button"
                className="btn bt-danger mb-1"
                onClick={() => handleWishlist(product.id, watchData.id)}
              >
                <i className="fa fa-heart"></i> Remove watchlist
              </button>
              {message && <div>{message}</div>}
              <p>Watch ID: {watchData.id}</p>
            </div>
          ))
        )}
    </div>
  );
};

export default WatchList;
