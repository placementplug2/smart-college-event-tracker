const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    venue: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    organizer: { type: String, required: true },
    capacity: { type: Number, default: 0 },
    registeredCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    isOnline: { type: Boolean, default: false },
    registrationLink: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
