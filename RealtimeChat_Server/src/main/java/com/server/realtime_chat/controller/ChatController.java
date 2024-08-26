package com.server.realtime_chat.controller;

import com.server.realtime_chat.entity.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.public")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        return message;
    }

}