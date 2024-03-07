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
import PageNotFound from './pages/PageNotFound';
import RootLayout from './layouts/RootLayout';


export const Links = {
	indexURL: '/index/',
	login: '/login/',
	signUp: '/signup/',
}


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Index />} />
			<Route path={Links.login} element={<Login />} />
			<Route path={Links.signUp} element={<Signup />} />
			<Route path='*' element={<PageNotFound />} />
		</Route>,
	),
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
