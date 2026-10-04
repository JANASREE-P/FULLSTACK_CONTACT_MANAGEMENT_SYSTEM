require('dotenv').config();

const connectDB = require('./config/db');
const express = require('express');

const app = express();

app.use(express.json());

const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});