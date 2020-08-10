"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//conectar ao banco NOSql
mongoose.connect("mongodb+srv://MongoUser:<password>@cursonodejscluster.uywmy.mongodb.net/<dbname>?retryWrites=true&w=majority", {
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/", indexRoute);
app.use("/products", productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;