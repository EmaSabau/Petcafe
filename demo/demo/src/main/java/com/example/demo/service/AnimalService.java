package com.example.demo.service;

import com.example.demo.constants.AnimalType;
import com.example.demo.model.Animal;
import java.util.List;

public interface AnimalService {
    List<Animal> getAllAnimals();
    Animal getById(Long id);
    Animal saveAnimal(Animal animal);
    Animal updateAnimal(Long id, Animal animal);
    void deleteAnimal(Long id);
    List<Animal> searchAnimalsByName(String name);
    List<Animal> getAnimalsByType(AnimalType type);
    List<AnimalType> getAllAnimalTypes();

}