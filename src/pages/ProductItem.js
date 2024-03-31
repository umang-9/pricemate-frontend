import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/products/detail/${id}`);
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
					</Row>
				)}
			</Container>
		</section>
	);
}

export default ProductItem;
