package com.example.eshop.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;

import org.springframework.security.config.http.SessionCreationPolicy;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
//	@Autowired
//    private final UserService UserService;
//
//    public SecurityConfig(com.example.eshop.service.UserService userService) {
//		UserService = userService;
//	}

	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("guest").password("{noop}guest").roles("GUEST")
                .and()
                .withUser("admin").password("{noop}admin").roles("ADMIN", "GUEST");
    }
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        source.registerCorsConfiguration("/manage/**", configuration);
        source.registerCorsConfiguration("/login", configuration);
        source.registerCorsConfiguration("/status", configuration);
        return source;
    }

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.cors().configurationSource(corsConfigurationSource()).and().csrf().disable().sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager()))
        .addFilterAfter(new JwtTokenVerifier(),JwtUsernameAndPasswordAuthenticationFilter.class).
        authorizeRequests().antMatchers(HttpMethod.GET, "/manage", "/manage/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.POST, "/manage", "/manage/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.PUT, "/manage", "/manage/**").hasRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/manage", "/manage/**").hasRole("ADMIN");
	}

}