import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Links } from '../App';

const Breadcrumb = () => {
  const location = useLocation(); // Get the current location object
  const { id } = useParams(); // Get the product ID from URL params
  const [productName, setProductName] = useState('');

  // Function to fetch product details based on ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/products/detail/${id}`);
        const data = await response.json();
        setProductName(data.title); // Assuming the product name is in 'name' field
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    // Fetch product details only if the current route is the product detail page
    if (location.pathname.startsWith('/products/detail/')) {
      fetchProductDetails();
    }
  }, [id, location]);

  // Function to truncate long product names
  const truncateProductName = (name) => {
    return name.length > 20 ? `${name.slice(0, 20)}...` : name;
  };

  // Function to render breadcrumb items
  const renderBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== ''); // Split pathname into segments
    const breadcrumbItems = [];

    // Add Home breadcrumb item
    breadcrumbItems.push(
      <li key="home" className="breadcrumb-item">
        <Link to={Links.indexURL}>Home</Link>
      </li>
    );

    // Add Products breadcrumb item
    breadcrumbItems.push(
      <li key="products" className="breadcrumb-item">
        <Link to={Links.products}>Products</Link>
      </li>
    );

    // Add Product Name breadcrumb item if on product detail page
    if (pathSegments.includes('detail')) {
      breadcrumbItems.push(
        <li key="product" className="breadcrumb-item active" aria-current="page">
          {truncateProductName(productName)}
        </li>
      );
    }

    return breadcrumbItems;
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {renderBreadcrumbItems()}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
