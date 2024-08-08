const Link = require('../models/Link');

exports.addLink = async (req, res) => {
  try {
    const { link } = req.body;

    if (!link || !isValidURL(link)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const newLink = new Link({ url: link });
    await newLink.save();

    res.status(201).json({
      message: 'Link saved successfully',
      link: newLink
    });
  } catch (error) {
    console.error('Error saving link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Utility function to validate URLs
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
