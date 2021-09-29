package com.example.eshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.eshop.domain.Product;
import com.example.eshop.repository.ProductRepository;

@Service
public class HomeService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public Iterable<Product> fetchAll() {
		return productRepository.findAll();
	}
	
	public String deleteItem(Integer id){
		productRepository.deleteById(id);
		return "Deleted successfully";
	}
	
	public String addItem(Product product) {
		productRepository.save(product);
		return "Added successfully";
	}
	
	public String userLogin(String username, String password) {
		return "logged in";
		
	}
//	public void createNewChair() {
//		Product chair = new Product();
//		
//		chair.set
//		
//	}

}
