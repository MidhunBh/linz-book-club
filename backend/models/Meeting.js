const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  date:        { type: String, required: true },
  time:        { type: String, required: true },
  location:    { type: String, default: 'Thalia Linz – Landstraße' },
  book:        { type: String, default: '' },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
