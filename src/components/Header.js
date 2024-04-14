import React, { useState } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { NavLink, useNavigate } from 'react-router-dom';
import { Links } from '../App';

import SearchBar from './SearchBar';

function Header() {
	const navigate = useNavigate();
	const [searchNavbarExpanded, setSearchNavbarExpanded] = useState(false);
	const [navbarExpanded, setNavbarExpanded] = useState(false);

	const access_token = localStorage.getItem('token');

	const handleLogout = () => {
		// Clear the access token from localStorage
		localStorage.removeItem('token');

		// Redirect the user to the login page
		navigate('/login');
	};

	return (
		// Main Header Menu 
		<Navbar sticky='top' expand='lg' className='header bg-body-tertiary'  expanded={navbarExpanded}>
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

				{/* Search box start */}
				<Navbar className='search-box' expand='lg' expanded={searchNavbarExpanded} >
					<Navbar.Toggle
						className="navbar-toggler"
						onClick={() => setSearchNavbarExpanded(!searchNavbarExpanded)}
					>
						<span className="navbar-toggler-icon"><i className="fa fa-search" aria-hidden="true"></i></span>
					</Navbar.Toggle>

					<Navbar.Collapse className="flex-column" id="seachBox">

						{/* Search box close button for mobile */}
						<Navbar.Toggle
							className="navbar-toggler navbar-toggler-close"
							aria-controls="seachBox"
							onClick={() => setSearchNavbarExpanded(false)}
						>
							<span className="navbar-toggler-icon"><i className="fa fa-times-circle" aria-hidden="true"></i></span>
						</Navbar.Toggle>

						<SearchBar setSearchNavbarExpanded={setSearchNavbarExpanded} />
					</Navbar.Collapse>
				</Navbar>
				{/* Search box end */}

				{/* Main menu toggle button  */}
				<Navbar.Toggle 
					aria-controls='basic-navbar-nav'
					onClick={() => setNavbarExpanded(!navbarExpanded)}
				>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</Navbar.Toggle>

				{/* Main menu navbar */}
				<Navbar.Collapse className='' id='basic-navbar-nav'>
					<Nav >
						<LinkContainer to={Links.indexURL} >
							<Nav.Link onClick={() => setNavbarExpanded(false)}>Home</Nav.Link>
						</LinkContainer>

						<LinkContainer to={Links.products} >
							<Nav.Link onClick={() => setNavbarExpanded(false)}>Products</Nav.Link>
						</LinkContainer>

						{access_token && (
							<LinkContainer to={Links.WatchList} >
								<Nav.Link onClick={() => setNavbarExpanded(false)}>Watchlist</Nav.Link>
							</LinkContainer>
						)}

						<LinkContainer to={Links.productRequest} >
							<Nav.Link onClick={() => setNavbarExpanded(false)}>Request a product</Nav.Link>
						</LinkContainer>

						{!access_token && (
							<LinkContainer to={Links.login}  onClick={() => setNavbarExpanded(false)}>
								<Nav.Link>Login</Nav.Link>
							</LinkContainer>
						)}

						{!access_token && (
							<LinkContainer to={Links.signUp} >
								<Nav.Link  onClick={() => setNavbarExpanded(false)}>Signup</Nav.Link>
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
