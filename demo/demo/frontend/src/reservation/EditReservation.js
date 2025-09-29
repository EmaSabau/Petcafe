import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const styles = {
    body: {
        fontFamily: "'Georgia', serif",
        backgroundColor: '#f3e5d8',
        margin: 0,
        padding: 0,
        minHeight: '100vh'
    },
    container: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        textAlign: 'center'
    },
    title: {
        color: '#5a3e36',
        fontSize: '36px'
    },
    formCard: {
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '15px',
        textAlign: 'center'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        fontSize: '16px',
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    submitBtn: {
        backgroundColor: '#5a3e36',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '10px',
        borderRadius: '4px'
    }
};

const EditReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [reservation, setReservation] = useState({
        reservationDatetime: '',
        numPeople: ''
    });

    // Fetch data
    useEffect(() => {
        // Simulează un fetch (înlocuiește cu axios.get(`/api/reservations/${id}`))
        const fakeData = {
            reservationDatetime: '2025-05-12T18:30',
            numPeople: 4
        };
        setReservation(fakeData);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Trimite datele actualizate (ex: axios.put(`/api/reservations/${id}`, reservation))
        console.log('Rezervare actualizată:', reservation);
        navigate('/reservation/list'); // redirecționează după salvare
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h1 style={styles.title}>Editare Rezervare</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formCard}>
                        <h2>Informații despre Rezervare</h2>

                        <div style={styles.formGroup}>
                            <label htmlFor="reservationDatetime" style={styles.label}>
                                Data și Ora Rezervării:
                            </label>
                            <input
                                type="datetime-local"
                                id="reservationDatetime"
                                name="reservationDatetime"
                                value={reservation.reservationDatetime}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="numPeople" style={styles.label}>
                                Numărul de Persoane:
                            </label>
                            <input
                                type="number"
                                id="numPeople"
                                name="numPeople"
                                value={reservation.numPeople}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <input type="submit" value="Actualizează Rezervarea" style={styles.submitBtn} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReservation;
