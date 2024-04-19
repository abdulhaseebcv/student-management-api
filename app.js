// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./dbConnection');

// Instance of express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectToMongoDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));