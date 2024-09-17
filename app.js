const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000; 
const mongodbURL = process.env.MongodbURL;

const mongoose = require('mongoose');
mongoose.connect(mongodbURL);

const ItemsRouter = require('./api/items');

app.use('/', ItemsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});