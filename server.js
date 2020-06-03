const express = require('express');
const debug = require('debug')('server');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const connectDB = require('./db/connection');
require('dotenv').config();

const app = express();

// Database connection
connectDB()
  .then(() => {
    debug(`MongoDB connected successfully (${process.env.NODE_ENV})`);
  })
  .catch((e) => {
    debug(`${chalk.red('ERROR could not connect to database')}`);
    // Docker is going to handle the restart of the process
    process.exit(1);
  });

// db config
const PORT = process.env.PORT || 3000;

// Models
const SanJuan = require('./db/models/sanjuanModel');

// Routes
const sanjuanRouter = require('./routers/sanjuanRouter')(SanJuan);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Assign Routers to routes
app.use('/api', sanjuanRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my api' });
});

app.listen(PORT, () => {
  debug(`Running in port ${chalk.green(PORT)}`);
});

app.use('/cars', (req, res) => {
  res.status(200).json({
    message: 'Not implemented yed',
  });
});
