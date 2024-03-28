import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

function ProductItem() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/products/detail/${id}`,
				);
				setProduct(response.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchProductDetails();
	}, [id]);
	const capitalLetter = (platform) => {
		return platform.charAt(0).toUpperCase() + platform.slice(1);
	}
	return (
		<section className='product-details-section'>
			<Container>
				{loading && <p>Loading...</p>}
				{/* {error && <p>Error: {error}</p>} */}
				
				{product && (
					<Row>
						<Col md={6}>
							<img src={product.image} alt={product.title} />
						</Col>
						<Col md={6}>
							<h2>{product.title}</h2>
							<a class="btn btn-primary btn-sm" href={product.link}>{capitalLetter(product.platform)}</a>
						</Col>
						<Col md={12} className='mt-5'>
							<div dangerouslySetInnerHTML={{ __html: product.about }} />
						</Col>
					</Row>
				)}
			</Container>
		</section>
	);
}

export default ProductItem;
