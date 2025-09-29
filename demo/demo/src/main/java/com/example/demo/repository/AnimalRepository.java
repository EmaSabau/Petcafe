package com.example.demo.repository;

import com.example.demo.constants.AnimalType;
import com.example.demo.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByAnimalType(AnimalType animalType);
    List<Animal> findByNameContainingIgnoreCase(String name);
    @Query("SELECT DISTINCT a.animalType FROM Animal a")
    List<AnimalType> findAllDistinctAnimalTypes();
}