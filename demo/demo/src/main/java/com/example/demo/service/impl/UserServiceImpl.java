package com.example.demo.service.impl;

import com.example.demo.dto.UserCreationDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final SimpMessagingTemplate template;
    private final PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, SimpMessagingTemplate template) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.template = template;
    }

    @Override
    public UserDTO addUser(UserCreationDTO userCreationDTO) {
        User user = UserMapper.toCreationEntity(userCreationDTO);
        UserDTO userDTO = UserMapper.toDto(userRepository.save(user));
        return userDTO;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return UserMapper.toDtoList((List<User>) userRepository.findAll());
    }

    @Override
    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return UserMapper.toDto(user.get());
        }
        throw new NoSuchElementException("User with id " + id + "not found");
    }

    @Override
    public UserDTO updateUser(UserDTO user) {
        return UserMapper.toDto(userRepository.save(UserMapper.toEntity(user)));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO getUserByName(String name) throws ApiExceptionResponse {
        User user = userRepository.findFirstByName(name);
        if (user != null) {
            return UserMapper.toDto(user);
        }
        throw ApiExceptionResponse.builder()
                .errors(Collections.singletonList("No User with name " + name))
                .message("Entity not found")
                .status(HttpStatus.NOT_FOUND)
                .build();
    }
}