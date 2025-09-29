package com.example.demo.service.impl;

import com.example.demo.model.Favorite;
import com.example.demo.model.FavoriteId;
import com.example.demo.model.User;
import com.example.demo.model.Animal;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.AnimalRepository;
import com.example.demo.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;

    @Override
    public Favorite addToFavorites(Long userId, Long animalId) {
        // Verifică dacă utilizatorul și animalul există
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + animalId));

        // Verifică dacă nu este deja favorit
        if (favoriteRepository.existsByUserIdAndAnimalId(userId, animalId)) {
            throw new RuntimeException("Animal is already in favorites");
        }

        Favorite favorite = Favorite.builder()
                .userId(userId)
                .animalId(animalId)
                .user(user)
                .animal(animal)
                .build();

        return favoriteRepository.save(favorite);
    }

    @Override
    public void removeFromFavorites(Long userId, Long animalId) {
        if (!favoriteRepository.existsByUserIdAndAnimalId(userId, animalId)) {
            throw new RuntimeException("Favorite not found");
        }
        favoriteRepository.deleteByUserIdAndAnimalId(userId, animalId);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Favorite> getUserFavorites(Long userId, Pageable pageable) {
        return favoriteRepository.findByUserId(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Favorite> getAnimalFavorites(Long animalId, Pageable pageable) {
        return favoriteRepository.findByAnimalId(animalId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isFavorite(Long userId, Long animalId) {
        return favoriteRepository.existsByUserIdAndAnimalId(userId, animalId);
    }

    @Override
    @Transactional(readOnly = true)
    public Long countUserFavorites(Long userId) {
        return favoriteRepository.countByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Long countAnimalFavorites(Long animalId) {
        return favoriteRepository.countByAnimalId(animalId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Long> getUserFavoriteAnimalIds(Long userId) {
        return favoriteRepository.findAnimalIdsByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Favorite> getFavoritesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return favoriteRepository.findByCreatedAtBetween(startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Favorite> getUserFavoritesOrderedByDate(Long userId) {
        return favoriteRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}