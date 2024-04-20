// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./dbConnection');
const studentRoute = require('./routes/studentRoute');

// Instance of express
const app = express();


// Middleware
const corsOptions = {
    origin: [
        'https://student-management-xw21.onrender.com'
    ] // Allow requests from these origins
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use('/', studentRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));