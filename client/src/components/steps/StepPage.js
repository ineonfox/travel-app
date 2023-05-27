import React from 'react';
import '../MainPage.css';
import './StepPage.css';
import StepProgress from './StepProgress';
import TicketStep from './TicketStep';
import { useLocation } from "react-router-dom";
import BookingStep from './BookingStep';

export default function StepPage() {
    const { state } = useLocation();
    const [progress, setProgress] = React.useState(10);
    const [passangerAmount, SetPassangerAmount] = React.useState();

    return (
        <div>
            <div className="animated-blur screen-div"></div>
            <div className="form-div steps grid-steps">
                <StepProgress progress={progress} step={1} name="1. Купівля квитків" />
                <StepProgress progress={progress <= 100 ? 0 : progress-100} step={2} name="2. Бронювання готелю" />
                {progress < 100 ? 
                    <TicketStep setProgress={setProgress} state={state} passangerAmount={passangerAmount} setPassangers={SetPassangerAmount} /> 
                    : <BookingStep setProgress={setProgress} state={state} passangerAmount={passangerAmount} />}
            </div>
            <div className="img-link">
                Image by <a href="https://pixabay.com/users/zephyrka-1146005/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Nadine</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5202547">Pixabay</a>
            </div>
        </div>
    );
}