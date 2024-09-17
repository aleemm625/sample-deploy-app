// app.js
const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware
const cors = require('cors');     // Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Body parser to handle JSON requests

const app = express();

// Middleware
app.use(morgan('dev'));               // Logs HTTP requests
app.use(cors());                      // Enables CORS for all origins
app.use(bodyParser.json());           // Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parses URL-encoded bodies

// Simple Route Example
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Sample User Route
// const userRouter = require('./routes/user');
// app.use('/api/users', userRouter);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
