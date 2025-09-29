import React, { useEffect, useState } from 'react';
import axios from '../helper/axios';
import { useNavigate } from 'react-router-dom';
import './ReservationList.css';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchReservations = async () => {
        try {
            const response = await axios.get("/reservations");
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`/reservations/${id}/status?status=${newStatus}`);
            fetchReservations(); // Refresh the list
        } catch (error) {
            console.error("Error updating status:", error);
            alert('Failed to update reservation status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to cancel this reservation?')) {
            try {
                await axios.delete(`/reservations/${id}`);
                setReservations(prev => prev.filter(r => r.id !== id));
            } catch (error) {
                console.error("Error deleting reservation:", error);
                alert('Failed to cancel reservation');
            }
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'status-badge confirmed';
            case 'PENDING': return 'status-badge pending';
            case 'CANCELLED': return 'status-badge cancelled';
            case 'COMPLETED': return 'status-badge completed';
            default: return 'status-badge';
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading reservations...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="reservation-list-container">
            <div className="reservation-list-header">
                <button
                    onClick={() => navigate('/create-reservation')}
                    className="btn-primary"
                >
                    + New Reservation
                </button>
            </div>

                <div className="reservation-grid">
                    {reservations.map(reservation => (
                        <div key={reservation.id} className="reservation-card">
                            <div className="card-header">
                                <h3>Reservation #{reservation.id}</h3>
                                <span className={getStatusBadgeClass(reservation.status)}>
                                    {reservation.status}
                                </span>
                            </div>

                            <div className="card-body">
                                <div className="reservation-detail">
                                    <span className="detail-label">Date:</span>
                                    <span className="detail-value">
                                        {new Date(reservation.reservationDatetime).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="reservation-detail">
                                    <span className="detail-label">Time:</span>
                                    <span className="detail-value">
                                        {new Date(reservation.reservationDatetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                                <div className="reservation-detail">
                                    <span className="detail-label">User:</span>
                                    <span className="detail-value">
                                        {reservation.user?.name || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="card-actions">
                                <select
                                    value={reservation.status}
                                    onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
                                    className="status-select"
                                    disabled={reservation.status === 'COMPLETED'}
                                >
                                    {Object.values(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>

                                <button
                                    onClick={() => navigate(`/reservations/${reservation.id}/edit`)}
                                    className="btn-secondary"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(reservation.id)}
                                    className="btn-danger"
                                    disabled={reservation.status === 'COMPLETED'}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default ReservationList;