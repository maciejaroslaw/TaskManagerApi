const express = require('express');

const authJwt = require('../middlewares/authJwt');

const users = require('../controllers/users.controller');
const tasks = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], users.usersList);

router.post('/create-task', [authJwt.verifyToken, authJwt.isAdmin], tasks.createTask);

router.delete('/delete-task/:id', [authJwt.verifyToken, authJwt.isAdmin], tasks.deleteTask);


module.exports = router;