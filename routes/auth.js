const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth')
router.post('/register', register)
router.post('/login', login)
router.get('/register', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route </a>');
  });

module.exports = router