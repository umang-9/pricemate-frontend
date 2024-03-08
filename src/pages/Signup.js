import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
	const navigate = useNavigate ();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/signup/', data);
            console.log(response.data);
            // Handle successful registration
			navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            // Handle registration failure
        }
    };

    return (
        <main>
            <section className='pt-5 pb-5'>
                <Container>
                    <h2>Signup</h2>
                    <Row>
                        <Col md={6}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className='mb-3' controlId='first_name'>
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
												Firstname is required
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
												lastName is required
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
										)
									}
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter password'
                                        {...register('password', { 
											required: true,
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