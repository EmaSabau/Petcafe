package com.example.demo.service.impl;

import com.example.demo.constants.ProductType;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();

            // Actualizare atribute
            existingProduct.setName(productDetails.getName());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setProductType(productDetails.getProductType());
            existingProduct.setImage(productDetails.getImage());

            return productRepository.save(existingProduct);
        } else {
            // Throw exception sau returnează null, în funcție de preferință
            throw new RuntimeException("Product not found with id: " + id);
        }
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByType(ProductType productType) {
        return productRepository.findByProductType(productType);
    }

    @Override
    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    @Override
    public List<Product> getProductsByName(String productName) throws ApiExceptionResponse {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(productName);
        if (products.isEmpty()) {
            throw ApiExceptionResponse.builder()
                    .message("No products found containing: " + productName)
                    .status(HttpStatus.NOT_FOUND)
                    .errors(Collections.singletonList("PRODUCT_NOT_FOUND"))
                    .build();
        }
        return products;
    }

    @Override
    public List<Product> getProductsByTypeAndMaxPrice(ProductType productType, double maxPrice) {
        return productRepository.findByProductTypeAndPriceLessThan(productType, maxPrice);
    }

    @Override
    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }
}