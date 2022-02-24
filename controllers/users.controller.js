const User = require('../models/user');
exports.usersList = (req, res) => {
    User.fetchAll(users => {
        let responseUsers = []
        users.forEach(user => {
            responseUsers.push({
                id: user.id,
                username: user.username,
                role: user.role
            })
        });
        res.status(200).send({users: responseUsers});
    })
};