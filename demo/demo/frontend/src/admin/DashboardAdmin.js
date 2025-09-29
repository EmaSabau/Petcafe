import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import './DashboardAdmin.css';

const DashboardAdmin = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/adoption-requests');
                setRequests(response.data);
            } catch (err) {
                setError('Failed to fetch adoption requests');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Initialize WebSocket
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            console.log('Connected to WS');
            setStompClient(client);
        });

        fetchRequests();

        return () => {
            if (client) client.disconnect();
        };
    }, []);

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/adoption-requests/${requestId}/status`,
                {
                    status: newStatus,
                    responseNotes: `Status changed by admin to ${newStatus}`
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                    }
                }
            );

            const updatedRequest = response.data;

            // Update local state
            setRequests(prev =>
                prev.map(req => req.id === requestId ? updatedRequest : req)
            );

            // Nu mai trimitem direct de aici, se face prin backend
        } catch (err) {
            setError(`Failed to update status: ${err.response?.data?.message || err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <h1>Adoption Requests Dashboard</h1>
            <div className="requests-grid">
                {requests.map(request => (
                    <div key={request.id} className="request-card">
                        <div className="request-info">
                            <h3>Request #{request.id}</h3>
                            <p><strong>User:</strong> {request.user?.name || request.user?.email || 'Unknown'}</p>
                            <p><strong>Animal:</strong> {request.animal?.name} ({request.animal?.species})</p>
                            <p><strong>Status:</strong>
                                <span className={`status-${request.status.toLowerCase()}`}>
                                    {request.status}
                                </span>
                            </p>
                            <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleString()}</p>
                            <p><strong>Message:</strong> {request.message}</p>
                        </div>

                        <div className="request-actions">
                            {request.status === 'PENDING' && (
                                <>
                                    <button
                                        onClick={() => handleStatusChange(request.id, 'APPROVED')}
                                        className="approve-btn"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(request.id, 'REJECTED')}
                                        className="reject-btn"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => handleStatusChange(request.id, 'CANCELLED')}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardAdmin;