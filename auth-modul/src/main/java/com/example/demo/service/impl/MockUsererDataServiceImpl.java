package com.example.demo.service.impl;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import net.datafaker.Faker;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class MockUsererDataServiceImpl {
    private final Faker faker = new Faker();
    private final Random random = new Random();

    private final UserRepository userRepository;

    public MockUsererDataServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        generateMockOwnerData();
    }

    public void generateMockOwnerData() {
        List<User> users = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            User user = new User();
            user.setId(random.nextLong(1,100));
            //user.setUsername(faker.internet().username());
            user.setPassword(faker.internet().password());
            users.add(user);
            System.out.println(user);
        }

        User user = new User();
        user.setId(101L);
       // user.setUsername("test");
        user.setPassword("test");
        users.add(user);

        userRepository.saveAll(users);
    }
}

