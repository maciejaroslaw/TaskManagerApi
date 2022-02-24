const express = require('express');
const authController = require('../controllers/auth.controller');

const verifySignUp = require('../middlewares/verifySignUp');


const router = express.Router();

router.post('/employees', [verifySignUp.checkDuplicateUsername], authController.signup);

router.post('/login', authController.signin);

module.exports = router;
