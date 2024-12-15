const express = require('express');
const path = require('path')

const rootDir = require('../util/path');

const adminRouter = express.Router();

adminRouter.get('/add-product',(req, res, next) =>{
    res.sendFile(path.join(rootDir,'views','add-product.html'))
});


adminRouter.post('/product',(req, res, next) =>{
    console.log('In the post request');
    console.log(req.body);
    res.redirect('/shop');
});

module.exports = adminRouter;