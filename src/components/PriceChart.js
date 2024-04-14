// PriceChart.js
import React from 'react';
import Col from 'react-bootstrap/Col';
import BarChart from './BarChart';

const PriceChart = ({ product }) => {
    return (
        <Col md={6} className='mt-5 ps-0 ps-md-5'>
            <h4 className='border-bottom pb-3 mb-5'>Price History</h4>
            <div className='w-100'>
                <BarChart data={product.prices} />
            </div>
        </Col>
    );
};

export default PriceChart;
