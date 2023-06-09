import { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    
    const navigate = useNavigate();

    const [registerEmail, SetRegisterEmail] = useState();
    const [registerNickname, SetRegisterNickname] = useState();
    const [registerPassword, SetRegisterPassword] = useState();
    
    const handleOnChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        switch(e.target.id) {
            case "nicknameRegister":
                SetRegisterNickname(value);
                break;
            case "emailRegister":
                SetRegisterEmail(value);
                break;
            case "passwordRegister":
                SetRegisterPassword(value);
                break;
            default:
                SetRegisterNickname(value);
                break;
        }
    };

    function handleLoginClick(event) {
        navigate('/login');
    }

    function handleRegisterClick(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname: registerNickname, email: registerEmail, password: bcrypt.hashSync(registerPassword, salt) })
        };
        fetch('/api/register', requestOptions)
            // .then(response => response.json())
            .then(data => console.log(data) /*this.setState({ postId: data.id })*/)
            .then(navigate('/'));
    }

    return (
        <div>
            <div className="screen-div"></div>
            
            <div className="form-div register-div" >
                <p>Реєстрація</p>
                <label className="form-lbl-where" htmlFor="nicknameRegister">Псевдонім</label>
                <input className="form-inp-where" placeholder="Вкажіть ваш псевдонім..." required type="text" id="nicknameRegister" name="nicknameRegister" onChange={handleOnChange} />
                <label className="form-lbl-where" htmlFor="emailRegister">E-mail</label>
                <input className="form-inp-where" placeholder="Вкажіть вашу електронну скриньку..." required type="email" id="emailRegister" name="emailRegister" onChange={handleOnChange} />
                <label className="form-lbl-where" htmlFor="passwordRegister">Пароль</label>
                <input className="form-inp-where" placeholder="Вкажіть пароль..." required type="password" id="passwordRegister" name="passwordRegister" onChange={handleOnChange} />
                <button className="form-button login-button" type="button" onClick={handleRegisterClick}>Зареєструватись</button>
                <button className="form-button register-button" type="button" onClick={handleLoginClick}>Увійти</button>
            </div>

            <div className="img-link">
                Image by <a href="https://pixabay.com/users/zephyrka-1146005/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Nadine</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Pixabay</a>
            </div>
        </div>
    );
}