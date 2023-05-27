import React, { useState } from "react";
import './BookingStep.css';
import { useNavigate } from 'react-router-dom';

export default function BookingStep(props) {
    const [showHotel, setShowHotel] = useState(false);
    const hotelUrl = `https://www.booking.com/searchresults.html?ss=${props.state.city}&dest_type=city&checkin=${props.state.startDate}&checkout=${props.state.endDate}&group_adults=${props.passangerAmount}&no_rooms=1&group_children=0`;
    const navigate = useNavigate();
    
    function handleTicketClick(e) {
        props.setProgress(140);
        setShowHotel(true);
        window.open(hotelUrl, '_blank')
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSkipClick(event) {
        props.setProgress(200);
        await sleep(1500);
        navigate('/plan', {state: 
            {
                city: props.state.city, 
                startDate: props.state.startDate, 
                endDate: props.state.endDate
            }});
    }

    function handleBackClick(event) {
        props.setProgress(10);
    }

    return (
        <>
                <p className='step-tickets-p visible-animation'>Де ви плануєте ночувати?</p>
                <div className='step-tickets-buttons-div visible-animation'>
                    <button className='sight-item__path-button step-tickets-buttons-icon' id='hotelButton' onClick={handleTicketClick}><img src='./img/icons/hotel.png' alt='Hotel' className='sight-item__button-icon' />Готель</button>
                    <button className='sight-item__path-button step-tickets-buttons-icon' id='homeButton' onClick={handleSkipClick}><img src='./img/icons/home.png' alt='Home' className='sight-item__button-icon' />Власний дім</button>
                </div>
                <button className="form-button step-tickets-skip step-hotels-back visible-animation" type="button" onClick={handleBackClick}>Назад</button>
                <button className="form-button step-tickets-skip visible-animation" type="button" onClick={handleSkipClick}>{showHotel ? "Створити план" : "Пропустити крок"}</button>
        </>
    );
}