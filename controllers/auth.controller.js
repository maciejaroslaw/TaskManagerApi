const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');

var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.fetchAll((users) => {
        // console.log(req.body, req.params);
        const id = +users[users.length - 1].id+1;
        const username = req.body.username;
        const password = bcrypt.hashSync(req.body.password, 8);
        const user = new User(id, username, password);
        user.save();
        res.send({message: "User registered!"})
    })
};
exports.signin = (req, res) => {
    User.fetchAll(users => {
        var user = users.find(u=>u.username === req.body.username);
        console.log(user);
        if(!user){
            res.status(404).send({message: "User not found"})
            return;
        }
        // console.log(user);
        var passwordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordValid){
            res.status(401).send({
                accessToken: null,
                message: "Password invalid",
            })
        }else{
            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400,
            });

            res.status(200).send({
                user,
                accessToken: token,
            })
        }
    })
};

exports.getUsers = (req, res) => {
    User.fetchAll(users => {
        res.send(users);
    })
};