const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.get('/', (req, res)=>{
    res.send("Działam");
})

app.listen(port, ()=>{
    console.log(port);
});