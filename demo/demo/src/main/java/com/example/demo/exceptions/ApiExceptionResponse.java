package com.example.demo.exceptions;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@JsonIgnoreProperties(value = {"stackTrace", "suppressed", "cause", "localizedMessage"})
public class ApiExceptionResponse extends Exception {
    private final HttpStatus status;
    private final List<String> errors;
    private final String entityType; // "user" sau "product"
    private final String searchCriteria; // "name" sau "id"

    @Builder
    public ApiExceptionResponse(String message, HttpStatus status,
                                List<String> errors, String entityType,
                                String searchCriteria) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.entityType = entityType;
        this.searchCriteria = searchCriteria;
    }
}