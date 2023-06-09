import React from "react";
import './CreateItem.css';

export default function CreateItem(props) {
    function handleOnChange(e) {

    }

    function handleClick(e) {
        document.getElementById('notif-create-div').style.animation="";

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Name: document.getElementById('placeName').value,
                Type: document.getElementById('placeType').value,
                Address: document.getElementById('placeAddress').value,
                CityName: document.getElementById('placeCity').value,
                AverageTime: parseFloat(document.getElementById('placeAverageTime').value)
            })
        };
        fetch('/api/create/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(document.getElementById('notif-create-div').style.animation="opacity-animated 5s linear");
    }

    return(
        <div className='create-div'>
            <label className="" htmlFor="placeName">Назва місцини</label>
            <input className="form-inp-where" placeholder="Оперний театр..." required type="text" id="placeName" name="placeName" onChange={handleOnChange} />

            <label className="" htmlFor="placeType">Тип</label>
            <input className="form-inp-where" placeholder="Споруда, парк, церква..." required type="text" id="placeType" name="placeType" onChange={handleOnChange} />
            <label className="" htmlFor="placeAddress">Адреса</label>
            <input className="form-inp-where" placeholder="вул. Городоцька..." required type="text" id="placeAddress" name="placeAddress" onChange={handleOnChange} />
            <label className="" htmlFor="placeCity">Місто</label>
            <input className="form-inp-where" placeholder="Львів, Тернопіль..." required type="text" id="placeCity" name="placeCity" onChange={handleOnChange} />
            <label className="" htmlFor="placeAverageTime">Потрібний час</label>
            <input className="form-inp-where" placeholder="К-сть годин..." required type="number" id="placeAverageTime" name="placeAverageTime" onChange={handleOnChange} />

            <button className="form-button" type="button" onClick={handleClick}>{props.buttonText}</button>
            <div id="notif-create-div" >
                Оновлено базу даних!
            </div>
        </div>
    );
}