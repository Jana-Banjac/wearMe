const Order = require('../models/Order')

const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'username email').lean()

    if (order) {
      if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
        order.user = {
          _id: order.user._id,
          name: order.user.username,
          email: order.user.email,
        }
        res.json(order)
      } else {
        res.status(401).json({ message: 'Not authorized to view this order' })
      }
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()

      const paymentResult = req.body.details || req.body

      order.paymentResult = {
        id: paymentResult.id || paymentResult._id || paymentResult.orderID || paymentResult.orderId,
        status: paymentResult.status || paymentResult?.payer?.status,
        update_time: paymentResult.update_time || paymentResult?.update_time,
        email_address:
          paymentResult.email_address ||
          paymentResult?.payer?.email_address ||
          (paymentResult?.payer?.email && paymentResult?.payer?.email.value),
      }

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'username email').lean()
    const cleanedOrders = orders.map((order) => ({
      ...order,
      user: {
        _id: order.user._id,
        name: order.user.username,
        email: order.user.email,
      },
    }))
    res.json(cleanedOrders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
}
