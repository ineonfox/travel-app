import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import SightItem from "./SightItem";
import { addHours } from "./SightItem";
import {config} from "../config";
import './Plan.css'

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import SideMenu from './SideMenu';
import ModalRecipe from './regionFacts/ModalRecipe';

export default function Plan() {
    const googleMapsAPIKey = config.GOOGLE_API_KEY;
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsAPIKey // ,
        // ...otherOptions
      })

    const { state } = useLocation();
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
                 .then((geo) => { markersTemp.push(geo.results[0].geometry.location)
                    setMarkers([...markersTemp]);
                    })
            };
        })
    }, [state.city, totalDays, googleMapsAPIKey]);

    React.useEffect(() => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${state.city}&key=${googleMapsAPIKey}`)
          .then((res) => res.json())
          .then((geo) => setGeocode(geo.results[0].geometry.location))
    }, [state.city, googleMapsAPIKey]);

    let startDatetime = new Date(state.startDate);
    startDatetime.setHours(9);
    //console.log(startDatetime);
    //console.log(typeof startDatetime);
    return(
        <div className='plan-page'>
            <SideMenu className='plan-menu' setModalOpen={setModalOpen} />
            {modalOpen === "Recipe" ? <ModalRecipe setModalOpen={setModalOpen} city={state.city}/> : null}
            <div className='plan-list'>
            {!data || !markers ? "Loading..." : 
            data.map((item) => {
                startDatetime = addHours(startDatetime, item.AverageTimeInHours);
                return <SightItem
                    key={item.ID}
                    title={item.Name}
                    imageName={item.ImageName}
                    cityName={item.CityName}
                    address={item.Address}
                    time={item.AverageTimeInHours}
                    startTime={addHours(startDatetime, -item.AverageTimeInHours)}
                    popularity={item.popularityScale}
                    endTime={startDatetime}
                /> })}
            </div>
            <div className="plan-map">
            {!isLoaded || !geocode || (markers.length < 1) ? (
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