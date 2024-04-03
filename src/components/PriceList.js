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
        <Col md={12} className='mt-5'>
            <h3>Prices:</h3>
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
