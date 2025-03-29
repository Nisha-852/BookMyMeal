import { Bounce } from "react-toastify";

export const toastStyle = {
  position: "bottom-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
}



export const employeeData = [
  { id: 1, name: 'John Doe', department: 'IT', totalMeals: 3, mealDate: '2024-11-10' },
  { id: 2, name: 'Jane Smith', department: 'HR', totalMeals: 2, mealDate: '2024-11-11' },
  { id: 3, name: 'Samuel Adams', department: 'Finance', totalMeals: 4, mealDate: '2024-11-10' },
  { id: 4, name: 'Emily Johnson', department: 'Marketing', totalMeals: 1, mealDate: '2024-10-12' },
  { id: 5, name: 'Michael Brown', department: 'Finance', totalMeals: 2, mealDate: '2024-10-15' },
  { id: 6, name: 'Sophia Wilson', department: 'Sales', totalMeals: 5, mealDate: '2024-11-05' },
  { id: 7, name: 'David Lee', department: 'IT', totalMeals: 3, mealDate: '2024-09-20' },
  { id: 8, name: 'Olivia Moore', department: 'HR', totalMeals: 4, mealDate: '2024-09-22' },
];

export const columns = [
  { key: 'employeeId', label: 'Employee ID' },
  { key: 'firstname', label: 'Employee' }, 
  { key: 'lastname', label: 'Employee' }, 
  { key: 'department', label: 'Department' },
  { key: 'mealType', label: 'MealType' },
  { key: 'dateRange', label: 'Meal Date' },
  { key: 'bookingCategory', label: 'Booking Category' },
  { key: 'totalBookingCount', default : 1, label: 'count' },
];



export const DEPARTMENTS = [
  { value: 'Analytics', label: 'Analytics' },
  { value: 'HR', label: 'HR' },
  { value: 'IT', label: 'IT' },
  { value: 'Marketing', label: 'Marketing' }
]
