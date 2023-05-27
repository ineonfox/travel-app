import React, { useState } from "react";
import './TicketStep.css';
import { useNavigate } from 'react-router-dom';
import PlaneStep from "./PlaneStep";

export default function TicketStep(props) {
    const [showPlane, setShowPlane] = useState(false);
    const [showTrain, setShowTrain] = useState(false);
    const [showBus, setShowBus] = useState(false);
    const [fromCity, setFromCity] = useState();
    const navigate = useNavigate();
    const [toExpressCode, SetToExpressCode] = useState();
    const busUrl = `https://busfor.ua/автобуси/${fromCity}/${props.state.city}?on=${props.state.startDate}&passengers=${props.passangerAmount}&search=true`;

    React.useEffect(() => {
        fetch(`/api/getTrainId/${props.state.city}`)
          .then((res) => res.json())
          .then((data) => {
            SetToExpressCode(data.ExpressCode);
          })
      }, [props.state.city]);
      
    function handleTicketClick(e) {
        if (!fromCity || !props.passangerAmount) {
            alert("Будь ласка, заповніть усі поля.")
        } else {
            switch(e.target.id) {
                case "planeButton":
                    props.setProgress(10);
                    setShowPlane(true);
                    break;
                case "trainButton":
                    props.setProgress(40);
                    setShowTrain(true);
                    fetch(`/api/getTrainId/${fromCity}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.ExpressCode);
                        window.open(`https://booking.uz.gov.ua/?from=${data.ExpressCode}&to=${toExpressCode}&date=${props.state.startDate}&time=00%3A00&url=train-list`, '_blank')
                    });
                    break;
                case "busButton":
                    props.setProgress(40);
                    setShowBus(true);
                    window.open(busUrl, '_blank')
                    break;
                default:
                    break;
            }
        }
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        switch(e.target.id) {
            case "fromCity":
                setFromCity(value);
                break;
            case "passAmount":
                props.setPassangers(value);
                break;
            default:
                break;
        }
    };

    function handleBackClick(event) {
        navigate('/');
    }

    function handleSkipClick(event) {
        props.setProgress(110);
    }

    return (
        <>
            {showPlane ? <PlaneStep setShowPlane={setShowPlane}/> : <>
                <div className="input-tickets visible-animation">
                    <div className="input-fromcity">
                        <label className="form-lbl-where" htmlFor="fromCity">Звідки подорожуєте?</label>
                        <input className="form-inp-where" placeholder="Впишіть назву міста..." required type="text" id="fromCity" name="fromCity" onChange={handleOnChange} />
                    </div>
                    <div className="input-passangers">
                        <label className="form-lbl-where" htmlFor="passAmount">К-сть пасажирів?</label>
                        <input className="form-inp-where" placeholder="Кількість..." required type="number" id="passAmount" name="passAmount" onChange={handleOnChange} />
                    </div>
                </div>
                <p className='step-tickets-p visible-animation'>Яким транспортом ви доїдете до міста?</p>
                <div className='step-tickets-buttons-div visible-animation'>
                    <button className='sight-item__path-button step-tickets-buttons-icon' id='planeButton' onClick={handleTicketClick}><img src='./img/icons/plane.png' alt='Plane' className='sight-item__button-icon' />Літак</button>
                    <button className='sight-item__path-button step-tickets-buttons-icon' id='trainButton' onClick={handleTicketClick}><img src='./img/icons/train.png' alt='Train' className='sight-item__button-icon' />Потяг</button>
                    <button className='sight-item__path-button step-tickets-buttons-icon' id='busButton' onClick={handleTicketClick}><img src='./img/icons/bus.png' alt='Bus' className='sight-item__button-icon' />Автобус</button>
                    <button className='sight-item__path-button step-tickets-buttons-icon' id='carButton' onClick={handleSkipClick}><img src='./img/icons/car.png' alt='Car' className='sight-item__button-icon' />Власний транспорт</button>
                </div>
                <button className="form-button step-tickets-skip step-hotels-back visible-animation" type="button" onClick={handleBackClick}>Назад</button>
                <button className="form-button step-tickets-skip visible-animation" type="button" onClick={handleSkipClick}>{showBus || showTrain ? "Наступний крок" : "Пропустити крок"}</button>
            </>
            }
        </>
    );
}