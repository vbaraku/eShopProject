package com.example.eshop.controller;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.apache.http.client.fluent.Form;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.domain.Product;
import com.example.eshop.repository.ProductRepository;
import com.example.eshop.service.HomeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
	
	@Autowired
	private HomeService homeService;
	
	@GetMapping(path = "/")
	public Iterable<Product> getIndex() {
		//model.addAttribute("products", homeService.fetchAll());
		 return homeService.fetchAll();
	}
	
	@CrossOrigin("*")
	@PostMapping("/manage")
	public String postBody(@RequestBody Product product	){

		return homeService.addItem(product);	
	}
	
	@CrossOrigin("*")
	@DeleteMapping(path = "/manage/{id}")
	public String deleteItem(@PathVariable Integer id) {
		 return homeService.deleteItem(id);
	}
	
	@Autowired
	private ProductRepository productRepository;
	
	@CrossOrigin("*")
	@PutMapping("/manage/{productId}")
	public Optional<Object> updateItem(@RequestBody Product productDetails, @PathVariable Integer productId) {
		 
		return productRepository.findById(productId)
	      .map(product -> {
	        product.setName(productDetails.getName());
	        product.setPrice(productDetails.getPrice());
	        product.setImg(productDetails.getImg());
	        return productRepository.save(product);
	      });
	}
	
	@CrossOrigin("*")
	@PostMapping("/status")
	public  void postBody( HttpServletRequest request){
		boolean successfull = "00".equals(request.getParameter("responseCode"));
		if(successfull) {
			System.out.println("Successfull!!!") ;
			System.out.println(request.toString()) ;
		}
		else
			System.out.println("NOT Successfull!!!") ;
		System.out.println(request.getParameter("responseCode")) ;
			
	}
	
	@RequestMapping(path = "/sessiontoken", method = RequestMethod.GET)
	public  ResponseEntity<String> sessiontToken(
			@RequestParam(name = "amount", required = true) String amount) {

		try {
			HttpResponse response = Request.Post("https://test.merchantsafeunipay.com/msu/api/v2")
					.addHeader("Accept", "application/json")
					.bodyForm((Iterable) Form.form().add("ACTION", "SESSIONTOKEN").add("MERCHANT", "testmerchant")
							.add("MERCHANTUSER", "apiuser@testmerchant.com").add("MERCHANTPASSWORD", "Pluto321`")
							.add("SESSIONTYPE", "PAYMENTSESSION").add("AMOUNT", String.valueOf(amount))
							.add("MERCHANTPAYMENTID", "LC-" + new Date().getTime()).add("CURRENCY", "USD")
							.add("RETURNURL", "http://localhost:8082/status")
							.add("CUSTOMER", "LC-Customer").add("CUSTOMERNAME", "LC Customer")
							.add("CUSTOMEREMAIL", "lc@gmail.com").add("CUSTOMERIP", "127.0.0.1")
							.add("CUSTOMERPHONE", "+38349123321")
							.add("CUSTOMERUSERAGENT",
									"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0")
							.add("NAMEONCARD", "LC Card").add("LANGUAGE", "EN").build())
					.execute().returnResponse();
			String responseBody = EntityUtils.toString(response.getEntity(), "UTF-8");
			JSONParser parser = new JSONParser();
			JSONObject responseParsed = (JSONObject) parser.parse(responseBody);
			return new ResponseEntity<String>(responseParsed.getOrDefault("sessionToken", "").toString(),
					HttpStatus.OK);
		} catch (IOException | ParseException e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
