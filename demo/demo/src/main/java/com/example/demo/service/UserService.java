package com.example.demo.service;

import com.example.demo.dto.UserCreationDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public interface UserService {
    UserDTO addUser(UserCreationDTO user);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    UserDTO updateUser(UserDTO user);

    void deleteUser(Long id);

    UserDTO getUserByName(String name) throws ApiExceptionResponse;

}