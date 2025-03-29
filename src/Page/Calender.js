import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import btn from '../assets/images/add-btn-2.svg';
import Heading from '../Components/Heading';
import BookingBlock from '../Components/BookingBlock';
import CalendarComponent from '../Components/CalendarComponent';
import moment from "moment"
import axiosInstance from '../Axios';




const Calendar = () => {

  const [calendarEvents, setCalendarEvents] = useState([])
  const [counts, setCounts] = useState({});

  const getCalendarEvents = async () => {
    try {
      let params = {
        perPage: 10000
      }
      const { data } = await axiosInstance.get('/bookings', { params });
      console.log(data.bookings)
      setCalendarEvents(data.bookings);
    } catch (error) {
      console.log(error)
    }
  }

  const getCounts = async () => {
    try {
      let { data } = await axiosInstance.get('/bookings/booking-counts')
      setCounts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCalendarEvents();
    getCounts();
  }, [])

  return (
    <div className="container-fluid top-80">
      <div className="calendar-wrapper">
        <div className="container">
          <Heading title="Calendar" classes="main-title" />
          <div className="row">
            <div className="col-lg-9">
              <div className="tile">
                <CalendarComponent eventsList={calendarEvents} />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="tile">
                <Heading title={moment().format('dddd, D MMM YYYY')} classes="tile-title" />
                <div className="booking-wrapper">
                  <div className="booking-block" style={{ backgroundColor: 'Blue' }}>
                    <h5>
                      <Link to="/registration" style={{ textDecoration: 'none', color: 'white' }}>
                        Add New Registration
                      </Link>
                    </h5>
                    <Link to="/registration" aria-label="Add Registration">
                      <img src={btn} alt="Add" />
                    </Link>
                  </div>

                  {/* emp: Emplybookings,
      nonEmp: nonEmpBookings,
      custom: customBookings */}



                  {/* { title: 'Employees', count: currentDateBookings[0], icon: 'icon-employees', link: '#' },
    { title: 'Non Employees', count: currentDateBookings[1], icon: 'icon-employees', link: '#' },
    { title: 'Buffer', count: currentDateBookings[2], icon: 'icon-buffer', link: '#' }, */}

                  <BookingBlock
                    title={'Employees'}
                    count={counts.emp}
                    icon={'icon-employees'}
                    link={'#'}
                  />
                  <BookingBlock
                    title={'Non Employees'}
                    count={counts.nonEmp}
                    icon={'icon-employees'}
                    link={'#'}
                  />
                  <BookingBlock
                    title={'Custom Employee'}
                    count={counts.custom}
                    icon={'icon-employees'}
                    link={'#'}
                  />

                  {/* {bookingData.map((block, index) => (
                    <BookingBlock
                      key={index}
                      title={block.title}
                      count={block.count}
                      icon={block.icon}
                      link={block.link}
                    />
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
