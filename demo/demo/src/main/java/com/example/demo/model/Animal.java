package com.example.demo.model;

import com.example.demo.constants.AnimalType;
import jakarta.validation.constraints.Max;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.*;

import jakarta.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@XmlRootElement
@Table(name = "animals")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalType animalType;

    @Max(value=20)
    private Integer age;

    private String gender;

    private String breed;

    @Column(length = 1000)
    private String description;

    @Column(name="location")
    private String location;

    @Column(name = "image_url")
    private String image;
}