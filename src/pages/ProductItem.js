import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Components 
import Breadcrumb from '../components/Breadcrumb';
import PriceList from '../components/PriceList';
import PriceChart from '../components/PriceChart';
import WatchList from '../components/WatchList';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductItem() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
				// console.log(response.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchProductDetails();
	}, [id]);

	return (
		<section className='product-details-section'>
			<Container>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}

				<Breadcrumb />

				{/* Product Details */}
				{product && (
					<Row className='mt-5'>

						<Col md={6} className='pe-0 pe-md-5'>
							<img src={product.image} alt={product.title} />
						</Col>

						<Col md={6}  className='ps-0 ps-md-5'>
							<p className="product-platform fw-normal">{product.platform}</p>
							<h2>{product.title}</h2>

							{/* Add Product to watch list */}
							<WatchList product={product} token={token} headers={headers} setProduct={setProduct} />

							<a className="btn btn-primary btn-sm mt-3" href={product.link} target='_blank'>
								{/* {product.platform.charAt(0).toUpperCase() + product.platform.slice(1)} */}
								Go To Product Link
							</a>
						</Col>

						<Col md={12} className='mt-5'>
							<h4 className='border-bottom pb-3 mb-5'>Desciption</h4>
							<div dangerouslySetInnerHTML={{ __html: product.about }} />
						</Col>

						{/* Product price list */}
						<PriceList product={product} />

						{/* Price chart */}
						<PriceChart product={product} />

					</Row>
				)}
			</Container>
		</section>
	);
}

export default ProductItem;
