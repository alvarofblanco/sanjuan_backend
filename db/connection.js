const mongoose = require('mongoose');

const debug = require('debug')('server:dbconnection');
const chalk = require('chalk');

let connection = '';
require('dotenv').config();

switch (process.env.NODE_ENV) {
  case 'local':
    connection = 'mongodb://localhost:27017/sanjuan_dev';
    break;
  case 'development':
    connection = 'mongodb://mongodb:27017/sanjuan_dev';
    break;
  case 'test':
    connection = 'mongodb://mongodb:27017/sanjuan_test';

  default:
    connection = 'mongodb://localhost:27017/sanjuan_dev';
}

const connectDB = () => {
  debug(
    `NODE_ENV: ${chalk.red(
      process.env.NODE_ENV,
    )}\nconnection_string: ${connection}`,
  );
  mongoose.set('useUnifiedTopology', true);
  return mongoose.connect(connection, { useNewUrlParser: true });
};

module.exports = connectDB;
