import React, { useEffect, useState } from "react";
import Heading from "../Components/Heading";
import ModalComponent from "../Components/ModalComponent";
import { CSVLink } from "react-csv"; // For CSV export
import Moment from "moment"; // To handle date formatting
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import FormInput from "../Components/FormInput";
import SelectComponent from "../Components/SelectComponent";
import TableContainer from "../Components/TableContainer";
import { columns } from "../constants/generalConsts";
import axiosInstance from "../Axios";

const BookingList = () => {
  const [activeTab, setActiveTab] = useState("rishabh");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [employeesList, setEmployeesList] = useState([]);
  const [bookingsList, setBookingList] = useState([]);
  const [paginationData, setPaginationData] = useState({
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const tabs = [{ id: "rishabh", label: "Rishabh Employees and others" }];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredData = bookingsList.filter((booking) => {
    const mealMonth = Moment(booking.mealDate).month() + 1;
    const mealYear = Moment(booking.mealDate).year();

    const matchesSearchTerm = searchTerm
      ? (booking.name &&
        booking.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.department &&
        booking.department.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    return (
      matchesSearchTerm &&
      (selectedMonth ? mealMonth === selectedMonth : true) &&
      (selectedYear ? mealYear === selectedYear : true)
    );
  });

  const getAllEmployyes = async () => {
    try {
      let { data } = await axiosInstance.get("/users");
      setEmployeesList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllBookings = async () => {
    try {
      const params = {
        searchTerm,
        selectedMonth,
        selectedYear,
        page: currentPage,
        perPage: recordsPerPage,
      };

      const { data } = await axiosInstance.get("/bookings", { params });
      setBookingList(data.bookings);
      setPaginationData(data.pagination);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [searchTerm, selectedMonth, selectedYear, currentPage, recordsPerPage]);

  useEffect(() => {
    getAllEmployyes();
    getAllBookings();
  }, []);

  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = filteredData.slice(
  //   indexOfFirstRecord,
  //   indexOfLastRecord
  // );

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addnewBooking = (newBooking) => {
    getAllBookings();
  }

  return (
    <>
      <div className="container-fluid top-80">
        <div className="container pt-30 mb-30">
          <div className="container-head">
            <div className="container-left">
              <Heading title="Booking List" classes="container-title" />
            </div>
            <div className="container-right">
              <Button
                buttonName={"Add Booking"}
                aria-label="Add Booking"
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              ></Button>
            </div>
          </div>

          <div className="content-tab">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to="#"
                className={`content-tab_link ${activeTab === tab.id ? "active" : ""
                  }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <div className="filter-and-search-container">
            <FormInput
              type="text"
              placeholder="Search by name or department"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <SelectComponent
              options={Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                label: Moment().month(i).format("MMMM"),
              }))}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="filter-select"
              placeholder="Select Month"
            />

            <SelectComponent
              options={Array.from({ length: 5 }, (_, i) => ({
                value: Moment().year() - i,
                label: Moment().year() - i,
              }))}
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="filter-select"
              placeholder="Select Year"
            />

            <SelectComponent
              options={[
                { value: 5, label: "5 records per page" },
                { value: 10, label: "10 records per page" },
                { value: 15, label: "15 records per page" },
                { value: 20, label: "20 records per page" },
              ]}
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
              className="filter-select"
            />

            <CSVLink
              data={filteredData.map(({ _id, userId, __v, ...rest }) => rest)} // Exclude _id, userId, and __v fields
              filename={`employee_booking_data_${selectedMonth || "all"}_${selectedYear || "all"}.csv`} // Dynamic filename
              className={`btn btn-secondary export-btn ${filteredData.length === 0 ? "disabled" : ""}`} // Disable if no data
              onClick={(e) => {
                if (filteredData.length === 0) {
                  e.preventDefault(); // Prevent download if no data
                  alert("No data available to export. Please adjust your filters.");
                }
              }}
            >
              Export Data
            </CSVLink>

          </div>

          {bookingsList && <TableContainer columns={columns} data={bookingsList} className="" />}

          <div className="pagination-container">
            {Array.from({ length: paginationData.totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`pagination-btn ${currentPage === index + 1 ? "active" : ""
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <ModalComponent
          setShowModal={(val) => setShowAddModal(val)}
          callback={addnewBooking}
          employees={employeesList.map((e) => {
            e["label"] = `${e.firstname} ${e.lastname}`; // Concatenate first name and last name
            e["value"] = e.empId; // Keep empId as value
            return e;
          })}
        />

      )}
    </>
  );
};

export default BookingList;

