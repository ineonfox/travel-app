import './Weather.css'

export default function Weather(props) {
    const iconPath = `./img/icons/${props.icon}`;

    return(
        <div className="weather-div">
            <p className='weather-temperature'>{props.degrees}°C</p>
            <p className='weather-date'>{props.date}</p>
            <img src={iconPath} alt='Weather' className='weather-icon' />
        </div>
    );
}