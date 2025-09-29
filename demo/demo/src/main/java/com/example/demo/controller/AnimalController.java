package com.example.demo.controller;

import com.example.demo.constants.AnimalType;
import com.example.demo.model.Animal;
import com.example.demo.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    // GET: Returnează toate animalele
    @GetMapping("/animals")
    public ResponseEntity<List<Animal>> getAllAnimals() {
        List<Animal> animals = animalService.getAllAnimals();
        System.out.println(animals); // Verifică ce date sunt returnate
        return ResponseEntity.ok(animals);
    }

    // GET: Returnează un animal după ID
    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.getById(id));
    }

    // GET: Returnează animale după tip (câine/pisică/etc)
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Animal>> getAnimalsByType(@PathVariable AnimalType type) {
        return ResponseEntity.ok(animalService.getAnimalsByType(type));
    }

    // GET: Returnează toate tipurile disponibile de animale
    @GetMapping("/types")
    public ResponseEntity<List<AnimalType>> getAllAnimalTypes() {
        return ResponseEntity.ok(animalService.getAllAnimalTypes());
    }

    // POST: Adaugă un nou animal
    @PostMapping
    public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(animalService.saveAnimal(animal));
    }

    // PUT: Actualizează un animal existent
    @PutMapping("/{id}")
    public ResponseEntity<Animal> updateAnimal(
            @PathVariable Long id,
            @RequestBody Animal updatedAnimal) {
        return ResponseEntity.ok(animalService.updateAnimal(id, updatedAnimal));
    }

    // DELETE: Șterge un animal după ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
        return ResponseEntity.noContent().build();
    }

    // GET: Filtrare avansată
    @GetMapping("/filter")
    public ResponseEntity<List<Animal>> filterAnimals(
            @RequestParam(required = false) AnimalType type,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) String breed) {

        if (type != null) {
            return ResponseEntity.ok(animalService.getAnimalsByType(type));
        }
        // Poți adăuga aici alte criterii de filtrare
        return ResponseEntity.ok(animalService.getAllAnimals());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Animal>> searchAnimals(
            @RequestParam String name) {
        return ResponseEntity.ok(animalService.searchAnimalsByName(name));
    }

    // Exception handler pentru cazurile în care animalul nu este găsit
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNotFound(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    // Exception handler pentru validări
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}