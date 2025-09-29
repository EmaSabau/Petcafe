package com.example.demo.service.impl;

import com.example.demo.constants.AnimalType;
import com.example.demo.model.Animal;
import com.example.demo.repository.AnimalRepository;
import com.example.demo.service.AnimalService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;

    public AnimalServiceImpl(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @Override
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    @Override
    public Animal getById(Long id) {
        Optional<Animal> animal = animalRepository.findById(id);
        if (animal.isPresent()) {
            return animal.get();
        }
        throw new NoSuchElementException("Animal with id " + id + " not found");
    }

    @Override
    @Transactional
    public Animal saveAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    @Override
    @Transactional
    public Animal updateAnimal(Long id, Animal animal) {
        Animal existingAnimal = animalRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Animal not found"));

        existingAnimal.setName(animal.getName());
        existingAnimal.setAnimalType(animal.getAnimalType());
        existingAnimal.setAge(animal.getAge());
        existingAnimal.setGender(animal.getGender());
        existingAnimal.setBreed(animal.getBreed());
        existingAnimal.setDescription(animal.getDescription());
        existingAnimal.setImage(animal.getImage());

        return animalRepository.save(existingAnimal);
    }

    @Override
    @Transactional
    public void deleteAnimal(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Animal not found"));
        animalRepository.delete(animal);
    }

    @Override
    public List<Animal> searchAnimalsByName(String name) {
        return animalRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Animal> getAnimalsByType(AnimalType type) {
        return animalRepository.findByAnimalType(type);
    }

    @Override
    public List<AnimalType> getAllAnimalTypes() {
        return animalRepository.findAllDistinctAnimalTypes();
    }
}