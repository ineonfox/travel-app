import './ModalDescription.css';

export default function ModalDescription(props) {
    return (
        <div className='recipe-desc-div'>
            <p style={{fontSize: props.fontSize}}>{props.description}</p>
        </div>
    );
}