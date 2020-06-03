const express = require('express');
const debug = require('debug')('server');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const app = express();

// Env settings

if (process.env.ENV === 'test') {
  debug(`${'this is a test'}`);
  const db = mongoose.connect('mongodb://localhost/sanjuan_test');
} else {
  debug(`${'this is development'}`);
  const db = mongoose.connect('mongodb://localhost/sanjuan_dev');
}

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
