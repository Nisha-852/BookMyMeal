import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo-white.svg';
import Button from './Button';
import Modal from '../Components/Modal'
import ChangePassword from "../Components/ChangePassword"

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); 
  const [notifications, setNotifications] = useState([]); 
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setISChangePasswordModalOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Calendar', to: '/calendar' },
    { name: 'Booking List', to: '/booking' },
  ];


  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleAdminDropdown = () => setIsAdminOpen(!isAdminOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen); 

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    const fetchNotifications = () => {
      // make it in const 
      setNotifications([
        { id: 1, message: 'New booking request' },
        { id: 2, message: 'Reminder: Meeting tomorrow' },
        { id: 3, message: 'New comment on your post' },
        { id: 4, message: 'Payment processed successfully' },
        { id: 5, message: 'New user registered' }
      ]);
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <div className="container head">
          <Link to="/" className="navbar-brand">
            <div className="logoW-wrapper">
              <img src={logo} alt="Rishabh Software" />
              <span>Meal Facility</span>
            </div>
          </Link>

          <Button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div
            className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map((link) => (
                <li key={link.to} className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                    to={link.to}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-100 d-lg-inline-flex align-items-center">
              <ul className="app-nav">
                <li className="dropdown">
                  <Link
                    className="app-nav__item notification-num"
                    to="#"
                    onClick={toggleNotifications}
                    aria-label="Show notifications"
                  >
                    <i className="icon-bell"></i>
                    <span className="num">{notifications.length}</span>
                  </Link>

                  <ul
                    className={`dropdown-menu notifications-dropdown ${isNotificationsOpen ? 'show' : ''}`}
                    aria-labelledby="navbarDropdown"
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <li key={notification.id}>
                          <Link className="dropdown-item" to="#">
                            {notification.message}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>No new notifications</li>
                    )}
                  </ul>
                </li>

                <li className="dropdown">
                  <Link
                    className="app-nav__item dropdown-toggle"
                    to="#"
                    onClick={toggleAdminDropdown}
                    aria-label="Open Profile Menu"
                    aria-expanded={isAdminOpen ? 'true' : 'false'}
                  >
                    Admin
                  </Link>
                  <ul
                    className={`dropdown-menu settings-menu dropdown-menu-left ${isAdminOpen ? 'show' : ''}`}
                    aria-labelledby="navbarDropdown"
                  >
                    <li onClick={handleLogout} className='px-1 py-2 cursor-pointer'>
                      Logout

                    </li>
                    <li className='px-1 py-2' onClick={() => setISChangePasswordModalOpen(true)}>
                      Change Password
                    </li>

                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {isChangePasswordModalOpen && <Modal

        isOpen={isChangePasswordModalOpen}
        closeModal={() => setISChangePasswordModalOpen(false)}
        title={'Change Password'}
      >
        <ChangePassword
          callback={() => setISChangePasswordModalOpen(false)}
        />

      </Modal>}

    </div>
  );
};

export default NavBar;

