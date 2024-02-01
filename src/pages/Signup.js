import React from 'react';

import Header from '../components/Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Signup() {
  
  return (
    <div class="page-content">

      <Header />

      <main>
        <section className='pt-5 pb-5'>
          <Container>
            <h2>Signup</h2>
            <Row>
              <Col md={6}>
                <Form>
                  <p>Sign up form</p>
                </Form>
                </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
            
  )
}

export default Signup