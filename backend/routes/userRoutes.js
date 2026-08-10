const express = require('express')
const router = express.Router()
const {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  getUserById,
  deleteUser,
  updateUser,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.post('/login', authUser)
router.post('/logout', logoutUser)
router.post('/', registerUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.get('/', protect, admin, getUsers)
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser)

module.exports = router
