import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='wearme-footer'>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                <p>wearMe {currentYear} &copy; All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
