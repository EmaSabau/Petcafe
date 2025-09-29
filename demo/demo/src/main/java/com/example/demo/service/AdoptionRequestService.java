package com.example.demo.service;

import com.example.demo.model.AdoptionRequest;
import com.example.demo.constants.Status;

import java.util.List;

public interface AdoptionRequestService {
    AdoptionRequest createAdoptionRequest(AdoptionRequest adoptionRequest);
    AdoptionRequest getAdoptionRequestById(Long id);
    List<AdoptionRequest> getAllAdoptionRequests();
    List<AdoptionRequest> getAdoptionRequestsByUserId(Long userId);
    List<AdoptionRequest> getAdoptionRequestsByAnimalId(Long animalId);
    List<AdoptionRequest> getAdoptionRequestsByStatus(String status);
    AdoptionRequest updateAdoptionRequest(Long id, AdoptionRequest adoptionRequest);

    AdoptionRequest updateAdoptionRequestStatus(Long id, Status newStatus, String responseNotes);

    AdoptionRequest approveAdoptionRequest(Long id, String responseNotes);
    AdoptionRequest rejectAdoptionRequest(Long id, String responseNotes);
    void deleteAdoptionRequest(Long id);
    boolean hasExistingRequest(Long userId, Long animalId);
    long countUserAdoptionRequests(Long userId);
    long countAnimalAdoptionRequests(Long animalId);
    String exportAnimalDetails(Long animalId);
}