const { getWorkingDaysInRange } = require('../helpers/utils');
const BookingModal = require('../models/Booking');

exports.getBookings = async (req, res) => {
  try {
    const { searchTerm, selectedMonth, selectedYear, page = 1, perPage = 10 } = req.query;

    let query = {};

    if (searchTerm) {
      query.$or = [
        { firstname: { $regex: searchTerm, $options: "i" } },
        { department: { $regex: searchTerm, $options: "i" } },
      ];
    }

    if (selectedMonth || selectedYear) {
      const startDate = new Date(`${selectedYear || 1970}-${selectedMonth || 1}-01`);
      const endDate = new Date(`${selectedYear || 9999}-${selectedMonth || 12}-31`);
      query.startDate = { $gte: startDate, $lte: endDate };
    }

    const pageNumber = parseInt(page, 10);
    const recordsPerPage = parseInt(perPage, 10);
    const skipRecords = (pageNumber - 1) * recordsPerPage;

    const bookings = await BookingModal.find(query)
      .populate('userId', 'firstname')
      .skip(skipRecords)
      .limit(recordsPerPage)
      .sort({ createdAt: -1 })
      .exec();

    const totalRecords = await BookingModal.countDocuments(query);

    const bookingsWithDates = bookings.map((booking) => {

      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const dateRangeString = getWorkingDaysInRange(start, end)
      return {
        ...booking.toObject(),
        dateRange: dateRangeString,
        totalMealsBooked: dateRangeString.split(",").length || 0
      };
    });

    res.status(200).json({
      bookings: bookingsWithDates,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / recordsPerPage),
        currentPage: pageNumber,
        recordsPerPage,
      },
    });
  } catch (error) {
    console.error('Error Getting bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.addBooking = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      bookingCategory,
      mealType,
      selectedEmployee,
      selectedDepartment,
      startDate,
      endDate,
      bookingCount,
      notes,
    } = req.body;

    if (!bookingCategory || !mealType || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate booking
    const overlappingBooking = await BookingModal.findOne({
      employeeId: selectedEmployee,
      $or: [
        { startDate: { $lte: endDate, $gte: startDate } },
        { endDate: { $lte: endDate, $gte: startDate } },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: 'A booking already exists for this employee in the selected date range.',
      });
    }

    let body = {
      firstname,
      lastname,
      userId: req.userId,
      bookingCategory,
      mealType,
      department: selectedDepartment,
      employeeId: selectedEmployee,
      startDate,
      endDate,
      bookingCount,
      notes,
    };

    const savedBooking = await BookingModal(body).save();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateRange = getWorkingDaysInRange(start, end);
    let totalMealsBooked = dateRange?.split(',').length || 0;

    return res.status(201).json({
      message: 'Booking created successfully',
      booking: { ...savedBooking, totalMealsBooked, dateRange },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getBookingCounts = async (req, res) => {
  try {

    let Emplybookings = await BookingModal.countDocuments({ bookingCategory: 'Employees' });
    let nonEmpBookings = await BookingModal.countDocuments({ bookingCategory: 'Non Employees' });
    let customBookings = await BookingModal.countDocuments({ bookingCategory: 'Custom Booking' });

    console.log(Emplybookings, nonEmpBookings, customBookings, 'sssssssssssssss');


    res.status(200).json({
      emp: Emplybookings,
      nonEmp: nonEmpBookings,
      custom: customBookings
    });


  } catch (error) {
    console.error('Error Getting getBookingCounts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}