import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PetMatch.css';

const PetMatch = () => {
    const navigate = useNavigate();

    const [activity, setActivity] = useState(2);
    const [sociability, setSociability] = useState(2);
    const [talkative, setTalkative] = useState(2);
    const [independence, setIndependence] = useState(2);
    const [energy, setEnergy] = useState(2);
    const [trainability, setTrainability] = useState(2);
    const [childFriendly, setChildFriendly] = useState(2);
    const [strangerFriendly, setStrangerFriendly] = useState(2);
    const [groomingNeed, setGroomingNeed] = useState(2);
    const [playfulness, setPlayfulness] = useState(2);

    const handleViewResult = () => {
        // Creare obiect cu preferințele utilizatorului
        const preferences = {
            activity,
            sociability,
            talkative,
            independence,
            energy,
            trainability,
            childFriendly,
            strangerFriendly,
            groomingNeed,
            playfulness
        };

        // Navigare către pagina de rezultate, trimițând preferințele ca state
        navigate("/view-result", { state: preferences });
    };

    return (
        <div className="container">
            <h2>Behaviour Preferences</h2>

            <div className="slider-group">
                <label>How active?</label>
                <input type="range" min="0" max="4" value={activity} onChange={e => setActivity(+e.target.value)} />
                <p>{["Not Active", "", "Moderate", "", "Very Active"][activity]}</p>
            </div>

            <div className="slider-group">
                <label>How sociable?</label>
                <input type="range" min="0" max="4" value={sociability} onChange={e => setSociability(+e.target.value)} />
                <p>{["Prefers Alone", "", "Don't mind", "", "Loves Everyone"][sociability]}</p>
            </div>

            <div className="slider-group">
                <label>How talkative?</label>
                <input type="range" min="0" max="4" value={talkative} onChange={e => setTalkative(+e.target.value)} />
                <p>{["Quiet", "", "Quite Talkative", "", "Very Vocal"][talkative]}</p>
            </div>

            <div className="slider-group">
                <label>How independent?</label>
                <input type="range" min="0" max="4" value={independence} onChange={e => setIndependence(+e.target.value)} />
                <p>{["Very Dependent", "", "Somewhat", "", "Highly Independent"][independence]}</p>
            </div>

            <div className="slider-group">
                <label>Energy level?</label>
                <input type="range" min="0" max="4" value={energy} onChange={e => setEnergy(+e.target.value)} />
                <p>{["Very Calm", "", "Balanced", "", "Hyperactive"][energy]}</p>
            </div>

            <div className="slider-group">
                <label>Trainability?</label>
                <input type="range" min="0" max="4" value={trainability} onChange={e => setTrainability(+e.target.value)} />
                <p>{["Hard to Train", "", "Trainable", "", "Highly Trainable"][trainability]}</p>
            </div>

            <div className="slider-group">
                <label>Child friendly?</label>
                <input type="range" min="0" max="4" value={childFriendly} onChange={e => setChildFriendly(+e.target.value)} />
                <p>{["Not Friendly", "", "Sometimes", "", "Loves Kids"][childFriendly]}</p>
            </div>

            <div className="slider-group">
                <label>Stranger friendly?</label>
                <input type="range" min="0" max="4" value={strangerFriendly} onChange={e => setStrangerFriendly(+e.target.value)} />
                <p>{["Shy", "", "Neutral", "", "Very Friendly"][strangerFriendly]}</p>
            </div>

            <div className="slider-group">
                <label>Grooming needs?</label>
                <input type="range" min="0" max="4" value={groomingNeed} onChange={e => setGroomingNeed(+e.target.value)} />
                <p>{["Low Maintenance", "", "Medium", "", "High Maintenance"][groomingNeed]}</p>
            </div>

            <div className="slider-group">
                <label>How playful?</label>
                <input type="range" min="0" max="4" value={playfulness} onChange={e => setPlayfulness(+e.target.value)} />
                <p>{["Not Playful", "", "Sometimes", "", "Very Playful"][playfulness]}</p>
            </div>

            <button onClick={handleViewResult} className="view-result">
                View Result
            </button>
        </div>
    );
};
export default PetMatch;