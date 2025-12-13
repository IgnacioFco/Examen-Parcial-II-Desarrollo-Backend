const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Registro
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

//
router.get('/test', (req, res) => {
  res.json({ ok: true });
});


module.exports = router;
