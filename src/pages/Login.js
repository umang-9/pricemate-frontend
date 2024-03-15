import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import { Links } from '../App';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
	const [nonFieldErrors, setNonFieldErrors] = useState([]);
	// console.log(nonFieldErrors);
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// console.log("isLoggedIn: " + isLoggedIn);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (inputData) => {
		try {
			const response = await axios.post('http://localhost:8000/login/', inputData, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				},
			});
			if (response.data && response.data.token) {
				localStorage.setItem('token', response.data.token);

				// Set isLoggedIn to true after successful login
				setIsLoggedIn(true);

				// then redirect to other page
				navigate('/'); // Redirect to the home page
			}
		} catch (error) {
			console.error(error);
			if (error.response && error.response.data.non_field_errors) {
				setNonFieldErrors(error.response.data.non_field_errors);
			}
		}
	};

	return (
		<main>
			<section className='login-section'>
				<Container>

					<Row className='justify-content-center'>
						<Col md={6}>
							<Form className="form-with-bg" onSubmit={handleSubmit(onSubmit)}>
								<div className='text-center mb-3'>
									<h2>Login</h2>
									<p>Welcome back! Please sign in to your account.</p>
								</div>
								{/* Non field errors */}
								{nonFieldErrors.map((error) => {
									return (
										<p style={{ color: 'red' }}>{error}</p>
									);
								})}
								{/* Email */}
								<Form.Group
									className='mb-3'
									controlId='formBasicEmail'>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										{...register('email', {
											required: true,
										})}
										aria-invalid={
											errors.email ? 'true' : 'false'
										}
									/>
									{errors.email?.type === 'required' && (
										<Form.Text className='text-danger'>
											Email is required
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group className='mb-3 relative' controlId='formBasicPassword'>
									<Form.Label>Password</Form.Label>
									<InputGroup>
										<Form.Control
											type={showPassword ? 'text' : 'password'}
											placeholder='Password'
											{...register('password', {
												required: 'Password is required',
											})}
											aria-invalid={errors.password ? 'true' : 'false'}
										/>
										<InputGroup.Text onClick={togglePasswordVisibility}>
											{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
										</InputGroup.Text>
									</InputGroup>
									{errors.password && (
										<Form.Text className='text-danger'>
											{errors.password.message}
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group
									className='mb-3 text-end'
									controlId='remeberMeCheckbox'>
									{/* <Form.Check
										type='checkbox'
										label='Remember me'
									/> */}
									{/* <a className='mb-3' href='/forgot-password'>Forgot password?</a> */}
									<Link to={Links.forgotPassword}>Forgot password?</Link>
								</Form.Group>

								{/* Login button */}
								<Button variant='primary' type='submit'>
									Login
								</Button>

								<p className='register-link mt-2'>
									Not a member? <Link to={Links.signUp}>Register Now</Link>
								</p>

							</Form>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
}

export default Login;
