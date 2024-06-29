const express = require('express');
const connectDB = require('./db');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // 确保路径正确

const app = express();

// Connect to MongoDB
connectDB();

// Middleware and routes
app.use(express.json());
// app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('API running');
});

module.exports = {
  path: '/api',
  handler: app,
};

