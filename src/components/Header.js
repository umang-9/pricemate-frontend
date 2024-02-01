import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from 'react-router-dom';

function Header() {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Navbar.Brand>
					<LinkContainer to='/'>
						<NavLink>Price Match</NavLink>
					</LinkContainer>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						<LinkContainer to='/'>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>

						<LinkContainer to='/login'>
							<Nav.Link>Login</Nav.Link>
						</LinkContainer>

						<LinkContainer to='/signup'>
							<Nav.Link>Signup</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
