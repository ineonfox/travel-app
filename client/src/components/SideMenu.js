import { useState } from 'react';
import './SideMenu.css';
import { useNavigate } from 'react-router-dom';

export default function SideMenu() {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    function handleExpandMenu(e) {
        if (isExpanded) {
            setIsExpanded(false);
        } else {
            setIsExpanded(true);
        };
    }

    function handleOpenMenuClick(e) {

    }

    function handleHomeClick(e) {
        navigate('/');
    }

    return(
        <div className='sidemenu-div' style={{width: isExpanded ? "18%" : "3%"}}>
            <button className="invisible-button" onClick={handleExpandMenu}><img className='menu-icon' alt='Menu' src='./img/icons/menu_black.png' /><p style={{opacity: isExpanded ? '100%' : '0%', fontSize: isExpanded ? '1.1em' : '0.01em'}}>Меню</p></button>
            <button className="invisible-button" onClick={handleOpenMenuClick}><img className='menu-icon' alt='Menu' src='./img/icons/history.png' /><p style={{opacity: isExpanded ? '100%' : '0%', fontSize: isExpanded ? '1.1em' : '0.01em'}}>Історія регіону</p></button>
            <button className="invisible-button" onClick={handleOpenMenuClick}><img className='menu-icon' alt='Menu' src='./img/icons/culture.png' /><p style={{opacity: isExpanded ? '100%' : '0%', fontSize: isExpanded ? '1.1em' : '0.01em'}}>Культура регіону</p></button>
            <button className="invisible-button" onClick={handleOpenMenuClick}><img className='menu-icon' alt='Menu' src='./img/icons/recipes.png' /><p style={{opacity: isExpanded ? '100%' : '0%', fontSize: isExpanded ? '1.1em' : '0.01em'}}>Рецепти</p></button>
            <button className="invisible-button button-align-end" onClick={handleHomeClick}><img className='menu-icon' alt='Menu' src='./img/icons/house.png' /><p style={{opacity: isExpanded ? '100%' : '0%', fontSize: isExpanded ? '1.1em' : '0.01em'}}>Повернутись назад</p></button>
        </div>
    );
}