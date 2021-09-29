package com.example.eshop.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.eshop.domain.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

}
