require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { CORS_ORIGIN = 'http://localhost:3000', DB_PATH = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_PATH);

app.use(express.json());
app.use(cors({ 'Access-Control-Allow-Origin': CORS_ORIGIN }));
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(() => {
  throw new NotFoundError('404 Not Found');
});
app.use(errorHandler);

module.exports = app;
