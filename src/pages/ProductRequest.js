import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

function ProductRequest() {
	const [nonFieldErrors, setNonFieldErrors] = useState([]);
	const [sayThanks, setSayThanks] = useState('');

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
	} = useForm();

	const onSubmit = async (inputData) => {
		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		};
		const token = localStorage.getItem('token');
		if (token != null) {
			headers['Authorization'] = `Token ${token}`;
		}
		try {
			const response = await axios.post(
				'http://localhost:8000/products/request/',
				inputData,
				{
					headers: headers,
				},
			);
			console.log(response);
			reset();
			setSayThanks('Thank you very much for requesting a new product!');
		} catch (error) {
			console.error(error);
			if (error.response && error.response.data.non_field_errors) {
				setNonFieldErrors(error.response.data.non_field_errors);
			}
			if (error.response && error.response.data.link) {
				setError('link', error.response.data.link);
			}
		}
	};

	return (
		<main>
			<section className='pt-5 pb-5'>
				<Container>
					<Row className='justify-content-center'>
						<Col md={6}>
							<Form
								className='form-with-bg'
								onSubmit={handleSubmit(onSubmit)}>
								<div className='text-center'>
									<h2>Request a product</h2>
								</div>

								{/* Non field errors */}
								{nonFieldErrors.map((error) => {
									return (
										<p style={{ color: 'red' }}>{error}</p>
									);
								})}
								{/* Link */}
								<Form.Group className='mb-3' controlId='link'>
									<Form.Label>Link</Form.Label>
									<Form.Control
										type='text'
										placeholder='Paste a link'
										{...register('link', {
											required: true,
										})}
										aria-invalid={
											errors.link ? 'true' : 'false'
										}
									/>
									{errors.link?.type === 'required' && (
										<Form.Text className='text-danger'>
											Link is required
										</Form.Text>
									)}
									{errors.link && (
										<Form.Text className='text-danger'>
											{errors.link[0]}
										</Form.Text>
									)}

									{console.log(errors.link)}
								</Form.Group>

								{/* Submit button */}
								<Button variant='primary' type='submit'>
									Submit
								</Button>

								<p style={{ color: 'green' }}>{sayThanks}</p>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
}

export default ProductRequest;
