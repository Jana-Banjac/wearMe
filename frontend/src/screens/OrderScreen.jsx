import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from 'react-bootstrap';

import { toast } from 'react-toastify';

import {
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/orderApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] =
    usePayOrderMutation();

  const [
    deliverOrder,
    { isLoading: loadingDeliver },
  ] = useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] =
    usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (
      !errorPayPal &&
      !loadingPayPal &&
      paypal?.clientId
    ) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'EUR',
          },
        });

        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending',
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        } else {
          paypalDispatch({
            type: 'setLoadingStatus',
            value: 'pending',
          });
        }
      }
    }
  }, [
    errorPayPal,
    loadingPayPal,
    paypal,
    order,
    paypalDispatch,
  ]);

  async function onApprove(data, actions) {
    return actions.order
      .capture()
      .then(async function (details) {
        try {
          await payOrder({
            orderId,
            details,
          }).unwrap();

          refetch();

          toast.success(
            'Order paid successfully'
          );
        } catch (err) {
          toast.error(
            err?.data?.message ||
              err.message ||
              'Error processing order payment'
          );
        }
      });
  }

  async function onApproveTest() {
    await payOrder({
      orderId,
      details: {
        payer: {
          name: 'Test User',
        },
      },
    }).unwrap();

    refetch();

    toast.success(
      'Order paid successfully (test)'
    );
  }

  function onError(err) {
    toast.error(
      err?.data?.message ||
        err.message ||
        'Error processing order payment'
    );
  }

  function createOrder(data, actions) {
    const totalInEur = (
      order.totalPrice / 117.2
    ).toFixed(2);

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalInEur,
            },
          },
        ],
      })
      .then((orderID) => orderID);
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();

      toast.success(
        'Order marked as delivered'
      );
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err.message ||
          'Error marking order as delivered'
      );
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger'>
      Error loading order
    </Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>

        <Col md={8}>
          <ListGroup variant='flush'>

            <ListGroup.Item>
              <h2>Shipping Address</h2>

              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on:{' '}
                  {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>
                  Not delivered
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant='success'>
                  Paid on:{' '}
                  {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>
                  Not paid
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Products</h2>

              {order.orderItems.length === 0 ? (
                <Message>
                  Order is empty
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map(
                    (item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className='align-items-center'>

                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col md={3}>
                            <Link
                              to={`/product/${item.product}`}
                            >
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} x{' '}
                            {item.price.toFixed(2)} RSD
                            ={' '}
                            {(
                              item.qty * item.price
                            ).toFixed(2)}{' '}
                            RSD
                          </Col>

                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>

              <ListGroup.Item>
                <h2>Total</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    {order.itemsPrice.toFixed(2)} RSD
                  </Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {order.shippingPrice.toFixed(2)} RSD
                  </Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>
                    {order.taxPrice.toFixed(2)} RSD
                  </Col>
                </Row>

                <Row>
                  <Col>Total Price</Col>
                  <Col>
                    {order.totalPrice.toFixed(2)} RSD
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        className='btn btn-block'
                        style={{
                          marginBottom: '10px',
                        }}
                      >
                        Pay (test)
                      </Button>

                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {!order.isDelivered &&
                userInfo &&
                userInfo.isAdmin &&
                order.isPaid && (
                  <ListGroup.Item>
                    {loadingDeliver && <Loader />}

                    <Button
                      className='btn btn-block'
                      onClick={deliverOrderHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}

            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  );
};

export default OrderScreen;
