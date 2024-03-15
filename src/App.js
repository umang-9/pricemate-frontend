import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import './App.css';

import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgot from './pages/Forgot';
import ForgotPasswordConfirm from './pages/ForgotPasswordConfirm';
import PageNotFound from './pages/PageNotFound';
import RootLayout from './layouts/RootLayout';
import Products from './pages/Products';
import ProductItem from './pages/ProductItem';
import ProductRequest from './pages/ProductRequest';

export const Links = {
	indexURL: '/',
	login: '/login',
	signUp: '/signup',
	forgotPassword: '/forgot-password',
	resetPassword: '/forgot-password/confirm',
	products: '/products',
	productItem: '/products/detail/:id',
	productRequest: 'products/request',
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Index />} />
			<Route path={Links.login} element={<Login />} />
			<Route path={Links.signUp} element={<Signup />} />
			<Route path={Links.forgotPassword} element={<Forgot />} />
			<Route
				path={Links.resetPassword}
				element={<ForgotPasswordConfirm />}
			/>
			<Route path='*' element={<PageNotFound />} />
			<Route path={Links.products} element={<Products />} />
			<Route path={Links.productItem} element={<ProductItem />} />
			<Route path={Links.productRequest} element={<ProductRequest />} />
		</Route>,
	),
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
