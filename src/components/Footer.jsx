import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
<<<<<<< HEAD
                <p>FTN Skriptarnica {currentYear} &copy; Sva prava zadržana.</p>
=======
                <p>Wearify {currentYear} &copy; All rights reserved.</p>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
