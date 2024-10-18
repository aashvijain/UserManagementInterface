const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const router = express.Router();
const mongoose = require('mongoose');

require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET;
// Registration API
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).send({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists in MongoDB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// View User Profile API (Requires JWT)
router.get('/profile', auth, async (req, res) => {
    try {
        // Find the user by email in MongoDB
        const user = await User.findOne({ email: req.user.email }).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ name: user.name, email: user.email });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update User Profile API (Requires JWT)
router.put('/profile', auth, async (req, res) => {
    const { name, email } = req.body;

    try {
        // Find user by email in MongoDB
        let user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user's profile
        if (name) user.name = name;
        if (email) user.email = email;

        // Save the updated user
        await user.save();

        // Return the updated user's name and email
        res.json({ msg: 'Profile updated successfully', name: user.name, email: user.email });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
