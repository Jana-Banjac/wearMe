
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' 
import { Link } from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Card, Button, Badge } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../slices/productApiSlice'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slices/cartSlice'


const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();
  const reviews = product?.reviews ?? [];

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, product: product._id, qty }));
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review submitted');
      setRating('');
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className='btn btn-outline-secondary mb-4' to='/'>
        ← Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Card className='border-0 shadow-sm p-4 mb-4'>
            <Row className='align-items-center'>
              <Col md={8}>
                <h2 className='mb-2'>{product.name}</h2>

                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </Col>

              <Col md={4} className='text-md-end mt-3 mt-md-0'>
                <h3 className='text-primary mb-0'>
                  {product?.price?.toFixed(2)} RSD
                </h3>
              </Col>
            </Row>
          </Card>

          <Row className='gy-4'>
            <Col lg={8}>
              <Card className='border-0 shadow-sm p-4'>
                <div className='text-center'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    style={{
                      maxHeight: '500px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className='border-0 shadow-sm'>
                <Card.Body>
                  <h4 className='mb-4'>Product Details</h4>

                  <div className='d-flex justify-content-between mb-3'>
                    <span>Category:</span>
                    <span>{product.category}</span>
                  </div>

                  <div className='d-flex justify-content-between align-items-center mb-4'>
                    <span>Status:</span>

                    {product.countInStock > 0 ? (
                      <Badge bg='success'>In Stock</Badge>
                    ) : (
                      <Badge bg='danger'>Out of Stock</Badge>
                    )}
                  </div>

                  {product.countInStock > 0 && (
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <span>Quantity:</span>

                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) =>
                          setQty(Number(e.target.value))
                        }
                        style={{
                          width: '90px',
                          textAlign: 'center',
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  )}

                  <div className='d-grid'>
                    <Button
                      className='add-to-cart-btn'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className='border-0 shadow-sm mt-4'>
            <Card.Body>
              <h4 className='mb-3'>Product Description</h4>

              <p className='text-muted mb-0'>
                {product.description}
              </p>
            </Card.Body>
          </Card>

          <Card className='border-0 shadow-sm mt-4'>
            <Card.Body>
              <h4 className='mb-3'>Reviews</h4>

              {reviews.length === 0 ? (
                <Message>No reviews yet</Message>
              ) : (
                <ListGroup variant='flush' className='mb-4'>
                  {reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p className='text-muted mb-2'>
                        {new Date(review.createdAt).toLocaleDateString('en-US')}
                      </p>
                      <p className='mb-0'>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}

              {userInfo ? (
                reviews.find((review) => review.user === userInfo._id) ? (
                  <Message>You have already reviewed this product</Message>
                ) : (
                  <Form onSubmit={submitReviewHandler}>
                    <Form.Group controlId='rating' className='mb-3'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Select
                        value={rating}
                        required
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value=''>Select a rating</option>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value} - {['Poor', 'Fair', 'Good', 'Very good', 'Excellent'][value - 1]}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId='comment' className='mb-3'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={comment}
                        required
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>

                    <Button type='submit' disabled={loadingReview}>
                      {loadingReview ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </Form>
                )
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review.
                </Message>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default ProductScreen;
