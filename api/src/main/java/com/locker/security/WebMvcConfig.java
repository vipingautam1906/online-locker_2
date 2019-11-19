package com.locker.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Spring Interceptor registering class. we have used that to register our Security
 * Interceptor here.
 * our interceptor will be injected in this yourInjectedInterceptor field
 * and we will put that in register via addInterceptor method
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Autowired
    HandlerInterceptor yourInjectedInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(yourInjectedInterceptor);
    }
}