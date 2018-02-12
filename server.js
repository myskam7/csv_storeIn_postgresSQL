const db = require('./db');
const express = require('express');

const app = express();

db.csvStream;

app.use('/', (req, res, next) => {
    db.getProducts((err, product) => {
        if(err){
            return next(err);
        }
        res.send(product);
    })
})

app.use((error, req, res, next) => {
    res.send(error.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('connected to Port ' + PORT);
})