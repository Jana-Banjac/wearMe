import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import products from '../product_list.js'

const Home = () => {
  const isLoading = false;
  const error = null;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1 className="my-4 text-center">Newest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default Home;
