package com.example.demo.mapper;

import com.example.demo.dto.UserCreationDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {
    public static User toEntity(UserDTO dto) {
        return User.builder()
                .name(dto.getName())
                .id(dto.getId())
                .build();
    }

    public static UserDTO toDto(User user) {
        return UserDTO.builder()
                .name(user.getName())
                .id(user.getId())
                .build();
    }

    public static List<UserDTO> toDtoList(List<User> UserList) {
        return UserList.stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    public static User toCreationEntity(UserCreationDTO dto) {
        return User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .build();
    }
}