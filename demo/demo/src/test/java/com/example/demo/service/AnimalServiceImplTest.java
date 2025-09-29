package com.example.demo.service;

import com.example.demo.constants.AnimalType;
import com.example.demo.model.Animal;
import com.example.demo.repository.AnimalRepository;
import com.example.demo.service.impl.AnimalServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AnimalServiceImplTest {

    @Mock
    private AnimalRepository animalRepository;

    @InjectMocks
    private AnimalServiceImpl animalService;

    @Test
    public void testGetAllAnimals() {
        // Arrange
        Animal animal1 = Animal.builder()
                .id(1L)
                .name("Rex")
                .animalType(AnimalType.DOG)
                .age(3)
                .gender("MALE")
                .breed("Golden Retriever")
                .description("Friendly dog")
                .image("/rex.jpg")
                .build();

        Animal animal2 = Animal.builder()
                .id(2L)
                .name("Luna")
                .animalType(AnimalType.CAT)
                .age(2)
                .gender("FEMALE")
                .breed("British Shorthair")
                .description("Calm cat")
                .image("/luna.jpg")
                .build();

        when(animalRepository.findAll()).thenReturn(Arrays.asList(animal1, animal2));

        // Act
        List<Animal> result = animalService.getAllAnimals();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Rex", result.get(0).getName());
        assertEquals(AnimalType.DOG, result.get(0).getAnimalType());
        assertEquals("Luna", result.get(1).getName());
        verify(animalRepository, times(1)).findAll();
    }

    @Test
    public void testGetAnimalById_Success() {
        // Arrange
        Long animalId = 1L;
        Animal expectedAnimal = Animal.builder()
                .id(animalId)
                .name("Rex")
                .animalType(AnimalType.DOG)
                .age(3)
                .gender("MALE")
                .breed("Golden Retriever")
                .description("Friendly dog")
                .image("/rex.jpg")
                .build();

        when(animalRepository.findById(animalId)).thenReturn(Optional.of(expectedAnimal));

        // Act
        Animal result = animalService.getById(animalId);

        // Assert
        assertNotNull(result);
        assertEquals(animalId, result.getId());
        assertEquals("Rex", result.getName());
        assertEquals(AnimalType.DOG, result.getAnimalType());
        verify(animalRepository, times(1)).findById(animalId);
    }
}