const User = require('../models/user');
exports.usersList = (req, res) => {
    User.fetchAll(users =>{
        res.status(200).send({
            users,
        })
    })
};