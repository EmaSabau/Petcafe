package com.example.demo.service.impl;

import com.example.demo.controller.WebSocketController;
import com.example.demo.model.AdoptionRequest;
import com.example.demo.model.User;
import com.example.demo.model.Animal;
import com.example.demo.repository.AdoptionRequestRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.AnimalRepository;
import com.example.demo.service.AdoptionRequestService;
import com.example.demo.constants.Status;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.StringWriter;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdoptionRequestServiceImpl implements AdoptionRequestService {

    private final AdoptionRequestRepository adoptionRequestRepository;
    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;
    private Animal animal;

    @Override
    public AdoptionRequest createAdoptionRequest(AdoptionRequest adoptionRequest) {
        User user = userRepository.findById(adoptionRequest.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Animal animal = animalRepository.findById(adoptionRequest.getAnimal().getId())
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        if (adoptionRequestRepository.existsByUserIdAndAnimalId(user.getId(), animal.getId())) {
            throw new RuntimeException("Adoption request already exists");
        }

        adoptionRequest.setUser(user);
        adoptionRequest.setAnimal(animal);
        return adoptionRequestRepository.save(adoptionRequest);
    }

    @Override
    @Transactional(readOnly = true)
    public AdoptionRequest getAdoptionRequestById(Long id) {
        return adoptionRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adoption request not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdoptionRequest> getAllAdoptionRequests() {
        return adoptionRequestRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdoptionRequest> getAdoptionRequestsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        return adoptionRequestRepository.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdoptionRequest> getAdoptionRequestsByAnimalId(Long animalId) {
        return adoptionRequestRepository.findByAnimalId(animalId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdoptionRequest> getAdoptionRequestsByStatus(String status) {
        Status statusEnum = Status.valueOf(status.toUpperCase());
        return adoptionRequestRepository.findByStatus(statusEnum);
    }

    @Override
    public AdoptionRequest updateAdoptionRequest(Long id, AdoptionRequest adoptionRequest) {
        AdoptionRequest existing = getAdoptionRequestById(id);

        if (adoptionRequest.getMessage() != null) {
            existing.setMessage(adoptionRequest.getMessage());
        }

        if (adoptionRequest.getStatus() != null) {
            existing.setStatus(adoptionRequest.getStatus());
            existing.setResponseDate(LocalDateTime.now());
        }

        if (adoptionRequest.getResponseNotes() != null) {
            existing.setResponseNotes(adoptionRequest.getResponseNotes());
        }

        return adoptionRequestRepository.save(existing);
    }

    private final WebSocketController webSocketController;

    @Override
    public AdoptionRequest updateAdoptionRequestStatus(Long id, Status newStatus, String responseNotes) {
        AdoptionRequest request = getAdoptionRequestById(id);
        request.setStatus(newStatus);
        request.setResponseDate(LocalDateTime.now());
        request.setResponseNotes(responseNotes);

        AdoptionRequest updatedRequest = adoptionRequestRepository.save(request);

        // Notificare prin WebSocket
        webSocketController.notifyStatusChange(updatedRequest);

        return updatedRequest;
    }

    @Override
    public AdoptionRequest approveAdoptionRequest(Long id, String responseNotes) {
        AdoptionRequest request = getAdoptionRequestById(id);
        request.setStatus(Status.CONFIRMED);
        request.setResponseDate(LocalDateTime.now());
        request.setResponseNotes(responseNotes);

        AdoptionRequest updatedRequest = adoptionRequestRepository.save(request);
        webSocketController.notifyStatusChange(updatedRequest);

        return updatedRequest;
    }

    @Override
    public AdoptionRequest rejectAdoptionRequest(Long id, String responseNotes) {
        AdoptionRequest request = getAdoptionRequestById(id);
        request.setStatus(Status.CANCELED);
        request.setResponseDate(LocalDateTime.now());
        request.setResponseNotes(responseNotes);

        AdoptionRequest updatedRequest = adoptionRequestRepository.save(request);
        webSocketController.notifyStatusChange(updatedRequest);

        return updatedRequest;
    }

    @Override
    public void deleteAdoptionRequest(Long id) {
        if (!adoptionRequestRepository.existsById(id)) {
            throw new RuntimeException("Adoption request not found");
        }
        adoptionRequestRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean hasExistingRequest(Long userId, Long animalId) {
        return adoptionRequestRepository.existsByUserIdAndAnimalId(userId, animalId);
    }

    @Override
    @Transactional(readOnly = true)
    public long countUserAdoptionRequests(Long userId) {
        return adoptionRequestRepository.countByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public long countAnimalAdoptionRequests(Long animalId) {
        return adoptionRequestRepository.countByAnimalId(animalId);
    }

    @Override
    public String exportAnimalDetails(Long animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        try {
            JAXBContext context = JAXBContext.newInstance(Animal.class);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            StringWriter writer = new StringWriter();
            marshaller.marshal(animal, writer);
            return writer.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to export animal details", e);
        }
    }

}