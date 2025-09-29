package com.example.demo.model;

import com.example.demo.constants.Status;
import com.example.demo.validators.NotWeekend;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Future;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@XmlRootElement
@Table(name = "reservations")
@Getter @Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Schimbat de la EAGER la LAZY
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Future
    @NotWeekend
    @Column(name = "reservation_datetime", nullable = false)
    private LocalDateTime reservationDatetime;

    @Column(name = "duration_minutes", columnDefinition = "INT DEFAULT 60")
    private Integer durationMinutes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING; // Valoare implicită
}