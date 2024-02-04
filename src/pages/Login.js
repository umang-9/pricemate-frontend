import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm } from 'react-hook-form';

function Login() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const onSubmit = (data) => console.log(data);

	return (
		
		<main>
			<section className='pt-5 pb-5'>
				<Container>
					<h2 className='text-center'>Login</h2>
					<Row>
						<Col md={6}>
							<Form onSubmit={handleSubmit(onSubmit)}>
								{/* Email */}
								<Form.Group
									className='mb-3'
									controlId='formBasicEmail'>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Enter email'
										{...register('userName', {
											required: true,
										})}
										aria-invalid={
											errors.userName
												? 'true'
												: 'false'
										}
									/>
									{errors.userName?.type ===
										'required' && (
										<Form.Text className='text-danger'>
											Username is required
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
											required:
												'Password is required',
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
