import React, { useState } from "react";
import './AdminPanel.css';
import CreateItem from "./adminPanel/CreateItem";

export default function AdminPanel(props) {
    const [tabActive, setTabActive] = useState("createButton");

    function handleClick(e) {
        document.getElementById("updateButton").style.backgroundColor="";
        document.getElementById("deleteButton").style.backgroundColor="";
        document.getElementById("createButton").style.backgroundColor="";
        document.getElementById("updateButton").style.transform="";
        document.getElementById("deleteButton").style.transform="";
        document.getElementById("createButton").style.transform="";
        e.target.style.backgroundColor="#005698";
        e.target.style.transform="scale(1.02)"
        setTabActive(e.target.id);
    }

    return(
        <div>
            <div className="screen-div"></div>
            <div className="form-div grid-admin-div">
                <button className="admin-tab-button" id="createButton" type="button" onClick={handleClick} style={{borderTopLeftRadius: "10px"}}>Створення</button>
                <button className="admin-tab-button" id="updateButton" type="button" onClick={handleClick}>Зміна</button>
                <button className="admin-tab-button" id="deleteButton" type="button" onClick={handleClick} style={{borderTopRightRadius: "10px"}}>Видалення</button>
                {tabActive === "createButton" ? <CreateItem buttonText="Додати місцину"/> : tabActive === "updateButton" ? <CreateItem buttonText="Оновити місцину"/> : <CreateItem buttonText="Видалити місцину"/>}
            </div>
            <div className="img-link">
                Image by <a href="https://pixabay.com/users/zephyrka-1146005/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Nadine</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Pixabay</a>
            </div>
        </div>
    );
}