import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import { NavLink } from 'react-router-dom';
import { Links } from '../App';

function Header() {
	return (
		<Navbar sticky="top" expand='lg' className='bg-body-tertiary'>
			<Container>
				<h1 className='main-logo'>
					<Navbar.Brand>
						<LinkContainer to='/'>
							<NavLink>
								<Image src="/assets/images/logo.png" alt="Price Match" fluid />
							</NavLink>
						</LinkContainer>
					</Navbar.Brand>
				</h1>

				<Navbar.Toggle aria-controls='basic-navbar-nav'>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</Navbar.Toggle>

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						<LinkContainer to='/'>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>

						<LinkContainer to={Links.login}>
							<Nav.Link>Login</Nav.Link>
						</LinkContainer>

						<LinkContainer to={Links.signUp}>
							<Nav.Link>Signup</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
