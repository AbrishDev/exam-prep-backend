const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const fileRoutes = require('./routes/fileRoutes');
const linkRoutes = require('./routes/linkRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Handle form data
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/instructors', require('./routes/instructorRoutes'));
app.use("/api/questions", questionRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/links', linkRoutes);



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
