import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdoptionRequest.css';
import axios from '../helper/axios';

const AdoptionRequest = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const animal = state?.animal;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const adoptionRequestData = {
                animalId: animal.id,
                userDetails: formData,
                status: 'Pending'
            };

            await axios.post("/api/adoption-requests", adoptionRequestData);
            alert("Request submitted successfully!");
            navigate('/profile');
        } catch (err) {
            console.error("Error submitting adoption request:", err);
            setError("Failed to submit request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="adoption-form-container">
            <h2>Adoption Request for {animal?.name}</h2>
            {error && <div className="error-message">{error}</div>}

            {animal && (
                <div className="animal-summary">
                    <p><strong>Species:</strong> {animal.species || 'N/A'}</p>
                    <p><strong>Breed:</strong> {animal.breed}</p>
                    <p><strong>Age:</strong> {animal.age}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                    Address:
                    <textarea name="address" value={formData.address} onChange={handleChange} required />
                </label>
                <label>
                    Why do you want to adopt this pet?
                    <textarea name="reason" value={formData.reason} onChange={handleChange} required />
                </label>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default AdoptionRequest;