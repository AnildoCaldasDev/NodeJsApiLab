"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//conectar ao banco NOSql
mongoose.connect(config.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(conn => {
        console.log('Banco Conectado!');
    })
    .catch(err => {
        console.log('Erro ao conectar com banco de dados: ' + err);
    });


const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregar a Rotas:
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

//definindo os midlewares para toda a aplicação:
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;