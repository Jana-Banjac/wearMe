const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/productController')
const { protect, admin } = require('../middleware/authMiddleware')

router.get('/top', getTopProducts)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.post('/:id/reviews', protect, createProductReview)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

module.exports = router
