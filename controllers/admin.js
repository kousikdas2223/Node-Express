const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
    //Below code is when we use db scripts or file system    
    /*     const product = new Product(null, title, imageUrl, price, description);
        product.save()
            .then(res.redirect('/'))
            .catch(err => {
                console.log(err);
            }); */
};

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product',
        {
            docTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false
            //activeAddProduct: true,
            //formsCSS: true,
            //productCSS: true
        });
};

exports.getEditProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                res.redirect('/');
            } else {
                res.render('admin/edit-product',
                    {
                        docTitle: 'Edit Product',
                        path: '/admin/edit-product',
                        editing: editMode,
                        product: product
                    });
            }

        })
        .catch(err => {
            console.log(err);
        });

    //Below code is when we use db scripts or file system    
    /*     Product.findById(prodId, product => {
            res.render('admin/edit-product',
                {
                    docTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product
                    //Used for Handlebars
                    //activeAddProduct: true,
                    //formsCSS: true,
                    //productCSS: true
                });
        }); */

};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updateTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedprice = req.body.price;
    const updateddescription = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title = updateTitle;
            product.price = updatedprice;
            product.imageUrl = updatedImageUrl;
            product.description = updateddescription;
            return product.save();
        })
        .then(result => {
            console.log('Updated Product');
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });
    //Below code is when we use db scripts or file system    

    /*     const updatedProduct = new Product(prodId, updateTitle, updatedImageUrl, updatedprice, updateddescription);
    
        updatedProduct.save(); 
        res.redirect('/products'); */
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //Below code is when we use db scripts or file system    
    //Product.deleteById(prodId);
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products',
                {
                    prods: products,
                    docTitle: 'Admin Products',
                    path: 'admin/products',
                });
        })
        .catch(err => {
            console.log(err);
        });
    /*     const products = Product.fetchAll(products => {
            res.render('admin/products',
                {
                    prods: products,
                    docTitle: 'Admin Products',
                    path: 'admin/products',
                });
        }); */
};

