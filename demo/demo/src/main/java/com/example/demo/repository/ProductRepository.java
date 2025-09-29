package com.example.demo.repository;

import com.example.demo.constants.ProductType;
import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Metodă pentru a găsi toate produsele de un anumit tip
    List<Product> findByProductType(ProductType productType);

    // Metodă pentru a găsi produse cu preț mai mic sau egal
    List<Product> findByPriceLessThanEqual(double maxPrice);

    // Metodă pentru a găsi produse după nume (conține)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Metodă pentru a găsi produse cu preț între două valori
    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    // Metodă pentru a găsi produse de un anumit tip și cu preț mai mic decât o valoare
    List<Product> findByProductTypeAndPriceLessThan(ProductType productType, double maxPrice);
}