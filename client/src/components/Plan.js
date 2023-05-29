import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import SightItem from "./SightItem";
// import { addHours } from "./SightItem";
import {config} from "../config";
import ModalWindow from './regionFacts/ModalWindow';
import './Plan.css';

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import SideMenu from './SideMenu';
import ModalRecipe from './regionFacts/ModalRecipe';
import ModalOneBlock from './regionFacts/ModalOneBlock';

export const addHours = (date, h) => {
    const newDate = new Date(date)
    newDate.setTime(date.getTime() + (h*60*60*1000));
    return newDate;
}

export default function Plan() {
    const googleMapsAPIKey = config.GOOGLE_API_KEY;
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsAPIKey // ,
        // ...otherOptions
      })

    const { state } = useLocation();
    const [openEditor, setOpenEditor] = useState("");
    const [modalOpen, setModalOpen] = useState("");
    const [data, setData] = React.useState([]);
    const [geocode, setGeocode] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);
    const totalDays = 1 + Math.floor((Date.parse(state.endDate) - Date.parse(state.startDate)) / (60 * 60 * 24 * 1000));
    
    React.useEffect(() => {
      fetch(`/generateTravel/${state.city}/${totalDays}`)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            const markersTemp = [];
            for (let i = 0; i < data.length; i++) {
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data[i].Address}%2C%20${state.city}&key=${googleMapsAPIKey}`)
                 .then((res) => res.json())
                 .then((geo) => { 
                    geo.results[0].geometry.location["Name"] = data[i].Name;
                    markersTemp.push(geo.results[0].geometry.location);
                    setMarkers([...markersTemp]);
                    });
            };

            let startDatetime = new Date(state.startDate);
            startDatetime.setHours(9);

            const dataCopy = [...data];
            dataCopy.map(item => {
                startDatetime = addHours(startDatetime, item.AverageTimeInHours);
                item.startTime = addHours(startDatetime, -item.AverageTimeInHours);
                item.endTime = startDatetime;
                return item;
            });
            setData(dataCopy);
            console.log(dataCopy);
        })
    }, [state.city, state.startDate, totalDays, googleMapsAPIKey]);

    React.useEffect(() => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${state.city}&key=${googleMapsAPIKey}`)
          .then((res) => res.json())
          .then((geo) => setGeocode(geo.results[0].geometry.location))
    }, [state.city, googleMapsAPIKey]);

    // let startDatetime = new Date(state.startDate);
    // startDatetime.setHours(9);

    function handleEditSubmitClick(e) {
        const dataCopy = [...data];
        dataCopy[openEditor].startTime = new Date(document.getElementById("start-time").value);
        dataCopy[openEditor].endTime = new Date(document.getElementById("end-time").value);
        setData(dataCopy);

        setOpenEditor("");
    }

    return(
        <div className='plan-page'>
            {openEditor !== "" && data !== [] ? 
            <ModalWindow setModalOpen={setOpenEditor} width={"30%"} height={"25%"}>
                <div className='edit-div'>
                    <p><b>{"Змінити час перебування у " + data[openEditor].Name}</b></p>
                    <div>
                        <input type="datetime-local" id="start-time" 
                            min={state.startDate + "T00:00:00"}
                            max={state.endDate + "T00:00:00"}></input>
                        <span>  -  </span>
                        <input type="datetime-local" id="end-time"
                            min={state.startDate + "T00:00:00"}
                            max={state.endDate + "T00:00:00"}></input>
                    </div>
                    
                    <button className='edit-submit-button' onClick={handleEditSubmitClick}>Змінити</button>
                </div>
            </ModalWindow> : null }
            <SideMenu className='plan-menu' setModalOpen={setModalOpen} />
            {modalOpen ? modalOpen === "Recipe" ? <ModalRecipe setModalOpen={setModalOpen} city={state.city}/> 
                : <ModalOneBlock apiLink={`/api/getFacts/${modalOpen}/${state.city}`} setModalOpen={setModalOpen} /> : null}
            <div className='plan-list'>
            {!data || !markers ? "Loading..." : 
            data.map((item, index) => {
                // startDatetime = addHours(startDatetime, item.AverageTimeInHours);
                return <SightItem
                    key={item.ID}
                    title={item.Name}
                    imageName={item.ImageName}
                    cityName={item.CityName}
                    address={item.Address}
                    time={item.AverageTimeInHours}
                    startTime={item.startTime}
                    popularity={item.popularityScale}
                    endTime={item.endTime}
                    setOpenEditor={setOpenEditor}

                    // data to edit/delete
                    data={data}
                    setData={setData}
                    markers={markers}
                    setMarkers={setMarkers}
                    index={index}
                /> })}
            </div>
            <div className="plan-map">
            {!isLoaded || !geocode ? (
                <h1>Loading...</h1>
                ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={geocode}
                    zoom={13}
                >
                    {markers.map(({ lat, lng }) => (
                    <Marker key={lat} position={{ lat, lng }} />
                    ))}
                </GoogleMap>
            )}
            </div>
        </div>
    )
}