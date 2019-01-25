require('./models/db');
const express = require('express');
const path = require('path');
const expresshb = require('express-handlebars');
const bodyParser = require('body-parser');
var app = express();

const userController = require('./controllers/userController');


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expresshb({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(3000, () => {
    console.log('Express server started at port: 3000');
});

app.use('/user', userController);