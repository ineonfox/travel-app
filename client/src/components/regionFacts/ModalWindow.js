import React from 'react'
import './ModalWindow.css';

export default function ModalWindow(props) {
    function handleCloseClick(e) {
        props.setModalOpen("");
    }

    return (
        <div className="modal-screen">
            <div className="modal-div" style={{width: props.width, height: props.height}}>
                <button onClick={handleCloseClick} className='invisible-button modal-close-button'><img className='modal-icon' alt='Close' src='./img/icons/close.png' /></button>
                {props.imgSource ? <img src={props.imgSource} alt='Header' /> : null}
                {props.children}
            </div>
        </div>
    );
}