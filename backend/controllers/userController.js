const User = require('../models/User')
const generateToken = require('../config/generateToken')

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        roles: user.roles,
        active: user.active,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      username: name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        roles: user.roles,
        active: user.active,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})

    const cleanedUsers = users.map((user) => ({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      roles: user.roles,
      active: user.active,
    }))

    res.json(cleanedUsers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        roles: user.roles,
        active: user.active,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.username = req.body.name || user.username
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        roles: updatedUser.roles,
        active: updatedUser.active,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const logoutUser = async (req, res) => {
  res.json({ message: 'Logged out successfully' })
}

module.exports = {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  logoutUser,
}
