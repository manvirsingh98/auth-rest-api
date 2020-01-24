const express = require('express');
const app =  express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./post');
const route = require('./routes/route');


dotenv.config();

//View engine setup
app.engine('hbs', hbs({extname: '.hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
{ useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('connected to db!'));

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());


//Route Middlewares
app.use('/', route);
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server up and running!'));