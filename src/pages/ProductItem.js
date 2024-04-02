import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

import BarChart from './BarChart';

function ProductItem() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	// Token and headers to get User.
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	};
	const token = localStorage.getItem('token');
	if (token != null) {
		headers['Authorization'] = `Token ${token}`;
	}

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/products/detail/${id}`, {
					headers: headers,
				},);
				setProduct(response.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchProductDetails();
	}, [id]);

	// Format date function
	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
		return formattedDate;
	};

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
		<section className='product-details-section'>
			<Container>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}

				{product && (
					<Row>
						<Col md={6}>
							<img src={product.image} alt={product.title} />
						</Col>
						<Col md={6}>
							<h2>{product.title}</h2>
							<a className="btn btn-primary btn-sm" href={product.link} target='_blank'>
								{product.platform.charAt(0).toUpperCase() + product.platform.slice(1)}
							</a>
						</Col>
						<Col md={12} className='mt-5'>
							<div dangerouslySetInnerHTML={{ __html: product.about }} />
						</Col>
						<Col md={12} className='mt-5'>
							<h3>Prices:</h3>
							<div>
								{product.prices.map((price, index) => (
									<div key={index}>
										<p>Date: {formatDate(price.timestamp)}</p>
										<p>Amount: {price.amount}</p>
									</div>
								))}
							</div>
						</Col>
						<Col md={12} className='mt-5'>
							<h3>Price History Chart</h3>
							<div style={{ width: 700 }}>
								<BarChart data={product.prices} />
							</div>
						</Col>
						<Col md={12} className='mt-5'>
							{/* <h3>Watch:</h3> */}
							<div>
								{token && product.watch.length === 0 && (
									<button
										type="button"
										className="btn bt-danger mb-1"
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



						</Col>
					</Row>
				)}
			</Container>
		</section>
	);
}

export default ProductItem;
