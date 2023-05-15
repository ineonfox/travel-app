import './SightItem.css'

export const addHours = (date, h) => {
  const newDate = new Date(date)
  newDate.setTime(date.getTime() + (h*60*60*1000));
  return newDate;
}

// https://www.google.com/maps/dir/47.5871342,-122.320192/47.5951518,-122.3316393
export default function SightItem(props) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${props.address}+${props.cityName}`
  const endTime = addHours(props.startTime, props.time)
  const imgString = `./img/sightimg/${props.imageName}`;

  function handleClick(e) {
    window.open(url, '_blank')
  }

    return (
        <div className='sight-item'>
          {props.imageName ? <img src={imgString} alt='A travel destination' className='sight-item__image'/> : <></>}
          <h2 className='sight-item__title'>{props.title}</h2>
          <div className='sight-item__description'>
            <img className='sight-item__icon' src='./img/icons/city.png' />
            <p>м. {props.cityName}</p>
            <br/>
            <img className='sight-item__icon' src='./img/icons/house.png' />
            <h4>{props.address}</h4>
            <br/>
            <img className='sight-item__icon' src='./img/icons/clock.png' />
            <p>{props.startTime.toLocaleString('uk-UA', {dateStyle: 'short', timeStyle: 'short'})} - {endTime.toLocaleTimeString('uk-UA', {timeStyle: 'short'})}</p>
          </div>
          <div className='sight-item__path-button-div'>
            <button className='sight-item__path-button' onClick={handleClick}>Прокласти шлях</button>
          </div>
        </div>
      );
}