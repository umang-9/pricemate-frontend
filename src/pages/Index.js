import React from 'react';

import ImageCarousel from '../components/ImageCarousel';

import { Links } from '../App'; 

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Index() {
	return (
		<main>

			{/* Banner section start */}
			<ImageCarousel />
			{/* Banner section end */}
		</main>
	);
}

export default Index;
