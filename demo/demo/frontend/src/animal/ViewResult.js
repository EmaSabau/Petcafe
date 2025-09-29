import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewResult.css';
import { processAnimalsWithExtractedTraits } from './TraitExtraction';
import axios from "../helper/axios";

const ViewResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Get user ID from your authentication context or localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserId(storedUser.id);
        }
    }, []);

    const userPreferences = location.state || {
        activity: 2,
        sociability: 2,
        talkative: 2,
        independence: 2,
        energy: 2,
        trainability: 2,
        childFriendly: 2,
        strangerFriendly: 2,
        groomingNeed: 2,
        playfulness: 2
    };

    const fetchAnimals = () => {
        axios.get("/animals/animals")
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const animalsWithTraits = processAnimalsWithExtractedTraits(response.data);
                    setAnimals(animalsWithTraits);
                } else {
                    setAnimals([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to load animals. Please try again.");
                setAnimals([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    const calculateCompatibility = (animal) => {
        const traits = [
            'activity',
            'sociability',
            'talkative',
            'independence',
            'energy',
            'trainability',
            'childFriendly',
            'strangerFriendly',
            'groomingNeed',
            'playfulness'
        ];

        let diffSum = 0;
        let maxPossibleDiff = traits.length * 4;

        traits.forEach(trait => {
            const diff = Math.abs(userPreferences[trait] - animal.traits[trait]);
            diffSum += diff;
        });

        const compatibility = Math.round(100 - (diffSum / maxPossibleDiff * 100));
        return compatibility;
    };

    const handleAddFavorite = async (animalId) => {
        if (!userId) {
            alert("Please log in to add favorites");
            navigate('/login');
            return;
        }

        try {
            await axios.post("/api/favorites", null, {
                params: {
                    userId,
                    animalId
                }
            });
            alert("Added to favorites successfully!");
        } catch (err) {
            console.error("Error adding to favorites:", err);
            alert("Failed to add to favorites. Please try again.");
        }
    };

    const getTopMatches = () => {
        if (animals.length === 0) return [];

        return animals
            .map(animal => ({
                ...animal,
                compatibilityScore: calculateCompatibility(animal)
            }))
            .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
            .slice(0, 5);
    };

    const topMatches = getTopMatches();

    if (loading) {
        return (
            <div className="result-container">
                <h1>Finding Your Perfect Pet Match</h1>
                <div className="loading">
                    <p>Loading animal data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="result-container">
                <h1>Oops! Something went wrong</h1>
                <div className="error">
                    <p>{error}</p>
                    <button onClick={() => navigate('/match')}>Back to Preferences</button>
                </div>
            </div>
        );
    }

    return (
        <div className="result-container">
            <h1>Your Top Pet Matches</h1>

            {topMatches.length > 0 ? (
                topMatches.map((animal, index) => (
                    <div className="animal-card" key={animal.id}>
                        <img src={animal.image} alt={animal.name} />

                        <div className="info">
                            <h2>{animal.name}</h2>
                            <p className="compatibility">Compatibility Score: {animal.compatibilityScore}%</p>

                            <div className="actions">
                                <button
                                    className="favourite"
                                    onClick={() => handleAddFavorite(animal.id)}
                                >
                                    Add to Favourites
                                </button>
                                <button
                                    className="adopt"
                                    onClick={() => navigate('/adopt', { state: { animal } })}
                                >
                                    Request to Adopt
                                </button>
                            </div>

                            <div className="details">
                                <p><strong>Age:</strong> {animal.age} {animal.age === 1 ? 'year' : 'years'}</p>
                                <p><strong>Type:</strong> {animal.type}</p>
                                <p><strong>Breed:</strong> {animal.breed}</p>
                                <p><strong>Description:</strong> {animal.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-matches">
                    <p>We couldn't find any matches based on your preferences.</p>
                    <button onClick={() => navigate('/match')}>Adjust Preferences</button>
                </div>
            )}

            <div className="view-more-container">
                <button
                    className="view-more"
                    onClick={() => navigate('/animals', { state: { userPreferences } })}
                >
                    View More Animals
                </button>
            </div>
        </div>
    );
};

export default ViewResult;