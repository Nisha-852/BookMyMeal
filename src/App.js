import '../src/styles/App.css';
import BookingList from './Page/BookingList';
import Calender from './Page/Calender';
import Login from './Page/Login';
import Registration from './Page/Registration';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from './Axios';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPage = ({ showHeader = true, showFooter = true, element }) => (
    <div className='App'>
      {showHeader && <NavBar />}
      {element}
      {showFooter && <Footer />}
    </div>
  );

  const unprotectedRoutes = ['/login'];

  const checkUseLoginSession = async () => {
    try {
      let { data } = await axiosInstance.get('/users/check-user-session');
      if (data.isVerified) {
        if (unprotectedRoutes.includes(location.pathname)) {
          navigate('/');
        }
      }
    } catch (error) {
      localStorage.clear();
      if (!unprotectedRoutes.includes(location.pathname)) {
        navigate('/login');
      }
      console.error(error);
    }
  };

  useEffect(() => {
    checkUseLoginSession();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={getPage({ element: <Calender /> })} />
      <Route path="/booking" element={getPage({ element: <BookingList /> })} />
      <Route path="/calendar" element={getPage({ element: <Calender /> })} />
      <Route path="/registration" element={getPage({ element: <Registration />, showHeader: false })} />
      <Route path="/login" element={getPage({ element: <Login />, showFooter: false, showHeader: false })} />
    </Routes>
  );
}

export default App;
