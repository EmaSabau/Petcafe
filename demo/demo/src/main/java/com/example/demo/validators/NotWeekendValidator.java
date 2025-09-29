package com.example.demo.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.DayOfWeek;
import java.time.LocalDateTime;

public class NotWeekendValidator implements ConstraintValidator<NotWeekend, LocalDateTime> {
    @Override
    public boolean isValid(LocalDateTime date, ConstraintValidatorContext context) {
        if (date == null) return true;
        return !date.getDayOfWeek().equals(DayOfWeek.SATURDAY)
                && !date.getDayOfWeek().equals(DayOfWeek.SUNDAY);
    }
}