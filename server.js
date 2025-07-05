require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); 

require('./config/db.config'); 

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'))
// User routes
app.use('/api/users', userRoutes);
// Booking routes
app.use('/api/bookings', bookingRoutes); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
