package com.example.demo.service;

import com.example.demo.constants.ProductType;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    // CRUD de bază
    List<Product> getAllProducts();

    Optional<Product> getProductById(Long id);

    Product saveProduct(Product product);

    Product updateProduct(Long id, Product productDetails);

    void deleteProduct(Long id);

    // Metode adiționale
    List<Product> getProductsByType(ProductType productType);

    List<Product> getProductsByPriceRange(double minPrice, double maxPrice);

    List<Product> getProductsByName(String name) throws ApiExceptionResponse;

    List<Product> getProductsByTypeAndMaxPrice(ProductType productType, double maxPrice);

    boolean existsById(Long id);
}