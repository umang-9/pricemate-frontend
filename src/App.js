import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';

export const links = {
  indexURL: '/index',
  login: '/login',
  signUp: '/signup',
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path={links.indexURL} element={<Index />} />
        <Route path={links.login} element={<Login />} />
        <Route path={links.signUp} element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
