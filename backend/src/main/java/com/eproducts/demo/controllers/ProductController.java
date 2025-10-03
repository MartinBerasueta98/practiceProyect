package com.eproducts.demo.controllers;

import com.eproducts.demo.entities.Product;
import com.eproducts.demo.services.ProductServices;
import com.eproducts.demo.services.ProductServicesManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductServicesManager productServicesManager;
    @GetMapping
    List<Product> findAllProduct(){
        return productServicesManager.findAll();
    }
    @PostMapping
    public Product save(@RequestBody Product p){
        return this.productServicesManager.save(p);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public Product getByIdProduct(@PathVariable Long id){
        return this.productServicesManager.findById(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Product p){
        Optional <Product> prod = Optional.of(this.productServicesManager.findById(id));
        if(prod.isPresent()){
            Product nProd = prod.get();
            nProd.setName(p.getName());
            nProd.setBarCode(p.getBarCode());
            nProd.setDescription(p.getDescription());
            nProd.setPriceSale(p.getPriceSale());
            nProd.setPurchasePrice(p.getPurchasePrice());
            nProd.setImageUrl(p.getImageUrl());
            nProd.setStock(p.getStock());
            nProd.setCategory(p.getCategory());
            nProd.setCategory(p.getCategory());
            nProd.setProfitPercentage(p.getProfitPercentage());
            nProd.setUpdatedAt(p.getUpdatedAt());
            nProd.setActive(p.getActive());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.productServicesManager.update(id, nProd));
        }
        return ResponseEntity.notFound().build();
    }
}
