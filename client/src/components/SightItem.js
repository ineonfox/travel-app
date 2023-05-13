import './SightItem.css'

export default function SightItem(props) {
    return (
        <div className='sight-item'>
          <h2>{props.title}</h2>
          <div className='sight-item__description'>
            <h4>Адреса: {props.address}</h4>
            <p>Час: {props.startTime}</p>
          </div>
        </div>
      );
}