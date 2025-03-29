import React, { useEffect } from 'react';
import '../styles/Modal.css';  

const Modal = ({ isOpen, closeModal, children, title }) => {
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [closeModal]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content ">

                <div className='d-flex justify-content-between border-bottom'>
                    <h4>
                        {title}
                    </h4>
                    <button className="border-0 bg-none" onClick={closeModal}>
                        X
                    </button>
                </div>

                <div className='mt-4'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;