import React, { useState } from 'react'
import './ModalRecipe.css';
import Ingredients from './Ingredients';
import ModalDescription from './ModalDescription';

export default function ModalRecipe(props) {
    const [recipe, setRecipe] = useState({});
    const imgSource = `./img/recipeimg/${recipe.ImageName}`
    React.useEffect(() => {
        fetch(`/api/getRecipe/${props.city}`)
          .then((res) => res.json())
          .then((data) => {
            setRecipe(data);
            console.log(data);
          }
          )
        }, [props.city]);

    function handleCloseClick(e) {
        props.setModalOpen("");
    }

    return (
        <div className="recipe-screen">
            <div className="recipe-div">
                <button onClick={handleCloseClick} className='invisible-button recipe-close-button'><img className='modal-icon' alt='Close' src='./img/icons/close.png' /></button>
                <img src={imgSource} alt='Food' />
                <h2>{recipe.Name}</h2>
                <div className='recipe-details-div'>
                    <Ingredients ingredients={recipe.Ingredients} />
                    <div className='recipe-details-inside-div'>
                        <ModalDescription description={recipe.Description} />
                        
                    </div>
                </div>
                <h2>Як приготувати?</h2>
                <ModalDescription description={recipe.CookingProcessDesc} />
            </div>
        </div>
    );
}