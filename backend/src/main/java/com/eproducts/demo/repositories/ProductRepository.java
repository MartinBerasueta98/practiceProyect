package com.eproducts.demo.repositories;

import com.eproducts.demo.entities.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
