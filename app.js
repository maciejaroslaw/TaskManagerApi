const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:8080"}));

app.get('/', (req, res)=>{
    res.send("Działam");
})

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(userRoutes);
// app.get('/users', authController.getUsers);

app.listen(3000);