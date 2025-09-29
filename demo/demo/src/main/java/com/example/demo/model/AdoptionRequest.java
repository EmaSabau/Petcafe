package com.example.demo.model;

import com.example.demo.constants.Status;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Size;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "adoption_requests",
        uniqueConstraints = @UniqueConstraint(name = "unique_adoption_request", columnNames = {"user_id", "animal_id"}))
public class AdoptionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"adoptionRequests", "hibernateLazyInitializer", "handler"}) // Add all properties you want to ignore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false)
    @JsonIgnoreProperties({"adoptionRequests", "hibernateLazyInitializer", "handler"})
    private Animal animal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false, columnDefinition = "TEXT")
    @Size(max=50)
    private String message;

    @Column(name = "request_date")
    private LocalDateTime requestDate;

    @Column(name = "response_date")
    private LocalDateTime responseDate;

    @Column(name = "response_notes", columnDefinition = "TEXT")
    private String responseNotes;

    @PrePersist
    protected void onCreate() {
        if (requestDate == null) {
            requestDate = LocalDateTime.now();
        }
        if (status == null) {
            status = Status.PENDING;
        }
    }
}