import './SightItem.css'

export const addHours = (date, h) => {
  const newDate = new Date(date)
  newDate.setTime(date.getTime() + (h*60*60*1000));
  return newDate;
}

export default function SightItem(props) {
  const endTime = addHours(props.startTime, props.time)
  const imgString = `./img/sightimg/${props.imageName}`;
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
            <button className='sight-item__path-button'>Прокласти шлях</button>
          </div>
        </div>
      );
}