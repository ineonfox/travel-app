import React from "react";
import { useLocation } from "react-router-dom";
import SightItem from "./SightItem";

export default function Plan() {
    const { state } = useLocation();
    const [data, setData] = React.useState(null);
    const totalDays = 1 + Math.floor((Date.parse(state.endDate) - Date.parse(state.startDate)) / (60 * 60 * 24 * 1000));
    
    React.useEffect(() => {
      fetch(`/generateTravel/${state.city}/${totalDays}`)
        .then((res) => res.json())
        .then((data) => {setData(null); setData(data); console.log(data)})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(data);
    
    return(
        <div>
            <p>{state.city}, {state.startDate}, {state.endDate}</p>
            {!data ? <p>"Loading..."</p> : <div>
            <SightItem
                title={data[0].Name}
                address={data[0].Address}
                time={data[0].AverageTimeInHours}
                startTime={state.startDate}
                popularity={data[0].popularityScale}
            />
            <SightItem
                title={data[1].Name}
                address={data[1].Address}
                time={data[1].AverageTimeInHours}
                startTime={state.startDate + data[0].AverageTimeInHours * 60 * 60 * 1000}
                popularity={data[1].popularityScale}
            />
            <SightItem
                title={data[2].Name}
                address={data[2].Address}
                time={data[2].AverageTimeInHours}
                startTime={state.startDate + (data[0].AverageTimeInHours + data[1].AverageTimeInHours) * 60 * 60 * 1000}
                popularity={data[2].popularityScale}
            />
            </div>
            }
        </div>
    )
}