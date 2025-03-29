export const employees = [
    { id: 2001, name: 'Thomas', department: 'Analytics' },
    { id: 2002, name: 'John', department: 'HR' },
    { id: 2003, name: 'Sarah', department: 'IT' },
    { id: 2004, name: 'Emily', department: 'Marketing' }
  ];


  let currentDateBookings = [33, 254, 22];

  
 export const bookingData = [
  
    { title: 'Employees', count: currentDateBookings[0], icon: 'icon-employees', link: '#' },
    { title: 'Non Employees', count: currentDateBookings[1], icon: 'icon-employees', link: '#' },
    { title: 'Buffer', count: currentDateBookings[2], icon: 'icon-buffer', link: '#' },
  ];

  
const getTitleString = (employee, nonEmployee, others) => {
  let string = '';
  if (employee)
    string = string + `Emp: ${employee}, `

  if (nonEmployee)
    string = string + ` Non-Emp: ${nonEmployee}, `

  if (others)
    string = string + ` Custom Booking: ${others}`

  return string.trim();
}

  export const events = [
    {
      title: getTitleString(3, 4, 5),
      start: new Date(2024, 10, 12, 10, 0),
      end: new Date(2024, 10, 12, 12, 0),
    },
    {
      title: getTitleString(24, 0, 2),
      start: new Date(2024, 10, 14, 16),
      end: new Date(2024, 10, 14, 17),
    },
    {
      title: getTitleString(1, 3, 0),
      start: new Date(2024, 10, 17, 13, 0),
      end: new Date(2024, 10, 17, 14, 0),
    },
  ];