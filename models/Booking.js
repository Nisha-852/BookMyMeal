const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, default: 'NA' },
  firstname: { type: mongoose.Schema.Types.String, ref: 'User', default: 'Guest' },
  lastname: { type: mongoose.Schema.Types.String, ref: 'User' },
  bookingCategory: { type: String, required: true },
  mealType: { type: String, required: true },
  department: { type: String, default: "Guest" },
  employeeId: { type: String, default: "other" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  bookingCount: { type: Number, default: 0 },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
