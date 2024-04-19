import React, {useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/esm/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Links } from '../App'; 

import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

function Footer() {
	const access_token = localStorage.getItem('token');
	const [email, setEmail] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/newsletter/', { email });
            setMessage(response.data.message);
			console.log(response.data.message);
			setSuccessMessage('You have successfully registered to our newsletter');
            setEmail('');
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again later.');
        }
    };

  	return (
		<footer>
			<div className='footer-top'>
				<Container>
					<Row>

						<Col sm={12} md={6} lg={3}>
							<div className="foot-box">
								<Image src="/assets/images/logo.png" alt="Price Match" fluid />
								<h5 className='mt-5 mt-md-3'>OUR ADDRESS</h5>
								<address>
									<p>403-7 Erie Avnue</p>
									<p>Brantford, ON-N3S0K5</p>
									<p>Canada</p>
								</address>
							</div>
						</Col>

						<Col sm={12} md={6} lg={3}>
							<div className="foot-box">
								<h5>QUICK LINKS</h5>
								<Nav className='ms-auto'>
									{access_token && (
										<LinkContainer to='/'>
											<Nav.Link>Home</Nav.Link>
										</LinkContainer>
									)}

									{access_token && (
										<LinkContainer to={Links.products}>
											<Nav.Link>Products</Nav.Link>
										</LinkContainer>
									)}

									{!access_token && (
										<LinkContainer to={Links.login}>
											<Nav.Link>Login</Nav.Link>
										</LinkContainer>
									)}

									{!access_token && (
										<LinkContainer to={Links.signUp}>
											<Nav.Link>Signup</Nav.Link>
										</LinkContainer>
									)}
								</Nav>
								<h5 className='mt-3 mb-2'>SUBSCRIBE TO OUR NEWSLETTER</h5>
								<Form onSubmit={handleSubmit}>
									<Form.Group className="mb-3">
										<Form.Control 
											type="email" 
											placeholder="Enter your email"  
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Group>
									<Form.Group className="mb-3">
										<Button variant='primary' type='submit'>
											Subscribe
										</Button>
									</Form.Group>
									{successMessage && (
									<div className="alert alert-success" role="alert">
										{successMessage}
									</div>
								)}
								</Form>
							</div>
						</Col>
						
						<Col sm={12} md={6} lg={3}>
							<div className="foot-box">
								<h5>CONTACT INFORMATION</h5>
								<p>Have questions or need support?</p>
								<h5 className='mt-5 mt-md-0'>CONTACT US:</h5>
								<ul>
									<li>Email: <a href="mailto:info@pricemate.com">info@pricemate.com</a></li>
									<li>Phone: <a href="tel:18001234567">1-800-123-4567</a></li>
								</ul>
								
							</div>
						</Col>
						
						<Col sm={12} md={6} lg={3}>
							<div className="foot-box">
								<h5>CONNECT WITH US</h5>
								<p>Stay connected with us on social media for updates, deals, and more:</p>
								<div className="social-icons">
									<a href="https://www.facebook.com/" target='_blank'><i className="fa fa-facebook" aria-hidden="true"></i></a>
									<a href="https://www.twitter.com" target='_blank'><i className="fa fa-twitter" aria-hidden="true"></i></a>
									<a href="https://www.linkedin.com" target='_blank'><i className="fa fa-linkedin" aria-hidden="true"></i></a>
									<a href="https://www.google.com" target='_blank'><i className="fa fa-google-plus" aria-hidden="true"></i></a>
								</div>
							</div>
						</Col>
						
						
					</Row>
				</Container>
			</div>

			<div className='footer-bottom'>
				<Container>
					<p className="copyright">
						© 2024 <Link to={Links.indexURL}>Price Mate </Link>. All rights reserved
					</p>
				</Container>
			</div>
		</footer>
  	)
}

export default Footer