import React from "react";
import { Button, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importăm iconița de profil din react-icons

export default (props) => {
    const navigate = useNavigate();

    const navigateToPets = () => navigate('/animals');
    const navigateToProducts = () => navigate('/products');
    const navigateToReservation = () => navigate('/create-reservation');
    const navigateToProfile = () => navigate('/profile'); // Navighează la pagina de profil

    return (
        <div
            style={{
                backgroundImage: 'url(/images/LoginBackground.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                padding: '20',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Content Centralizat cu Butoane */}
            <Container
                maxWidth="sm"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <Button
                    onClick={navigateToPets}
                    variant="contained"
                    color="primary"
                    style={{
                        width: '200px',
                        padding: '10px',
                        fontSize: '18px',
                        backgroundColor: '#6E4F39',
                        '&:hover': {
                            backgroundColor: '#503B2B',
                        },
                    }}
                >
                    Pets
                </Button>

                <Button
                    onClick={navigateToProducts}
                    variant="contained"
                    color="primary"
                    style={{
                        width: '200px',
                        padding: '10px',
                        fontSize: '18px',
                        backgroundColor: '#6E4F39',
                        '&:hover': {
                            backgroundColor: '#503B2B',
                        },
                    }}
                >
                    Products
                </Button>

                <Button
                    onClick={navigateToReservation}
                    variant="contained"
                    color="primary"
                    style={{
                        width: '200px',
                        padding: '10px',
                        fontSize: '18px',
                        backgroundColor: '#6E4F39',
                        '&:hover': {
                            backgroundColor: '#503B2B',
                        },
                    }}
                >
                    Reservation
                </Button>
            </Container>

            {/* Butonul de profil plasat dreapta sus */}
            <Button
                onClick={navigateToProfile}
                variant="contained"
                color="primary"
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#6E4F39',
                    borderRadius: '50%', // Face butonul rotund
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '0', // Elimină paddingul implicit care deformează cercul
                    '&:hover': {
                        backgroundColor: '#503B2B',
                    },
                }}
            >
                <FaUserCircle size={28} />
            </Button>

        </div>
    );
};
