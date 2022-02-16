const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/', (req, res)=>{
    res.send("Działam");
})

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(userRoutes);
// app.get('/users', authController.getUsers);

app.listen(port, ()=>{
    console.log(port);
});