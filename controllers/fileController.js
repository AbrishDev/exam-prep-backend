const File = require('../models/File');
const path = require('path');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newFile = new File({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    });

    await newFile.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: newFile
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file from the filesystem
    const filePath = path.join(__dirname, '../uploads', file.filename);
    fs.unlinkSync(filePath);

    // Delete the file metadata from the database
    await File.deleteOne({ _id: id });

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
