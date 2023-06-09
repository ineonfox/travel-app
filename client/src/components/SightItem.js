import './SightItem.css';
import React from 'react';

export default function SightItem(props) {
  
  const url = `https://www.google.com/maps/dir/?api=1&destination=${props.address}+${props.cityName}&origin=50.446332, 30.495052`
  // const endTime = addHours(props.startTime, props.time)
  const imgString = `./img/sightimg/${props.imageName}`;

  function handleClick(e) {
    window.open(url, '_blank')
  }

  function handleDeleteClick(e) {
    const markersCopy = [...props.markers];
    const markerIndex = markersCopy.findIndex(marker => marker.Name === props.data[props.index].Name);
    markersCopy.splice(markerIndex, 1);
    props.setMarkers(markersCopy);

    const dataCopy = [...props.data];
    dataCopy.splice(props.index, 1);
    props.setData(dataCopy);
  }

  function handleEditClick(e) {
    props.setOpenEditor(props.index);
  }

    return (
        <div className='sight-item'>
          
          <button onClick={handleDeleteClick} className='sight-item-delete-button'><img className='delete-icon' alt='Close' src='./img/icons/close.png' /></button>
          {props.imageName ? <img src={imgString} alt='A travel destination' className='sight-item__image'/> : <></>}
          <h2 className='sight-item__title'>{props.title}</h2>
          <div className='sight-item__description'>
            <img className='sight-item__icon' alt='City' src='./img/icons/city.png' />
            <p>м. {props.cityName}</p>
            <br/>
            <img className='sight-item__icon' alt='House' src='./img/icons/house.png' />
            <h4>{props.address}</h4>
            <br/>
            <img className='sight-item__icon' alt='Clock' src='./img/icons/clock.png' />
            <p>{props.startTime.toLocaleString('uk-UA', {dateStyle: 'short', timeStyle: 'short'})} - {props.endTime.toLocaleTimeString('uk-UA', {timeStyle: 'short'})}</p>
            <img className='edit-icon' onClick={handleEditClick} alt='Edit' src='./img/icons/edit.png' />
          </div>
          <div className='sight-item__path-button-div'>
            <button className='sight-item__path-button' onClick={handleClick}><img src='./img/icons/link.png' alt='Redirect' className='sight-item__button-icon' />Прокласти шлях</button>
          </div>
        </div>
      );
}