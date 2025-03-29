import React from 'react'
import { Link } from 'react-router-dom';
import btn from '../assets/images/add-btn-2.svg';

const BookingBlock = ({ title, count, icon, link }) => {
    return (
        <div className={`booking-block ${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="booking-block-lt">
                <div className="icon-block">
                    <i className={icon}></i>
                </div>
                <div className="info-block">
                    <h5>{title}</h5>
                    <h3>{count}</h3>
                </div>
            </div>
            <Link to={link} aria-label={`Add ${title}`}>
                <img src={btn} alt={`Add ${title}`} />
            </Link>
        </div>
    )
}

export default BookingBlock
