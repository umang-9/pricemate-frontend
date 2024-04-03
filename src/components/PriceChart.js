// PriceChart.js
import React from 'react';
import Col from 'react-bootstrap/Col';
import BarChart from './BarChart';

const PriceChart = ({ product }) => {
    return (
        <Col md={12} className='mt-5'>
            <h3>Price History Chart</h3>
            <div style={{ width: 700 }}>
                <BarChart data={product.prices} />
            </div>
        </Col>
    );
};

export default PriceChart;
