package com.example.demo.controller;

import com.example.demo.constants.ProductType;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET toate produsele
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        System.out.println("GET /products endpoint hit!");
        List<Product> products = productService.getAllProducts();
        System.out.println("Returning " + products.size() + " products");
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // GET un produs după ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // POST - creează un produs nou
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    // PUT - actualizează un produs existent
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - șterge un produs după ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productService.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // GET - filtrează produsele după tip
    @GetMapping("/type/{productType}")
    public ResponseEntity<List<Product>> getProductsByType(@PathVariable ProductType productType) {
        List<Product> products = productService.getProductsByType(productType);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // GET - filtrează produsele după interval de preț
    @GetMapping("/price-range")
    public ResponseEntity<List<Product>> getProductsByPriceRange(
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        List<Product> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // GET - caută produse după nume (conține)
    @GetMapping("/search")
    public ResponseEntity<?> searchProductsByName(@RequestParam String name) {
        try {
            List<Product> products = productService.getProductsByName(name);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (ApiExceptionResponse ex) {
            return ResponseEntity
                    .status(ex.getStatus())
                    .body(ex);
        }
    }

    // GET - filtrează produsele după tip și preț maxim
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getProductsByTypeAndMaxPrice(
            @RequestParam ProductType productType,
            @RequestParam double maxPrice) {
        List<Product> products = productService.getProductsByTypeAndMaxPrice(productType, maxPrice);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}