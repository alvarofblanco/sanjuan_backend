const mongoose = require('mongoose');
let connection = '';
require('dotenv').config();

switch (process.env.NODE_ENV) {
  case 'development':
    connection = 'mongodb://mongo:27017/sanjuan_dev';
    break;
  case 'test':
    connection = 'mongodb://mongo:27017/sanjuan_test';
}

const connectDB = () => {
  return mongoose.connect(connection);
};

module.exports = connectDB;
