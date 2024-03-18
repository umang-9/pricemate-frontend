import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';


function Forgot() {
    const [nonFieldErrors, setNonFieldErrors] = useState([]);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();




    const onSubmit = async (inputData) => {
        try {
            await axios.post('http://localhost:8000/forgot-password/', inputData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
            });
            setIsEmailSent(true);

        } catch (error) {
            console.error('Error:', error);
    console.error('Error response inputData:', error.response.inputData);
            if (error.response && error.response.inputData.non_field_errors) {
                setNonFieldErrors(error.response.inputData.non_field_errors);
            }
        }
    };

    return (
        <main>
            <section className='pt-5 pb-5'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <Form className="form-with-bg" onSubmit={handleSubmit(onSubmit)}>
                                <div className='text-center'>
                                    <h2>Forgot Password</h2>
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

                                {/* Forgot-Password button */}
                                <Button variant='primary' type='submit'>
                                    Send
                                </Button>

                                {/* Display message onclick*/}
                                {
                                    isEmailSent && (
                                        <p style={{ color: 'green' }}>We have sent you an email with the link to reset your password. Please check your inbox and click on the link to complete the password reset process.</p>
                                    )
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Forgot;
