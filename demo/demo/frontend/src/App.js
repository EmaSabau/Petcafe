import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import AdoptionRequest from './animal/AdoptionRequest';
import AnimalList from "./animal/AnimalList";
import PetMatch from './animal/PetMatch';
import ViewResult from './animal/ViewResult';
import AnimalDetails from './animal/AnimalDetails';
import Menu from './product/Menu';
import ReservationForm from "./reservation/ReservationForm";
import ReservationList from "./reservation/ReservationList";
import EditReservation from "./reservation/EditReservation";
import DashboardAdmin from "./admin/DashboardAdmin";
import React from "react";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<DashboardAdmin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/animals" element={<AnimalList />} />
                <Route path="/products" element={<Menu />} />
                <Route exact path="/match" element={<PetMatch />} />
                <Route path="/view-result" element={<ViewResult />} />
                <Route path="/animal/details/:id" element={<AnimalDetails />} />
                <Route path="/adopt" element={<AdoptionRequest />} />
                <Route path="/reservation" element={ <ReservationList/> } />
                <Route path="/create-reservation" element={ <ReservationForm/> } />
                <Route path="/edit-reservation" element={ <EditReservation/> } />
            </Routes>
        </Router>
    );
}

export default App;
