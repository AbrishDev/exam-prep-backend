const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Handle form data


// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/instructors', require('./routes/instructorRoutes'));
app.use("/api/questions", questionRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
