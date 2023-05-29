import './Weather.css'

export default function Weather(props) {
    return(
        <div className="weather-div">
            <p className='weather-temperature'>+10°C</p>
            <p className='weather-date'>01.06.2023</p>
            <img src='./img/icons/sun.png' alt='Weather' className='weather-icon' />
        </div>
    );
}