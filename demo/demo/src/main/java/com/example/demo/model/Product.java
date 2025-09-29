package com.example.demo.model;

import com.example.demo.constants.ProductType;
import lombok.*;

import jakarta.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products") // Opțional - specifică numele tabelului în baza de date
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Recomandat Long în loc de long pentru compatibilitate cu JPA

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double price;

    @Enumerated(EnumType.STRING) // Pentru a stoca numele enumului, nu valoarea ordinală
    @Column(nullable = false)
    private ProductType productType;

    @Column(name = "image_url") // Denumire mai descriptivă în baza de date
    private String image; // URL
}