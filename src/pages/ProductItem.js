import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
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
		<Container>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{product && (
				<div>

					<h2>{product.title}</h2>
					<p>
						<a class="btn btn-primary btn-sm" href={product.link}>{capitalLetter(product.platform)}</a>
					</p>
					<img src={product.image} alt={product.title} />
					<div dangerouslySetInnerHTML={{ __html: product.about }} />
				</div>
			)}
		</Container>
	);
}

export default ProductItem;
