package com.example.demo.validators;

import com.example.demo.constants.Status;
import com.example.demo.repository.AdoptionRequestRepository;
import com.example.demo.validators.MaxAdoptions;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class MaxAdoptionsValidator implements ConstraintValidator<MaxAdoptions, Long> {
    @Autowired
    private AdoptionRequestRepository adoptionRequestRepository;

    @Override
    public boolean isValid(Long userId, ConstraintValidatorContext context) {
        if (userId == null) return true;
        int count = adoptionRequestRepository.countByUserIdAndStatus(userId, Status.CONFIRMED);
        return count < 3;
    }
}