const User = require('../models/user');
const checkDuplicateUsername = (req, res, next) => {
    User.fetchAll(users => {
        const duplicate = users.filter(u=>u.username === req.body.username);
        if(duplicate.length != 0){
            res.status(400).send({message: "Username already taken!"});
        }else{
            next();
        }
    })
};

const verifySignUp = {
    checkDuplicateUsername,
};

module.exports = verifySignUp