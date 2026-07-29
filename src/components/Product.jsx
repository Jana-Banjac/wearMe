import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
<<<<<<< HEAD
    <Card className='my-3 p-3 rounded' >
        <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' style={{height:'250px', objectFit:'cover'}} />
        </Link>
        <Card.Body>
=======
    <Card className='my-3 rounded product-card' >
      <div className='product-image-panel'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' className='product-card-img' />
        </Link>
      </div>
        <Card.Body className='product-info-panel'>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
            <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className='product-title'><strong>{product.name}</strong></Card.Title>
            </Link>
            <Card.Text as="div">
              <Rating value={product.rating} text={`${product.numReviews} recencija`}/>
            </Card.Text>
<<<<<<< HEAD
            <Card.Text as="h3">{product.price} RSD</Card.Text>
=======
            <Card.Text as="h3" className='product-price'>{product.price} $</Card.Text>
>>>>>>> 0032a5bf4b20ad41ea3c31cd86161952a7f4727b
        </Card.Body>
    </Card>
  )
}

export default Product
