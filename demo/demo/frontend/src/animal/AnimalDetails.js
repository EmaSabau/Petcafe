import React, { useState, useEffect, useRef } from 'react';
import axios from '../helper/axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AnimalDetails.css';

const CITY_COORDINATES = {
    'Cluj': { lat: 46.7712, lng: 23.6236 },
    'București': { lat: 44.4268, lng: 26.1025 },
    'Timișoara': { lat: 45.7489, lng: 21.2087 },
    'Iași': { lat: 47.1585, lng: 27.6014 },
    'Constanța': { lat: 44.1810, lng: 28.6348 },
    'Brașov': { lat: 45.6427, lng: 25.5887 },
    'Oradea': { lat: 47.0465, lng: 21.9189 },
    'Sibiu': { lat: 45.8035, lng: 24.1450 },
    'Galați': { lat: 45.4353, lng: 28.0070 }
};

const AnimalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(null);
    const [adoptionStatus, setAdoptionStatus] = useState('Not requested');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false);

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);

    // Load Google Maps script
    useEffect(() => {
        if (!window.google || !window.google.maps) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => setMapInitialized(true);
            script.onerror = () => console.error('Google Maps script failed to load');
            document.head.appendChild(script);
        } else {
            setMapInitialized(true);
        }

        return () => {
            if (markerInstance.current) markerInstance.current.setMap(null);
            if (mapInstance.current) mapInstance.current = null;
        };
    }, []);

    // Fetch animal details
    useEffect(() => {
        const fetchAnimalDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/animals/${id}`);
                setAnimal(response.data);
                console.log('Animal location:', response.data.location); // Debug log pentru locație

                const adoptions = JSON.parse(localStorage.getItem('adoptionRequests')) || [];
                const adoption = adoptions.find(req => req.animalId === response.data.id);
                if (adoption) setAdoptionStatus(adoption.status || 'Pending');

                setLoading(false);
            } catch (err) {
                setError('Failed to load animal details');
                setLoading(false);
            }
        };

        fetchAnimalDetails();
    }, [id]);

    // Initialize map when ready
    useEffect(() => {
        if (!mapInitialized || !animal || !animal.location || !mapRef.current) return;

        const city = animal.location.trim();
        const coordinates = CITY_COORDINATES[city] || CITY_COORDINATES['București'];

        try {
            mapInstance.current = new window.google.maps.Map(mapRef.current, {
                center: coordinates,
                zoom: 12,
                disableDefaultUI: true
            });

            markerInstance.current = new window.google.maps.Marker({
                position: coordinates,
                map: mapInstance.current,
                title: `${animal.name} - ${city}`
            });

            // Info window
            const infoWindow = new window.google.maps.InfoWindow({
                content: `
          <div style="padding: 10px;">
            <strong>${animal.name}</strong><br>
            ${animal.breed}<br>
            Located in ${city}
          </div>
        `
            });

            markerInstance.current.addListener('click', () => {
                infoWindow.open(mapInstance.current, markerInstance.current);
            });

        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }, [mapInitialized, animal]);

    const handleAdoptRequest = () => {
        const adoptions = JSON.parse(localStorage.getItem('adoptionRequests')) || [];
        if (!adoptions.some(req => req.animalId === animal.id)) {
            adoptions.push({
                animalId: animal.id,
                animalName: animal.name,
                date: new Date().toISOString(),
                status: 'Pending'
            });
            localStorage.setItem('adoptionRequests', JSON.stringify(adoptions));
            setAdoptionStatus('Pending');
            alert(`Adoption request for ${animal.name} submitted!`);
        } else {
            alert(`You already have a pending request for ${animal.name}`);
        }
    };

    if (loading) return <div className="loading">Loading Animal Details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!animal) return <div className="not-found">Animal not found</div>;

    return (
        <div className="animal-details-container">
            <button onClick={() => navigate(-1)} className="back-button">
                &larr; Back to Animals
            </button>

            <div className="animal-details-card">
                <div className="animal-image-container">
                    <img
                        src={animal.image || animal.image_url || '/images/animal-placeholder.jpg'}
                        alt={animal.name}
                        className="animal-image"
                    />
                </div>

                <div className="animal-info">
                    <h1>{animal.name}</h1>

                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Breed:</span>
                            <span className="detail-value">{animal.breed}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Age:</span>
                            <span className="detail-value">{animal.age} years</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Gender:</span>
                            <span className="detail-value">{animal.gender}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Adoption Status:</span>
                            <span className="detail-value">{adoptionStatus}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">{animal.location || 'Not specified'}</span>
                        </div>
                    </div>

                    <div className="description">
                        <h3>About {animal.name}</h3>
                        <p>{animal.description || 'No description available.'}</p>
                    </div>

                    <div className="map-section">
                        <h3>Location Map</h3>
                        <div
                            ref={mapRef}
                            className="google-map"
                            style={{height: '300px', width: '100%'}}
                        />
                        {!mapInitialized && <p>Loading map...</p>}
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={handleAdoptRequest}
                            disabled={adoptionStatus === 'Pending'}
                            className={`adopt-button ${adoptionStatus === 'Pending' ? 'pending' : ''}`}
                        >
                            {adoptionStatus === 'Pending' ? 'Adoption Requested' : 'Request to Adopt'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalDetails;