package com.eproducts.demo.services;

import com.eproducts.demo.entities.Product;

import java.util.List;

public interface ProductServices {
    List<Product> findAll();
    Product findById(Long id);
    Product save (Product p);
}
