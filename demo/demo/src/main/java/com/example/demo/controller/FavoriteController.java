package com.example.demo.controller;

import com.example.demo.model.Favorite;
import com.example.demo.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<Favorite> addToFavorites(@RequestParam Long userId, @RequestParam Long animalId) {
        Favorite favorite = favoriteService.addToFavorites(userId, animalId);
        return new ResponseEntity<>(favorite, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Void> removeFromFavorites(@RequestParam Long userId, @RequestParam Long animalId) {
        favoriteService.removeFromFavorites(userId, animalId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Favorite>> getUserFavorites(@PathVariable Long userId, Pageable pageable) {
        Page<Favorite> favorites = favoriteService.getUserFavorites(userId, pageable);
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/user/{userId}/animals")
    public ResponseEntity<List<Long>> getUserFavoriteAnimalIds(@PathVariable Long userId) {
        List<Long> animalIds = favoriteService.getUserFavoriteAnimalIds(userId);
        return ResponseEntity.ok(animalIds);
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<Page<Favorite>> getAnimalFavorites(@PathVariable Long animalId, Pageable pageable) {
        Page<Favorite> favorites = favoriteService.getAnimalFavorites(animalId, pageable);
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFavorite(@RequestParam Long userId, @RequestParam Long animalId) {
        boolean isFavorite = favoriteService.isFavorite(userId, animalId);
        return ResponseEntity.ok(isFavorite);
    }

    @GetMapping("/count/user/{userId}")
    public ResponseEntity<Long> countUserFavorites(@PathVariable Long userId) {
        Long count = favoriteService.countUserFavorites(userId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/count/animal/{animalId}")
    public ResponseEntity<Long> countAnimalFavorites(@PathVariable Long animalId) {
        Long count = favoriteService.countAnimalFavorites(animalId);
        return ResponseEntity.ok(count);
    }
}