import { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(props) {
    var bcrypt = require('bcryptjs');

    const navigate = useNavigate();

    const [loginEmail, SetLoginEmail] = useState();
    const [loginPassword, SetLoginPassword] = useState();

    const handleOnChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        switch(e.target.id) {
            case "emailLogin":
                SetLoginEmail(value);
                break;
            case "passwordLogin":
                SetLoginPassword(value);
                break;
            default:
                SetLoginEmail(value);
                break;
        }
    };

    function handleLoginClick(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginEmail /*password: bcrypt.hashSync(loginPassword, salt)*/ })
        };
        fetch('/api/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                const isPasswordCorrect = bcrypt.compareSync(loginPassword, data[0].Password)
                props.setIsLoggedIn(isPasswordCorrect);
                isPasswordCorrect ? props.setIsAdmin(data[0].Role === "Admin") : props.setIsAdmin(false);
            })
            .then(navigate('/'));
    }

    function handleRegisterClick(event) {
        navigate('/register');
    }

    return (
        <div>
            <div className="screen-div"></div>
            
            <div className="form-div login-div" >
                <p>Логін</p>
                <label className="form-lbl-where" htmlFor="emailLogin">E-mail</label>
                <input className="form-inp-where" placeholder="Вкажіть вашу електронну скриньку..." required type="email" id="emailLogin" name="emailLogin" onChange={handleOnChange} />
                <label className="form-lbl-where" htmlFor="passwordLogin">Пароль</label>
                <input className="form-inp-where" placeholder="Вкажіть пароль..." required type="password" id="passwordLogin" name="passwordLogin" onChange={handleOnChange} />
                <button className="form-button login-button" type="button" onClick={handleLoginClick}>Увійти</button>
                <button className="form-button register-button" type="button" onClick={handleRegisterClick}>Зареєструватись</button>
            </div>

            <div className="img-link">
                Image by <a href="https://pixabay.com/users/zephyrka-1146005/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Nadine</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Pixabay</a>
            </div>
        </div>
    );
}