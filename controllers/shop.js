const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    //console.log(adminData.products);
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //const products = adminData.products;
    const products = Product.fetchAll(products => {
        res.render('shop/product-listing',
            {
                prods: products,
                docTitle: 'All Products',
                path: '/products',
                //Handlebars code
                //hasProducts: products.length > 0,
                //activeShop: true,
                //productCSS: true
            });
    });
};

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/index',
            {
                prods: products,
                docTitle: 'Shop',
                path: '/',
                //Handlebars code
                //hasProducts: products.length > 0,
                //activeShop: true,
                //productCSS: true
            });
    });
};

exports.getCart = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/cart',
            {
                prods: products,
                docTitle: 'Your Cart',
                path: '/cart',
            });
    });
};

exports.getOrders = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/cart',
            {
                prods: products,
                docTitle: 'Your Cart',
                path: '/cart',
            });
    });
};

exports.getCheckout = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/checkout',
            {
                prods: products,
                docTitle: 'Checkout',
                path: '/checkout',
            });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-details',
            {
                product: product,
                docTitle: 'Product Details',
                path: '/products'
            }
        );
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

