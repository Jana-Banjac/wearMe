const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'))
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
    )
  },
})

const upload = multer({ storage })

router.post('/', upload.single('image'), (req, res) => {
  res.json({ image: `/uploads/${req.file.filename}` })
})

module.exports = router
