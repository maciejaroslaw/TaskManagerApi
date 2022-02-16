const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://620cebd0718e4c000837af0e--adoring-banach-08ca3c.netlify.app',
    optionsSuccessStatus: 200
}));

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