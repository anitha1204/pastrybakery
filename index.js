const express = require('express');
const connect = require('./common/connection');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = 5000;

// Connect to MongoDB
connect();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', formRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
