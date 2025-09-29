package com.example.demo.service.impl;

import com.example.demo.dto.AuthDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Component
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User login(AuthDTO auth) {
        User user = userRepository.findByUsername(auth.getUsername());
        if (user == null || !passwordEncoder.matches(auth.getPassword(), user.getPassword())) {
            throw new NoSuchElementException("User not found");
        }
        return user;
    }
}