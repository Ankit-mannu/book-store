const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { swaggerDocs, swaggerUi } = require('./swagger');
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Import routes
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/bookRoute');

// Use routes 
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;
