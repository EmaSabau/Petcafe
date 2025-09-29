import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import './Profile.css';
import './animal/AnimalList.css';
import ReservationList from './reservation/ReservationList';

const Profile = () => {
    const [favorites, setFavorites] = useState([]);
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [reservations, setReservations] = useState([]);
    const userId = localStorage.getItem("USER_ID");

    useEffect(() => {
        if (!userId) {
            return;
        }
        // Initialize WebSocket connection
        const initializeWebSocket = () => {
            const socket = new SockJS('http://localhost:8080/ws');
            const client = Stomp.over(socket);

            client.connect({}, () => {
                console.log('WebSocket Connected');
                client.subscribe(`/topic/status/${userId}`, (message) => {
                    const updatedRequest = JSON.parse(message.body);

                    // Add notification
                    setNotifications(prev => [...prev, {
                        id: Date.now(),
                        message: `Status updated for ${updatedRequest.animal?.name || 'animal'}: ${updatedRequest.status}`,
                        request: updatedRequest
                    }]);

                    // Update adoption requests list
                    setAdoptionRequests(prev =>
                        prev.map(req =>
                            req.id === updatedRequest.id ? updatedRequest : req
                        )
                    );
                });
            });

            setStompClient(client);
            return client;
        };

        const client = initializeWebSocket();

        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const baseURL = 'http://localhost:8080';

                // Fetch favorites
                const favoritesResponse = await axios.get(`${baseURL}/api/favorites/user/${userId}`);
                const favoritesData = favoritesResponse.data.content || favoritesResponse.data || [];

                // Fetch adoption requests
                const adoptionRequestsResponse = await axios.get(`${baseURL}/api/adoption-requests/user/${userId}`);
                const adoptionRequestsData = adoptionRequestsResponse.data.content || adoptionRequestsResponse.data || [];

                // Fetch reservations
                const reservationsResponse = await axios.get(`${baseURL}/api/reservations/user/${userId}`);
                const reservationsData = reservationsResponse.data.content || reservationsResponse.data || [];

                setFavorites(favoritesData);
                setAdoptionRequests(adoptionRequestsData);
                setReservations(reservationsData);

            } catch (err) {
                console.error("Error in fetchProfileData:", err);
                // Fallback to localStorage data if available
                const storedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
                const storedRequests = JSON.parse(localStorage.getItem('adoptionRequests')) || [];
                const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];

                setFavorites(storedFavorites);
                setAdoptionRequests(storedRequests);
                setReservations(storedReservations);
                setError("Using offline data. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();

        // Cleanup function
        return () => {
            if (client) {
                client.disconnect();
                console.log('WebSocket Disconnected');
            }
        };
    }, [userId]);

    const handleExportAnimalDetails = async (animalId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/adoption-requests/${animalId}/export`,
                { responseType: 'blob' }
            );

            // Create download link
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `animal_details.xml`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Export error:", err);
            // Show error notification
        }
    };
    const handleCancelAdoptionRequest = async (requestId) => {
        try {
            const baseURL = 'http://localhost:8080';
            await axios.delete(`${baseURL}/api/adoption-requests/${requestId}`);

            // Update the local state to remove the cancelled request
            const cancelledRequest = adoptionRequests.find(req => req.id === requestId);
            setAdoptionRequests(prev => prev.filter(req => req.id !== requestId));

            // Add notification for user's own action
            setNotifications(prev => [...prev, {
                id: Date.now(),
                message: `You cancelled the adoption request for ${cancelledRequest.animal?.name || 'the animal'}`,
                type: 'info'
            }]);

        } catch (err) {
            console.error("Error cancelling adoption request:", err);
            setNotifications(prev => [...prev, {
                id: Date.now(),
                message: "Failed to cancel adoption request. Please try again.",
                type: 'error'
            }]);
        }
    };

    const handleRemoveFromFavorites = async (animalId) => {
        try {
            const baseURL = 'http://localhost:8080';
            await axios.delete(`${baseURL}/api/favorites?userId=${userId}&animalId=${animalId}`);

            // Update the local state to remove the favorite
            setFavorites(prev => prev.filter(fav => fav.animal?.id !== animalId && fav.animalId !== animalId));

        } catch (err) {
            console.error("Error removing from favorites:", err);
            alert("Failed to remove from favorites. Please try again.");
        }
    };

    const handleCloseNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            const baseURL = 'http://localhost:8080';
            await axios.delete(`${baseURL}/api/reservations/${reservationId}`);

            // Update local state
            setReservations(prev => prev.filter(res => res.id !== reservationId));

            // Add notification
            setNotifications(prev => [...prev, {
                id: Date.now(),
                message: "Reservation cancelled successfully",
                type: 'success'
            }]);
        } catch (err) {
            console.error("Error cancelling reservation:", err);
            setNotifications(prev => [...prev, {
                id: Date.now(),
                message: "Failed to cancel reservation",
                type: 'error'
            }]);
        }
    };

    const handleExportReservation = async (reservationId) => {
        try {
            const baseURL = 'http://localhost:8080';
            const response = await axios.get(
                `${baseURL}/api/reservations/${reservationId}/export`,
                { responseType: 'blob' }
            );

            // Create download link
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `reservation_${reservationId}.xml`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Export error:", err);
            setNotifications(prev => [...prev, {
                id: Date.now(),
                message: "Failed to export reservation details",
                type: 'error'
            }]);
        }
    };

    if (!userId) {
        return (
            <div className="profile-container">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="profile-container">
                <p>Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1>Your Profile</h1>

            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="notifications-container">
                    {notifications.map(notif => (
                        <div key={notif.id} className="notification">
                            <span>{notif.message}</span>
                            <button
                                onClick={() => handleCloseNotification(notif.id)}
                                className="close-notification"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <section className="profile-section">
                <h2>Your Favorites</h2>
                {favorites.length > 0 ? (
                    <div className="horizontal-scroll-container">
                        {favorites.map(favorite => {
                            const animal = favorite.animal || favorite;
                            return (
                                <div key={favorite.id} className="animal-card">
                                    <img src={animal.image || animal.imageUrl} alt="Animal"/>
                                    <div className="animal-info">
                                        <h3>{animal.name}</h3>
                                        <p><strong>Age:</strong> {animal.age}</p>
                                        <p><strong>Gender:</strong> {animal.gender}</p>
                                        <p><strong>Breed:</strong> {animal.breed}</p>
                                        <button
                                            onClick={() => handleRemoveFromFavorites(animal.id)}
                                            className="remove-favorite-button"
                                        >
                                            Remove from Favorites
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No favorites added yet.</p>
                )}
            </section>

            <section className="profile-section">
                <h2>Adoption Requests</h2>
                {adoptionRequests.length > 0 ? (
                    <ul className="adoption-list">
                        {adoptionRequests.map(req => (
                            <li key={req.id} className="adoption-item">
                                <p>
                                    <strong>{req.animal?.name || req.animalName}</strong> –
                                    {req.animal?.species || req.species},
                                    {req.animal?.breed || req.breed},
                                    Age: {req.animal?.age || req.age} <br/>
                                    Status: <span className={`status-${req.status?.toLowerCase()}`}>
                                        {req.status || 'Pending'}
                                    </span>
                                    {req.requestDate && (
                                        <span> | Submitted: {new Date(req.requestDate).toLocaleDateString()}</span>
                                    )}
                                    {req.responseNotes && (
                                        <div className="response-notes">
                                            <strong>Notes:</strong> {req.responseNotes}
                                        </div>
                                    )}

                                </p>
                                {req.status === 'PENDING' && (
                                    <button
                                        onClick={() => handleCancelAdoptionRequest(req.id)}
                                        className="cancel-button"
                                    >
                                        Cancel Request
                                    </button>
                                )}
                                {req.status === 'CONFIRMED' && (
                                    <div className="action-buttons">
                                        <button onClick={() => handleExportAnimalDetails(req.animal?.id)}>
                                            Export Animal Details
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No adoption requests.</p>
                )}
            </section>

            <section className="profile-section">
                <h2>Your Reservations</h2>
                {reservations.length > 0 ? (
                    <ul className="reservation-list">
                        {reservations.map(reservation => (
                            <li key={reservation.id} className="reservation-item">
                                <p>
                                    <strong>Reservation #{reservation.id}</strong><br/>
                                    Status: <span className={`status-${reservation.status?.toLowerCase()}`}>
                            {reservation.status || 'Pending'}
                        </span><br/>
                                    {reservation.date && (
                                        <span>Date: {new Date(reservation.date).toLocaleDateString()}</span>
                                    )}
                                    {reservation.notes && (
                                        <div className="reservation-notes">
                                            <strong>Notes:</strong> {reservation.notes}
                                        </div>
                                    )}
                                </p>
                                {reservation.status === 'PENDING' && (
                                    <button
                                        onClick={() => handleCancelReservation(reservation.id)}
                                        className="cancel-button"
                                    >
                                        Cancel Reservation
                                    </button>
                                )}
                                {reservation.status === 'CONFIRMED' && (
                                    <button
                                        onClick={() => handleExportReservation(reservation.id)}
                                        className="export-button"
                                    >
                                        Export Reservation
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reservations found.</p>
                )}
            </section>
        </div>
    );
};

export default Profile;