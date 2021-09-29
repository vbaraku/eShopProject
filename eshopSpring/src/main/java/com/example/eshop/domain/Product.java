package com.example.eshop.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Table(name = "PRODUCT")
@Entity
public class Product {
	
	@Id
	//@SequenceGenerator(name = "collabuser_sequence", sequenceName = "chair_sequence", allocationSize = 1) , generator = "chair_sequence"
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "PRICE")
	private Float price;

	@Column(name = "IMG")
	private String img;

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Float getPrice() {
		return price;
	}

	public Product() {
	}

	public Product(Integer id, String name, Float price, String img) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.img = img;
	}

	public void setPrice(Float price) {
		this.price = price;
	}
	
	public Product(String name, Float price, String img) {
		this.name = name;
		this.price = price;
		this.img = img;
	}
}
