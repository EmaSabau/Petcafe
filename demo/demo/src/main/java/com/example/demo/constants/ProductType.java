package com.example.demo.constants;

import java.util.List;
public enum ProductType {
    COFFEE,
    TEA,
    DESSERT;
    private static final List<ProductType> VALUES = List.of(values());
}
