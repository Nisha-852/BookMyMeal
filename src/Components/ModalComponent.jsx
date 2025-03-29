import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, differenceInCalendarDays } from "date-fns";
import FormText from "./FormText";
import Button from "./Button";
import SelectComponent from "./SelectComponent";
import Select from "react-select";
import { DEPARTMENTS } from "../constants/generalConsts";
import axiosInstance from "../Axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastStyle } from '../constants/generalConsts';
import { useNavigate } from 'react-router-dom';
import { isSameDay } from "date-fns";

const ModalComponent = ({ setShowModal, employees, callback }) => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [mealType, setMealType] = useState("Lunch");
  const [bookingCategory, setBookingCategory] = useState("Employees");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingCount, setBookingCount] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    //  optimized it 
    if (bookingCategory === "Employees") {
      if (!selectedDepartment)
        formErrors.department = "Please select a department.";
      if (!selectedEmployee) formErrors.employee = "Please select an employee.";
    }

    if (!startDate || !endDate)
      formErrors.date = "Please select a start and end date.";

    if (bookingCategory !== "Employees") {
      if (!bookingCount || isNaN(bookingCount))
        formErrors.count = "Please enter a valid booking count.";
      else if (parseInt(bookingCount, 10) > 50)
        formErrors.count = "Booking count cannot exceed 50.";
    }

    return formErrors;
  };


  // const handleFormSubmit = async () => {
  //   try {
  //     const formErrors = validateForm();
  //     if (Object.keys(formErrors).length > 0) {
  //       setErrors(formErrors);
  //       return;
  //     }

  //     let dataObj = {
  //       selectedEmployee: selectedEmployee?.empId,
  //       firstname: selectedEmployee?.firstname,
  //       lastname: selectedEmployee?.lastname,
  //       bookingCategory,
  //       mealType,
  //       startDate,
  //       endDate,
  //       bookingCount,
  //       notes,
  //       selectedDepartment,
  //     };

  //     let { data } = await axiosInstance.post("/bookings", dataObj);

  //     console.log("Form submitted successfully!", {});
  //     console.log(data, 'sdsdsdfdfsdf')
  //     callback(data.booking);
  //     setShowModal(false);

  //     alert("Booking Sucessfull")
  //     setTimeout(() => navigate('/booking'), 1000);
  //   } catch (error) {
  //     console.error('Booking error:', error.response?.data || error.message);
  //     toast.error(error.response?.data.message || 'Booking failed', toastStyle);
  //   }
  // };


  // const handleFormSubmit = async () => {
  //   try {
  //     const formErrors = validateForm();
  //     if (Object.keys(formErrors).length > 0) {
  //       setErrors(formErrors);
  //       return;
  //     }
  
  //     // Check for duplicate booking
  //     const { data: existingBookings } = await axiosInstance.get("/bookings", {
  //       params: {
  //         employeeId: selectedEmployee?.empId,
  //         startDate,
  //         endDate,
  //       },
  //     });
  
  //     if (existingBookings.length > 0) {
  //       toast.error('Duplicate booking exists for the selected date range.', toastStyle);
  //       return;
  //     }
  
  //     let dataObj = {
  //       selectedEmployee: selectedEmployee?.empId,
  //       firstname: selectedEmployee?.firstname,
  //       lastname: selectedEmployee?.lastname,
  //       bookingCategory,
  //       mealType,
  //       startDate,
  //       endDate,
  //       bookingCount,
  //       notes,
  //       selectedDepartment,
  //     };
  
  //     let { data } = await axiosInstance.post("/bookings", dataObj);
  
  //     callback(data.booking);
  //     setShowModal(false);
  //     alert("Booking Sucessfull")
  //     toast.success('booking', toastStyle);
  //     setTimeout(() => navigate('/booking'), 1000);
  //   } catch (error) {
  //     console.error('Booking error:', error.response?.data || error.message);
  //     toast.error(error.response?.data.message || 'Booking failed', toastStyle);
  //   }
  // };

  const handleFormSubmit = async () => {
    try {
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
  
      // Overlap check only applies for Non-Employees or Custom Booking
      if (bookingCategory === "Non Employees" || bookingCategory === "Custom Booking") {
        const { data: existingBookings } = await axiosInstance.get("/bookings", {
          params: {
            startDate,
            endDate,
          },
        });
  
        // Check for overlapping dates
        if (existingBookings.length > 0) {
          toast.error('Booking failed: Date range overlaps with existing bookings.', toastStyle);
          return;
        }
      }
  
      // Check for duplicate bookings for Employees
      if (bookingCategory === "Employees") {
        const { data: existingBookings } = await axiosInstance.get("/bookings", {
          params: {
            employeeId: selectedEmployee?.empId,
            startDate,
            endDate,
          },
        });
  
        if (existingBookings.length > 0) {
          toast.error('Duplicate booking exists for the selected date range.', toastStyle);
          return;
        }
      }
  
      let dataObj = {
        selectedEmployee: selectedEmployee?.empId,
        firstname: selectedEmployee?.firstname,
        lastname: selectedEmployee?.lastname,
        bookingCategory,
        mealType,
        startDate,
        endDate,
        bookingCount,
        notes,
        selectedDepartment,
      };
  
      let { data } = await axiosInstance.post("/bookings", dataObj);
  
      callback(data.booking);
      setShowModal(false);
      alert("Booking Successful");
      toast.success('Booking Successful', toastStyle);
      setTimeout(() => navigate('/booking'), 1000);
    } catch (error) {
      console.error('Booking error:', error.response?.data || error.message);
      toast.error(error.response?.data.message || 'Booking failed', toastStyle);
    }
  };
  
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const calculateDaysRange = () => {
    if (!startDate || !endDate) return "";

    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {

      dateArray.push(new Date(currentDate));

      currentDate.setDate(currentDate.getDate() + 1);
    }

    const workingDays = dateArray.filter((date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    });


    return `Total ${workingDays.length} working days selected`;
  };

  return (
    <div className="modal-container top-80">
      <button className="close-btn" onClick={() => handleCloseModal()}>
        X
      </button>

      <div className="modal-header">
        <h5 className="modal-title">Book a Meal</h5>
      </div>
      <div className="modal-body">
        <div className="form-group custom-radio">
          <label>Select Category</label>
          <div className="d-flex align-content-center justify-content-start">
            {["Employees", "Non Employees", "Custom Booking"].map(
              (category) => (
                <div className="radio-block" key={category}>
                  <input
                    type="radio"
                    id={category}
                    name="category-group"
                    value={category}
                    checked={bookingCategory === category}
                    onChange={() => setBookingCategory(category)}
                  />
                  <label htmlFor={category} className="mr-0">
                    {category}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        {bookingCategory === "Employees" && (
          <div className="form-group">
            <label></label>

            <SelectComponent
              label={"Select Department"}
              options={DEPARTMENTS}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={`form-control ${errors.department ? "is-invalid" : ""
                }`}
              placeholder="Select Department"
            />
            {errors.department && (
              <div className="invalid-feedback">{errors.department}</div>
            )}
          </div>
        )}

        <div className="form-group custom-radio">
          <label>Select Meal</label>
          <div className="d-flex align-content-center justify-content-start">
            {["Lunch", "Dinner"].map((meal) => (
              <div className="radio-block" key={meal}>
                <input
                  type="radio"
                  id={meal}
                  name="meal-group"
                  value={meal}
                  checked={mealType === meal}
                  onChange={() => setMealType(meal)}
                />
                <label htmlFor={meal} className="mr-0">
                  {meal}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group ">
          <label>Select Date Range</label>
          <div className="input-group date-picker-input ">
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              maxDate={addMonths(new Date(), 3)}
              placeholderText="Select Date Range"
              className={`form-control border-right-0 ${errors.date ? "is-invalid" : ""
                }`}
              filterDate={(date) => {

                const day = date.getDay();
                return day !== 0 && day !== 6;
              }}
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>

          {startDate && endDate && <p>{calculateDaysRange()}</p>}
        </div>

        {bookingCategory === "Employees" && (
          <div className="form-group">
            <label>Select Employee</label>
            <Select
              options={employees}
              onChange={setSelectedEmployee}
              value={selectedEmployee}
              className={` ${errors.employee ? "is-invalid" : ""}`}
              isSearchable={true}
              menuPlacement="auto"
              styles={{
                menu: (provided) => ({ ...provided, maxHeight: '150px', overflowY: 'auto' }), // Limit dropdown height
              }}
            />
            {errors.employee && (
              <div className="invalid-feedback">{errors.employee}</div>
            )}
          </div>
        )}

        {bookingCategory !== "Employees" && (
          <>
            <FormText
              label="Booking Count"
              type="text"
              className={`form-control ${errors.count ? "is-invalid" : ""}`}
              placeholder={errors.count || "Enter Booking Count"}
              value={errors.count ? "" : bookingCount}
              onChange={(e) => setBookingCount(e.target.value)}
            />
            {errors.count && (
              <div className="text-danger mt-1">{errors.count}</div>
            )}

            <FormText
              label={"Notes"}
              className="form-control"
              rows="4"
              placeholder="Type here.."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </>
        )}

        <div className="modal-footer">
          <Button
            buttonName={"Cancel"}
            type="button"
            className="btn btn-outline-primary"
            onClick={handleCloseModal}
          />
          <Button
            buttonName={"Book"}
            type="button"
            className="btn btn-primary"
            onClick={handleFormSubmit}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalComponent;
