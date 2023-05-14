import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

export default function MainPage() {
    const [city, setCity] = useState();
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
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

    var minDate = new Date().toISOString().slice(0, 10);
    return(
        <div className="formDiv">
            <label htmlFor="travelCity">Куди ви плануєте подорожувати?</label>
            <br />
            <input type="text" id="travelCity" name="travelCity" onChange={handleOnChange} />
            <br />
            <label htmlFor="startDate">Починаючи з?</label>
            <label htmlFor="endDate">До?</label>
            <br />
            <input type="date" id="startDate" name="startDate" min={minDate} onChange={handleOnChange} />
            <input type="date" id="endDate" name="endDate" min={startDate} onChange={handleOnChange} />
            <br />
            <button type="button" onClick={handleClick}>Запланувати</button>
        </div>
    )
}