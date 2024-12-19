const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');
const errorController = require('./controllers/error')
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

//using ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//using express handlebars
//app.engine('handlebars',expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
//app.set('view engine', 'handlebars');
//app.set('views', 'views');

//using pug
//app.set('view engine', 'pug');
//app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

//force: true will never be used in production as we do not want to overwrite existing tables

sequelize.sync({force: true})
.then(result => {
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});


