const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product',
        {
            docTitle: 'Add Product',
            path: '/admin/add-product',
            activeAddProduct: true,
            formsCSS: true,
            productCSS: true
        });
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('admin/products',
            {
                prods: products,
                docTitle: 'Admin Products',
                path: 'admin/products',
            });
    });
}

