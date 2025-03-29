import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the CSS for styling

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ eventsList = [] }) => {
  const dayStyleGetter = (date) => {
    const today = moment().isSame(date, 'day');
    const hasEvent = eventsList.some(event => {
      const start = moment(event.startDate).startOf('day');
      const end = moment(event.endDate).endOf('day');
      return moment(date).isBetween(start, end, null, '[]');
    });

    return {
      style: {
        color: today ? 'coral' : (hasEvent ? 'blue' : '#000'),
        fontWeight: today ? 'bold' : 'normal',
      },
    };
  };

  const formattedEvents = eventsList.map(event => {
    const startDate = moment(event.startDate);
    const endDate = moment(event.endDate);
    const eventDurationIsMultipleDays = startDate.isBefore(endDate, 'day');

    return {
      title: `${event?.employeeId === 'other' ? 'Non-Emp' : event.employeeId}` + ' (' + event.mealType + ')',
      start: startDate.toDate(),
      end: eventDurationIsMultipleDays ? endDate.startOf('day').toDate() : endDate.toDate(),  // End time is adjusted for multiday events
      allDay: !eventDurationIsMultipleDays,  // Make it all day if it's a single-day event
      ...event
    };
  });

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month']}
        defaultView="month"
        dayPropGetter={dayStyleGetter}
      />
    </div>
  );
};

export default CalendarComponent;
