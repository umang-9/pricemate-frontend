import React from 'react';
import Col from 'react-bootstrap/Col';

const PriceList = ({ product }) => {

    // Format date function
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return formattedDate;
    };

    return (
        <Col md={6} className='mt-5 pe-0 pe-md-5'>
            <h4 className='border-bottom pb-3 mb-5'>Prices</h4>
            <table className='table table-bordered w-50'>

                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>

                <tbody>
                    {product.prices.map((price, index) => (
                        <tr key={index}>
                            <td>{formatDate(price.timestamp)}</td>
                            <td>{price.amount}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </Col>
    );
};

export default PriceList;
