import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";


function Forgot_Password_Confirm() {
    const [nonFieldErrors, setNonFieldErrors] = useState([]);
    console.log(nonFieldErrors);
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    console.log("search params" + searchParams.get('token'));
    const token = searchParams.get('token');

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm();

    const password = watch("password"); // Watch the password field

    const onSubmit = async (inputData) => {
        inputData = { ...inputData, token }  // Add the token
        try {
            const response = await axios.post('http://localhost:8000/forgot-password/confirm/', inputData);
            if (response.status === 200) {
                navigate('/login'); // Redirect to the login page

            } else {
                console.error('Password not updated');
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
                    <h2 className='text-center'>Create a new password</h2>
                    <Row>
                        <Col md={6}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {/* Non field errors */}
                                {nonFieldErrors.map((error) => {
                                    return (
                                        <p style={{ color: 'red' }}>{error}</p>
                                    );
                                })}

                                {/* Password */}
                                <Form.Group className='mb-3' controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter password'
                                        {...register('password', {
                                            required: true,
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: 'Password must contain at least one uppercase, one lowercase, one number, and one special character and be at least 8 characters long.'
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

                                {/* Confirm Password */}
                                <Form.Group
                                    className='mb-3'
                                    controlId='confirmPassword'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirm Password'
                                        {...register('confirmPassword', {
                                            required: 'Confirm password is required',
                                            validate: value => value === password || 'Passwords do not match'
                                        })}
                                        aria-invalid={
                                            errors.confirmPassword ? 'true' : 'false'
                                        }
                                    />
                                    {errors.confirmPassword && (
                                        <Form.Text className='text-danger'>
                                            {errors.confirmPassword.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                {/* Submit button */}
                                <Button variant='primary' type='submit'>
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}
export default Forgot_Password_Confirm;
