import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

function handleClick(event) {
    
}

export default function AdminPanel(props) {
    return(
        <div>
            <div className="screen-div"></div>
            <div className="form-div grid-admin-div">
            <button className="admin-tab-button" type="button" onClick={handleClick} style={{borderTopLeftRadius: "10px"}}>Створення</button>
            <button className="admin-tab-button" type="button" onClick={handleClick}>Зміна</button>
            <button className="admin-tab-button" type="button" onClick={handleClick} style={{borderTopRightRadius: "10px"}}>Видалення</button>
            </div>
            <div className="img-link">
                Image by <a href="https://pixabay.com/users/zephyrka-1146005/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Nadine</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Pixabay</a>
            </div>
        </div>
    );
}