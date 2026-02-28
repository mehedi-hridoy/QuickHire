const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api', routes);

app.get('/', (_, res) => res.send('QuickHire API is running...'));

// Global error handler — catches anything thrown from asyncHandler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;
