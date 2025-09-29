package com.example.demo.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MaxAdoptionsValidator.class)
public @interface MaxAdoptions {
    int value() default 3;
    String message() default "User has reached the maximum number of adoptions";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}