const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

const server = express();
mongoose.connect(config.mongoDbURL);
mongoose.Promise = global.Promise;


const port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log(`Server started on port ${port}`);
});