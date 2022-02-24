const express = require('express');

const authJwt = require('../middlewares/authJwt');

const tasks = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/tasks', [authJwt.verifyToken], tasks.getTasks);

router.put('/tasks/:id', [authJwt.verifyToken], tasks.editTask);


module.exports = router;