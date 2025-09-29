package com.example.demo.service;

import com.example.demo.model.Reservation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReservationService {
    List<Reservation> getAllReservations();
    List<Reservation> getReservationsByUserId(Long userId);
    Reservation updateReservation(Long id, Reservation reservation);
    void deleteReservation(Long id);
    Reservation approveReservation(Long id);
    Reservation rejectReservation(Long id);
    Reservation getReservationById(Long id);

    @Transactional
    Reservation createReservation(Reservation reservation);
}