package com.eproducts.demo.services;

import com.eproducts.demo.entities.Product;
import com.eproducts.demo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServicesManager implements ProductServices{
    @Autowired
    private ProductRepository productRepository;
    @Override
    public List<Product> findAll() {
        return (List<Product>) this.productRepository.findAll();///select * from Product (ESTO ES, LO QUE EN TEORIA, HACE)
    }

    @Override
    public Product findById(Long id) {
        Optional<Product> p = this.productRepository.findById(id); ///Proteje el retorno, lo que nunca sera NULL,  findById retorna un Optional, .get es un metodo de Optional que retorna el dato que esta embebido dentro del Optional
        return p.get();
        /*
        SIMPLIFICADO:
        return this.productRepository.findById(id).get();
         */
    }

    @Override
    public Product save(Product p) {
        return this.productRepository.save(p);
    }

    public Product update(Long id, Product p){
        Product prod = this.productRepository.findById(id).get();
        prod.setName(p.getName());
        prod.setBarCode(p.getBarCode());
        prod.setDescription(p.getDescription());
        prod.setPriceSale(p.getPriceSale());
        prod.setPurchasePrice(p.getPurchasePrice());
        prod.setImageUrl(p.getImageUrl());
        prod.setStock(p.getStock());
        prod.setCategory(p.getCategory());
        prod.setProfitPercentage(p.getProfitPercentage());
        prod.setUpdatedAt(p.getUpdatedAt());
        prod.setActive(p.getActive());
        return this.productRepository.save(prod);
    }
}
