package com.example.demo.repository;

import com.example.demo.model.User;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository {
    private List<User> users = new ArrayList<>();
    private final PasswordEncoder passwordEncoder;

    public UserRepository(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User findByUsernameAndPassword(String username, String password) {
        return users.stream()
                .filter(User -> User.getUsername().equals(username) && User.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }

    public User findByUsername(String username) {
        return users.stream()
                .filter(User -> User.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }

    public void saveAll(List<User> newUsers) {
        users.addAll(newUsers);

    }











    @PostConstruct
    public void init() {
        users.addAll(List.of(
                new User(1L, "ema.admin", passwordEncoder.encode("parola")),
                new User(2L, "test.admin", passwordEncoder.encode("123")),
                new User(4L, "ema", passwordEncoder.encode("ceva")),
                new User(3L, "test", passwordEncoder.encode("test"))
        ));
    }

}