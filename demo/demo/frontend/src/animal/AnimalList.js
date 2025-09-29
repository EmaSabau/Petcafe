import React, { useEffect, useState } from 'react';
import axios from '../helper/axios';
import './AnimalList.css';
import { useNavigate } from 'react-router-dom';

const AnimalList = () => {
    const [animals, setAnimals] = useState([]);
    const [filters, setFilters] = useState({
        type: '',
        breed: '',
        minAge: '',
        maxAge: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const userId = localStorage.getItem("USER_ID")

    const fetchAnimals = () => {
        const params = {};
        if (filters.type) params.type = filters.type;
        if (filters.breed) params.breed = filters.breed;
        if (filters.minAge) params.minAge = filters.minAge;
        if (filters.maxAge) params.maxAge = filters.maxAge;

        axios.get("/animals/filter", { params })
            .then(response => {
                setAnimals(response.data);
            })
            .catch(error => {
                console.error("Error fetching animals:", error);
                setError("Failed to load animals. Please try again.");
                setAnimals([]);
            });
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const fetchfilteredAnimals = () => {
        const params = {};
        if (filters.type) params.type = filters.type;
        if (filters.minAge) params.minAge = filters.minAge;
        if (filters.maxAge) params.maxAge = filters.maxAge;

        fetchAnimals(params);
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

    return (
        <div className="container">
            <h1>Animals ready to adopt</h1>

            {error && <div className="error-message">{error}</div>}

            <div className="filters">
                <select name="type" onChange={handleChange} value={filters.type}>
                    <option value="">All Types</option>
                    <option value="DOG">Dog</option>
                    <option value="CAT">Cat</option>
                </select>
                <input type="number" name="minAge" placeholder="Min Age" onChange={handleChange} value={filters.minAge} />
                <input type="number" name="maxAge" placeholder="Max Age" onChange={handleChange} value={filters.maxAge} />
                <button onClick={fetchfilteredAnimals}>Apply Filters</button>
            </div>

            <div id="animal-list" className="animal-grid">
                {animals.length > 0 ? (
                    animals.map(animal => (
                        <div key={animal.id} className="animal-card">
                            <button
                                className="favourite-icon"
                                title="Add to favourites"
                                onClick={() => handleAddFavorite(animal.id)}
                            >
                                <i className="bi bi-heart-fill"></i>
                            </button>
                            <img src={animal.image || "https://via.placeholder.com/150"} alt="Animal" />
                            <div className="animal-info">
                                <h3>{animal.name}</h3>
                                <p><strong>Age:</strong> {animal.age}</p>
                                <p><strong>Gender:</strong> {animal.gender}</p>
                                <p><strong>Breed:</strong> {animal.breed}</p>
                            </div>
                            <div className="action-buttons">
                                <button
                                    className="details-button"
                                    onClick={() => navigate(`/animal/details/${animal.id}`)}
                                >
                                    View More Details
                                </button>
                                <button
                                    className="adopt-button"
                                    onClick={() => navigate('/adopt', { state: { animal } })}
                                >
                                    Request to Adopt
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No animals available.</p>
                )}
            </div>

            <button
                onClick={() => navigate('/match')}
                className="match-button"
            >
                Pet Match
            </button>
        </div>
    );
};

export default AnimalList;