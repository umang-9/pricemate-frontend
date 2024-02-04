import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useForm } from 'react-hook-form';

function Signup() {
	const { register,
		handleSubmit,
		formState: { errors } } = useForm();
	return (
		<main>
			<section className='pt-5 pb-5'>
				<Container>
					<h2>Signup</h2>
					<Row>
						<Col md={6}>
							<Form onSubmit={handleSubmit((data) => {
								console.log(data);
							})}>
								<Form.Group
									className='mb-3'
									controlId='formBasicEmail'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter first name'
										{...register('firstName', {
											required: true,
											pattern: {
												value: /^[a-zA-Z]{2,50}$/,
												message: 'Name must be 2  to 50 characters long and contain only letters.'
											}
										})}
										aria-invalid={
											errors.firstName
												? 'true'
												: 'false'
										}
									/>
									{errors.firstName?.type ===
										'required' && (
											<Form.Text className='text-danger'>
												Firstname is required
											</Form.Text>
										)}
								</Form.Group>

								<Form.Group
									className='mb-3'
									controlId='formBasicEmail'>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter last name'
										{...register('lastName', {
											required: true,
											pattern: {
												value: /^[a-zA-Z]+(?:['-][a-zA-Z]+)*$/,
												message: 'Only allowed characters'
											}
										})}
										aria-invalid={
											errors.lastName
												? 'true'
												: 'false'
										}
									/>
									{errors.lastName?.type ===
										'required' && (
											<Form.Text className='text-danger'>
												lastName is required
											</Form.Text>
										)}
								</Form.Group>

								<Form.Group
									className='mb-3'
									controlId='formBasicEmail'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter email'
										{...register('email', {
											required: true,
											pattern: {
												value: /^[\w\.-]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/,
												message: 'Not a valid email'
											}
										})}
										aria-invalid={
											errors.email
												? 'true'
												: 'false'
										}
									/>
									{errors.email?.type ===
										'required' && (
											<Form.Text className='text-danger'>
												email is required
											</Form.Text>
										)}
								</Form.Group>

								<Form.Group
									className='mb-3'
									controlId='formBasicPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										placeholder='Enter Password'
										{...register('password', {
											required:
												'Password is required',
											pattern: {
												value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
												message: 'Password must conatin atleast one uppercase, one  lowercase, one number and one special character and be atleast 8 characters long.'
											}
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

								{/* Login button */}
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
