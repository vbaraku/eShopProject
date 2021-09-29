package com.example.eshop.security;

public class UsernameAndPasswordAuthenticationRequest {
	private String email;
	public UsernameAndPasswordAuthenticationRequest() {
		super();
	}
	public UsernameAndPasswordAuthenticationRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	private String password;
}