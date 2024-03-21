import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

function Signup() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate = useNavigate();
	const [successMessage, setSuccessMessage] = useState('');
	const [nonFieldErrors, setNonFieldErrors] = useState([]);

	const onSubmit = async (data) => {
		try {
			const response = await axios.post('http://localhost:8000/signup/', data);
			setSuccessMessage('Signup successful! You will be redirected to the login page.');
			setTimeout(() => {
				navigate('/login');
			}, 3000);
		} catch (error) {
			console.error('Error:', error);
			console.log('Error response data:', error.response.data);
			if (error.response && error.response.data.email) {
				setNonFieldErrors(error.response.data.email);
			}
			// Handle registration failure
		}
	};

	return (
		<main>
			<section className='signup-section'>
				<Container>
					<Row className='justify-content-center'>
						<Col md={6}>
							<Form className="form-with-bg" onSubmit={handleSubmit(onSubmit)}>
								<div className='text-center'>
									<h2>Signup</h2>
									<p>Create your account to get started!</p>
								</div>
								{successMessage && (
									<div className="alert alert-success" role="alert">
										{successMessage}
									</div>
								)}
								<Form.Group
									className='mb-3'
									controlId='first_name'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter first name'
										{...register('first_name', {
											required: true,
											pattern: {
												value: /^[a-zA-Z]{2,50}$/,
												message: 'Name must be 2  to 50 characters long and contain only letters.'
											}
										})}
										aria-invalid={
											errors.first_name
												? 'true'
												: 'false'
										}
									/>
									{errors.first_name?.type ===
										'required' && (
											<Form.Text className='text-danger'>
												First name is required
											</Form.Text>
										)
									}
								</Form.Group>

								<Form.Group className='mb-3' controlId='last_name'>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter last name'
										{...register('last_name', {
											required: true,
											pattern: {
												value: /^[a-zA-Z]+(?:['-][a-zA-Z]+)*$/,
												message: 'Only allowed characters'
											}
										})}
										aria-invalid={
											errors.last_name
												? 'true'
												: 'false'
										}
									/>
									{errors.last_name?.type ===
										'required' && (
											<Form.Text className='text-danger'>
												Last name is required
											</Form.Text>
										)
									}
								</Form.Group>

								<Form.Group className='mb-3' controlId='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										{...register('email', {
											required: 'Email is required',
											pattern: {
												value: /^[\w.-]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/,
												message: 'Not a valid email'
											}
										})}
										aria-invalid={
											errors.email
												? 'true'
												: 'false'
										}
									/>
									{errors.email && (
										<Form.Text className='text-danger'>
											{errors.email.message}
										</Form.Text>
									)
									}
								</Form.Group>

								<Form.Group className='mb-3' controlId='password'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Enter password'
										{...register('password', {
											required: 'Password is required',
											minLength: {
												value: 8,
												message: 'Password must be at least 8 characters long',
											},
											pattern: {
												value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
												message: 'Password must contain at least one uppercase, one lowercase, one number, and one special character',
											},
										})}
										aria-invalid={
											errors.password
												? 'true'
												: 'false'
										}
									/>
									{errors.password && (
										<Form.Text className='text-danger'>
											{errors.password.message}
										</Form.Text>
									)}
								</Form.Group>

								<Button variant='primary' type='submit'>
									Signup
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
}

export default Signup;