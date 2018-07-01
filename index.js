const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const passport = require('passport');


const config = require('./config/config');
const userRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');

const server = express();
mongoose.connect(config.mongoDbURL);
mongoose.Promise = global.Promise;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(passport.initialize());

require('./config/passport.js')(passport);

server.use('/api/user', userRoutes);
server.use('/api/profile', profileRoutes);

const port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log(`Server started on port ${port}`);
});