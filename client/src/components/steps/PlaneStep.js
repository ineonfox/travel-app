import './PlaneStep.css';

export default function PlaneStep(props) {
    function handleClick(event) {
        props.setShowPlane(false);
    }

    return (
        <>
            <p className="plane-p">На жаль, на даний момент, через повномасштабну війну, яку розпочала Росія 24 лютого 2022, комерційні літаки з причин безпеки не літають над Україною.</p>
            <button className='sight-item__path-button plane-button' onClick={handleClick}><img src='./img/icons/arrow_back.png' alt='Back' className='sight-item__button-icon' />Назад</button>
        </>
    );
}