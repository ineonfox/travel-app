import React from 'react'
import './ModalWindow.css';

export default function ModalWindow(props) {
    function handleCloseClick(e) {
        props.setModalOpen("");
    }

    return (
        <div className="modal-screen">
            <div className="modal-div">
                <button onClick={handleCloseClick} className='invisible-button modal-close-button'><img className='modal-icon' alt='Close' src='./img/icons/close.png' /></button>
                <img src={props.imgSource} alt='Header' />
                {props.children}
            </div>
        </div>
    );
}