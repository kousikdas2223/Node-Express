const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const path = require('path');


app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoute);
app.use('/shop',shopRoute);

app.use((req, res, next) =>{
   res.sendFile(path.join(__dirname,'views','404.html'));
});

//const server = http.createServer(app);
//server.listen(3000);

app.listen(3000);