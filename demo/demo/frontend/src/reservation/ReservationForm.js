import React, { useState } from 'react';
import "./ReservationForm.css";

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhoneNumber: '',
        reservationDatetime: '',
        numPeople: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aici poți face POST către backend
        alert('Reservation submitted!');
        console.log(formData);
    };

    return (
        <div className="body">
            <div className="container">
                <h1 className="title">New Reservation</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-card">
                        <h2>Informations about the client</h2>

                        <div className="form-group">
                            <label htmlFor="clientName">Name: </label>
                            <input
                                type="text"
                                name="clientName"
                                id="clientName"
                                required
                                value={formData.clientName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="clientEmail">Email: </label>
                            <input
                                type="email"
                                name="clientEmail"
                                id="clientEmail"
                                required
                                value={formData.clientEmail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="clientPhoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                name="clientPhoneNumber"
                                id="clientPhoneNumber"
                                required
                                value={formData.clientPhoneNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reservationDatetime">Date and time:</label>
                            <input
                                type="datetime-local"
                                name="reservationDatetime"
                                id="reservationDatetime"
                                required
                                value={formData.reservationDatetime}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="numPeople">Number of seats:</label>
                            <input
                                type="number"
                                name="numPeople"
                                id="numPeople"
                                min="1"
                                required
                                value={formData.numPeople}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                value="Submit reservation"
                                className="submit-btn"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservationForm;