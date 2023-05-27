import './StepProgress.css';

export default function StepProgress(props) {
    const classline = `progress-bar-div progress-bar-${props.step}`;
    const progress = props.progress > 100 ? "100%" : `${props.progress}%`;

    return (
        <div className={classline}>
            <p className='progress-bar-p'>{props.name}</p>
        <div className='step-progress-bar'>
            <div className='filling-progress' style={{width: progress}}></div>
        </div>
        </div>
    );
}