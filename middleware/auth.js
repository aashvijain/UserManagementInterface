require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key



// Middleware for authenticating JWT token
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ msg: 'Token is not provided' });

    const token = authHeader.split(' ')[1];  // Extract the token from 'Bearer token'
    if (!token) return res.status(401).json({ msg: 'Token is missing' });

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Token is not valid' });
        req.user = user;  // Attach the user info to request
        next();
    });
};

module.exports = auth;
