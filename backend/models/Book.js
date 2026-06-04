const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  author:       { type: String, default: '' },
  description:  { type: String, default: '' },
  category:     { type: String, required: true, enum: ['Common', 'Fantasy'] },
  suggested_by: { type: String, default: 'unknown' },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
