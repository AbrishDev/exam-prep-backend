const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
