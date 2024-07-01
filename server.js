const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/instructors', require('./routes/instructorRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
