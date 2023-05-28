import './ModalDescription.css';

export default function ModalDescription(props) {
    return (
        <div className='recipe-desc-div'>
            <p>{props.description}</p>
        </div>
    );
}