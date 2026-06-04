const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  tag:      { type: String, default: 'general' },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
