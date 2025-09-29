package com.example.demo.validators;

import com.example.demo.validators.NotWeekendValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NotWeekendValidator.class)
public @interface NotWeekend {
    String message() default "Reservations are not allowed on weekends";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}