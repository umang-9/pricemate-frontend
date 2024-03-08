import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
	const [nonFieldErrors, setNonFieldErrors] = useState([]);
	console.log(nonFieldErrors);
	const navigate = useNavigate();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = async (inputData) => {
		try {
            const response = await axios.post('http://localhost:8000/login/', inputData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
            });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
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
			<section className='pt-5 pb-5'>
				<Container>
					<h2 className='text-center'>Login</h2>
					<Row>
						<Col md={6}>
							<Form onSubmit={handleSubmit(onSubmit)}>
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
											errors.userName ? 'true' : 'false'
										}
									/>
									{errors.email?.type === 'required' && (
										<Form.Text className='text-danger'>
											Email is required
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group
									className='mb-3'
									controlId='formBasicPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Password'
										{...register('password', {
											required: 'Password is required',
										})}
										aria-invalid={
											errors.password ? 'true' : 'false'
										}
									/>
									{errors.password && (
										<Form.Text className='text-danger'>
											{errors.password.message}
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group
									className='mb-3'
									controlId='remeberMeCheckbox'>
									<Form.Check
										type='checkbox'
										label='Remember me'
									/>
								</Form.Group>

								{/* Login button */}
								<Button variant='primary' type='submit'>
									Logn
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
}

export default Login;
