package com.example.demo.repository;

import com.example.demo.model.Favorite;
import com.example.demo.model.FavoriteId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {

    Page<Favorite> findByUserId(Long userId, Pageable pageable);

    Page<Favorite> findByAnimalId(Long animalId, Pageable pageable);

    List<Favorite> findByUserId(Long userId);

    boolean existsByUserIdAndAnimalId(Long userId, Long animalId);

    Long countByUserId(Long userId);

    Long countByAnimalId(Long animalId);

    void deleteByUserIdAndAnimalId(Long userId, Long animalId);

    @Query("SELECT f.animalId FROM Favorite f WHERE f.userId = :userId")
    List<Long> findAnimalIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT f FROM Favorite f WHERE f.createdAt BETWEEN :startDate AND :endDate")
    List<Favorite> findByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT f FROM Favorite f WHERE f.userId = :userId ORDER BY f.createdAt DESC")
    List<Favorite> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
}