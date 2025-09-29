package com.example.demo.service;

import com.example.demo.model.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface FavoriteService {

    Favorite addToFavorites(Long userId, Long animalId);

    void removeFromFavorites(Long userId, Long animalId);

    Page<Favorite> getUserFavorites(Long userId, Pageable pageable);

    Page<Favorite> getAnimalFavorites(Long animalId, Pageable pageable);

    boolean isFavorite(Long userId, Long animalId);

    Long countUserFavorites(Long userId);

    Long countAnimalFavorites(Long animalId);

    List<Long> getUserFavoriteAnimalIds(Long userId);

    List<Favorite> getFavoritesByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    List<Favorite> getUserFavoritesOrderedByDate(Long userId);
}