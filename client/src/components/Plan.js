import React from "react";
import { useLocation } from "react-router-dom";
import SightItem from "./SightItem";
import { addHours } from "./SightItem";

import './Plan.css'

export default function Plan() {
    const { state } = useLocation();
    const [data, setData] = React.useState(null);
    const totalDays = 1 + Math.floor((Date.parse(state.endDate) - Date.parse(state.startDate)) / (60 * 60 * 24 * 1000));
    
    React.useEffect(() => {
      fetch(`/generateTravel/${state.city}/${totalDays}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startDatetime = new Date(state.startDate);
    startDatetime.setHours(9);
    //console.log(startDatetime);
    //console.log(typeof startDatetime);
    
    return(
        <div>
            {!data ? <p>"Loading..."</p> : <div className="plan-list">
            <SightItem
                title={data[0].Name}
                imageName={data[0].ImageName}
                cityName={data[0].CityName}
                address={data[0].Address}
                time={data[0].AverageTimeInHours}
                startTime={startDatetime}
                popularity={data[0].popularityScale}
            />
            <SightItem
                title={data[1].Name}
                imageName={data[1].ImageName}
                cityName={data[1].CityName}
                address={data[1].Address}
                time={data[1].AverageTimeInHours}
                startTime={addHours(startDatetime, data[0].AverageTimeInHours)}
                popularity={data[1].popularityScale}
            />
            <SightItem
                title={data[2].Name}
                imageName={data[2].ImageName}
                cityName={data[2].CityName}
                address={data[2].Address}
                time={data[2].AverageTimeInHours}
                startTime={addHours(startDatetime, data[0].AverageTimeInHours + data[1].AverageTimeInHours)}
                popularity={data[2].popularityScale}
            />
            </div>
            }
        </div>
    )
}