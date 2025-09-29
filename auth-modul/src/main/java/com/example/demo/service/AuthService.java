package com.example.demo.service;

import com.example.demo.dto.AuthDTO;
import com.example.demo.model.User;

public interface AuthService {
    /**
     * Method used for login
     *
     * @param auth the auth object
     * @return the owner for a succesfull login, null otherwise
     */
    User login(AuthDTO auth);
}
