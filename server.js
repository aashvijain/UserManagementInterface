
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./users');
const path = require('path');  // For serving static files
const app = express();

require('dotenv').config();

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/api/users', userRoutes);

// Serve the HTML file for the root route "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});



const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
  

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
