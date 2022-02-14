const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const User = require('../models/user');

const verifyToken = (req, res, next) =>{
    let token = req.headers["x-access-token"];

    if(!token){
        res.status(403).send({
            message: "No token!"
        });
    }else{
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                res.status(401).send({
                    message: err
                })
            }else{
                console.log(decoded);
                req.userId = decoded.id;
                next();
            }
        })
    }
};
const isAdmin = (req, res, next) => {
    User.fetchAll(users => {
        var user = users.find(u=>u.id === req.userId);
        if(user.role === 'admin'){
            next();
        }else{
            res.status(403).send({
                message: "Require admin role"
            });
        }
    })
};
const authJwt = {
    verifyToken,
    isAdmin,
};

module.exports = authJwt;