const express = require('express');
const cors = require('cors');
require('./database/connection');
const path = require("path")
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');
const app = express();

app.use(express.static(path.join(__dirname, "../assets")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

module.exports = app;