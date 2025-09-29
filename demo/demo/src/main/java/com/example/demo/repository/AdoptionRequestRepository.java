package com.example.demo.repository;

import com.example.demo.model.AdoptionRequest;
import com.example.demo.constants.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    List<AdoptionRequest> findByUserId(Long userId);
    List<AdoptionRequest> findByAnimalId(Long animalId);
    List<AdoptionRequest> findByStatus(Status status);
    boolean existsByUserIdAndAnimalId(Long userId, Long animalId);
    long countByUserId(Long userId);
    long countByAnimalId(Long animalId);
    int countByUserIdAndStatus(Long userId, Status status);
}