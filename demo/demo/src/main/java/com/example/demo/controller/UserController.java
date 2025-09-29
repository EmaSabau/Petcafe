package com.example.demo.controller;

import com.example.demo.dto.UserCreationDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Fetch all users",
            description = "Fetches all user entities")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation")
    })
    @GetMapping
    public ResponseEntity findAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity findUserById(@Parameter(required = true, description = "The id of the user") @PathVariable Long id) throws NoSuchElementException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> findUserByName(
            @Parameter(required = true, description = "The name of the user")
            @PathVariable String name
    ) {
        try {
            UserDTO user = userService.getUserByName(name);
            return ResponseEntity.ok(user);
        } catch (ApiExceptionResponse e) {
            return ResponseEntity
                    .status(e.getStatus())
                    .body(Map.of(
                            "message", e.getMessage(),
                            "errors", e.getErrors()
                    ));
        }
    }

    @PostMapping
    public ResponseEntity saveNewUser(@RequestBody UserCreationDTO user) {
        // Note: You need to implement addUser method in UserService
        // return ResponseEntity.status(HttpStatus.OK).body(userService.addUser(user));

        // For now, returning a placeholder response
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("Method not implemented in UserService");
    }

    @PutMapping
    public ResponseEntity updateUser(@RequestBody UserDTO user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Successful operation");
    }
}