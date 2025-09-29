package com.example.demo.controller;

import com.example.demo.model.AdoptionRequest;
import com.example.demo.service.AdoptionRequestService;
import io.opencensus.resource.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/adoption-requests")
@RequiredArgsConstructor
public class AdoptionRequestController {

    private final AdoptionRequestService adoptionRequestService;

    @PostMapping
    public ResponseEntity<AdoptionRequest> create(@Valid @RequestBody AdoptionRequest adoptionRequest) {
        return new ResponseEntity<>(
                adoptionRequestService.createAdoptionRequest(adoptionRequest),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionRequest> getById(@PathVariable Long id) {
        return ResponseEntity.ok(adoptionRequestService.getAdoptionRequestById(id));
    }

    @GetMapping
    public ResponseEntity<List<AdoptionRequest>> getAll() {
        return ResponseEntity.ok(adoptionRequestService.getAllAdoptionRequests());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdoptionRequest>> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(adoptionRequestService.getAdoptionRequestsByUserId(userId));
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<AdoptionRequest>> getByAnimalId(@PathVariable Long animalId) {
        return ResponseEntity.ok(adoptionRequestService.getAdoptionRequestsByAnimalId(animalId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdoptionRequest>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(adoptionRequestService.getAdoptionRequestsByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdoptionRequest> update(
            @PathVariable Long id,
            @Valid @RequestBody AdoptionRequest adoptionRequest) {
        return ResponseEntity.ok(adoptionRequestService.updateAdoptionRequest(id, adoptionRequest));
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<AdoptionRequest> approve(
            @PathVariable Long id,
            @RequestBody(required = false) String responseNotes) {
        return ResponseEntity.ok(adoptionRequestService.approveAdoptionRequest(id, responseNotes));
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<AdoptionRequest> reject(
            @PathVariable Long id,
            @RequestBody(required = false) String responseNotes) {
        return ResponseEntity.ok(adoptionRequestService.rejectAdoptionRequest(id, responseNotes));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adoptionRequestService.deleteAdoptionRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkExisting(
            @RequestParam Long userId,
            @RequestParam Long animalId) {
        return ResponseEntity.ok(adoptionRequestService.hasExistingRequest(userId, animalId));
    }

    @GetMapping("/count/user/{userId}")
    public ResponseEntity<Long> countByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adoptionRequestService.countUserAdoptionRequests(userId));
    }

    @GetMapping("/count/animal/{animalId}")
    public ResponseEntity<Long> countByAnimal(@PathVariable Long animalId) {
        return ResponseEntity.ok(adoptionRequestService.countAnimalAdoptionRequests(animalId));
    }

    @GetMapping("/{animalId}/export")
    public ResponseEntity<ByteArrayResource> exportAnimalDetails(@PathVariable Long animalId) {
        try {
            String xmlContent = adoptionRequestService.exportAnimalDetails(animalId);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=animal_" + animalId + ".xml")
                    .contentType(MediaType.APPLICATION_XML)
                    .body(new ByteArrayResource(xmlContent.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}