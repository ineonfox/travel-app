import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

export default function MainPage(props) {
    const [city, setCity] = useState();
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState();
    const navigate = useNavigate();

    const loginIconPath = props.isLoggedIn ? './img/icons/person.png' : './img/icons/login-white.png';

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
        (!city || !startDate || !endDate) ? alert("Будь ласка, заповніть усі поля.") :
        navigate('/steps', {state: {city, startDate, endDate}});
    }

    function handleLoginClick(event) {
        navigate('/login');
    }

    function handleAdminClick(event) {
        navigate('/admin');
    }

    var minDate = new Date().toISOString().slice(0, 10);
    return(
        <div>
        <div className="screen-div"></div>
        <button className="login-button-main" type="button" onClick={handleLoginClick} disabled={props.isLoggedIn}>
            <img src={loginIconPath} style={{width: "24px", alignSelf: "center"}} alt='Login' className='sight-item__button-icon' /> 
            {props.isLoggedIn ? props.isLoggedIn : "Логін / Реєстрація"}
        </button>
        <button className="admin-button-main" type="button" onClick={handleAdminClick} style={{display: props.isAdmin ? "flex" : "none"}}>
            <img src='./img/icons/cog.png' style={{width: "36px"}} alt='Settings'/>
        </button>
        <div className="form-div grid-form-div">
            <label className="form-lbl-where" htmlFor="travelCity">Куди плануєте подорожувати?</label>
            <input className="form-inp-where" placeholder="Впишіть назву міста..." required type="text" id="travelCity" name="travelCity" onChange={handleOnChange} />

            <label className="form-lbl-from" htmlFor="startDate">Починаючи з?</label>
            <label className="form-lbl-to" htmlFor="endDate">До?</label>
            <input className="form-inp-from" required type="date" id="startDate" name="startDate" min={minDate} onChange={handleOnChange} />
            <input className="form-inp-to" required type="date" id="endDate" name="endDate" min={startDate} onChange={handleOnChange} />

            <button className="form-button" type="button" onClick={handleClick}>Запланувати</button>
        </div>
        <div className="img-link">
            Image by <a href="https://pixabay.com/users/zephyrka-1146005/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Nadine</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Pixabay</a>
        </div>
        </div>
    )
}