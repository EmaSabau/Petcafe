package com.example.demo.service;

import com.example.demo.constants.Status;
import com.example.demo.model.Reservation;
import com.example.demo.model.User;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.impl.ReservationServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

   /* @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReservationServiceImpl reservationService;

    @Test
    public void testCreateReservation_Success() {
        // Arrange
        Long userId = 1L;
        User user = User.builder()
                .id(userId)
                .name("Test User")
                .email("test@example.com")
                .build();

        LocalDateTime reservationTime = LocalDateTime.now().plusDays(1);

        Reservation newReservation = Reservation.builder()
                .user(user)
                .reservationDatetime(reservationTime)
                .build();

        Reservation savedReservation = Reservation.builder()
                .id(1L)
                .user(user)
                .reservationDatetime(reservationTime)
                .status(Status.PENDING)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(savedReservation);

        // Act
        Reservation result = reservationService.saveReservation(newReservation);

        // Assert
        assertNotNull(result.getId());
        assertEquals(Status.PENDING, result.getStatus());
        assertEquals(reservationTime, result.getReservationDatetime());
        verify(userRepository, times(1)).findById(userId);
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }

    @Test
    public void testUpdateReservationStatus_Success() {
        // Arrange
        Long reservationId = 1L;
        Long userId = 1L;

        User user = User.builder().id(userId).build();

        Reservation existingReservation = Reservation.builder()
                .id(reservationId)
                .user(user)
                .reservationDatetime(LocalDateTime.now().plusDays(1))
                .status(Status.PENDING)
                .build();

        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(existingReservation));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(existingReservation);

        // Act
        Reservation updateData = Reservation.builder()
                .status(Status.CONFIRMED)
                .build();

        Reservation result = reservationService.updateReservation(reservationId, updateData);

        // Assert
        assertEquals(Status.CONFIRMED, result.getStatus());
        verify(reservationRepository, times(1)).findById(reservationId);
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }*/
}