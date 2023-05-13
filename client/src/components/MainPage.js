import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

export default function MainPage() {
    const [city, setCity] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        switch(e.target.id) {
            case "travelCity":
                setCity(value);
                break;
            case "startDate":
                setStartDate(value);
                break;
            case "endDate":
                setEndDate(value);
                break;
            default:
                setCity(value);
                break;
        }
    };

    function handleClick(event) {
        
        navigate('/plan', {state: {city, startDate, endDate}});
    }

    return(
        <div className="formDiv">
            <label htmlFor="travelCity">Where do you plan to go?</label>
            <br />
            <input type="text" id="travelCity" name="travelCity" onChange={handleOnChange} />
            <br />
            <label htmlFor="startDate">When from?</label>
            <label htmlFor="endDate">When to?</label>
            <br />
            <input type="date" id="startDate" name="startDate" onChange={handleOnChange} />
            <input type="date" id="endDate" name="endDate" onChange={handleOnChange} />
            <br />
            <button type="button" onClick={handleClick}>Plan your trip</button>
        </div>
    )
}