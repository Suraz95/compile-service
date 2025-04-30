const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const compileRouter = require('./routes/index.js');
app.use('/api/v1/compile', compileRouter);
module.exports = app;

