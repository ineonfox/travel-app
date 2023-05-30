import './LoginPage.css';

export default function LoginPage() {
    const handleOnChange = (e) => {
        // e.preventDefault();
        // const value = e.target.value;
        // switch(e.target.id) {
        //     case "travelCity":
        //         setCity(value);
        //         break;
        //     case "startDate":
        //         setStartDate(value);
        //         break;
        //     case "endDate":
        //         setEndDate(value);
        //         break;
        //     default:
        //         setCity(value);
        //         break;
        // }
    };

    return (
        <div>
            <div className="screen-div"></div>
            
            <div className="form-div login-div">
                <p>Логін / Реєстрація</p>
            <label className="form-lbl-where" htmlFor="travelCity">E-mail</label>
            <input className="form-inp-where" placeholder="Вкажіть вашу електронну скриньку..." required type="email" id="travelCity" name="travelCity" onChange={handleOnChange} />
            </div>

            <div className="img-link">
                Image by <a href="https://pixabay.com/users/zephyrka-1146005/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Nadine</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Pixabay</a>
            </div>
        </div>
    );
}