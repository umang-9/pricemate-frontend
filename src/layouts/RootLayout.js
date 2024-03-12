import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/Style.css'; 
import '../assets/css/Responsive.css'; 

export default function RootLayout() {

	return (
		<div className='root-layout'>
			<Header />
			<div className='page-content'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
