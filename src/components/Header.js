import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { NavLink, useNavigate } from 'react-router-dom';
import { Links } from '../App';

function Header() {
	const navigate = useNavigate();

	const access_token = localStorage.getItem('token');

	const handleLogout = () => {
		// Clear the access token from localStorage
		localStorage.removeItem('token');

		// Redirect the user to the login page
		navigate('/login');
	};

	return (
		<Navbar sticky='top' expand='lg' className='header bg-body-tertiary'>
			<Container>
				<h1 className='main-logo'>
					<Navbar.Brand>
						<LinkContainer to='/'>
							<NavLink>
								<Image
									src='/assets/images/logo.png'
									alt='Price Match'
									fluid
								/>
							</NavLink>
						</LinkContainer>
					</Navbar.Brand>
				</h1>

				{/* Search form */}
				<form class="search-form me-0 me-sm-3">
					<div class="search-form-container bg-light rounded rounded-pill shadow-sm ">
						<div class="input-group">
							<input type="search" placeholder="What're you searching for?" aria-describedby="btnSearch" class="form-control border-0 bg-light" />
							<div class="input-group-append">
								<button id="btnSearch" type="submit" class="btn btn-sm btn-link text-primary"><i class="fa fa-search"></i></button>
							</div>
						</div>
					</div>
				</form>

				<Navbar.Toggle aria-controls='basic-navbar-nav'>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</Navbar.Toggle>

				<Navbar.Collapse className='' id='basic-navbar-nav'>
					<Nav >
						{access_token && (
							<LinkContainer to={Links.indexURL}>
								<Nav.Link>Home</Nav.Link>
							</LinkContainer>
						)}

						{access_token && (
							<LinkContainer to={Links.products}>
								<Nav.Link>Products</Nav.Link>
							</LinkContainer>
						)}

						<LinkContainer to={Links.productRequest}>
							<Nav.Link>Request a product</Nav.Link>
						</LinkContainer>

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

						{access_token && (
							// <a className="btn btn-small btn-primary" onClick={handleLogout}>Logout</a>
							<Button
								className='ms-2'
								variant='primary'
								size='sm'
								onClick={handleLogout}>
								Logout
							</Button>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
