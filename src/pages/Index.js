import React from 'react';

import Header from '../components/Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Index() {
  
  return (
    <div class="page-content">

      <Header />

      <main>
        <section className='pt-5 pb-5'>
          <Container>
            <Row>
              <Col md={6}>
                <h2>Index</h2>
                </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
            
  )
}

export default Index