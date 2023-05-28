import './Ingredients.css';

export default function Ingredients(props) {
    return (
        <div className='ingredients-div'>
            <h5>Основні інградієнти</h5>
            {props.ingredients ? Object.keys(props.ingredients.main).map((key, index) => {
                return <p className='ingr-p'><b>{key}</b> - {props.ingredients.main[key]}</p>
            }) : null}
            {props.ingredients ? props.ingredients.other ? <h5>{props.ingredients.other.name}</h5> : null : null}
            {props.ingredients ? props.ingredients.other ? Object.keys(props.ingredients.other.ingredients).map((key, index) => {
                return <p className='ingr-p'><b>{key}</b> - {props.ingredients.other.ingredients[key]}</p>
             })
            : null : null}
        </div>
    );
}