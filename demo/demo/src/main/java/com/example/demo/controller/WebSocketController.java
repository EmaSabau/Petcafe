package com.example.demo.controller;

import com.example.demo.model.AdoptionRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyStatusChange(AdoptionRequest adoptionRequest) {
        String destination = "/topic/status/" + adoptionRequest.getUser().getId();
        messagingTemplate.convertAndSend(destination, adoptionRequest);
    }
}