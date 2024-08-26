package com.server.realtime_chat.controller;

import com.server.realtime_chat.entity.ChatRoom;
import com.server.realtime_chat.entity.Message;
import com.server.realtime_chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat.sendMessage/{roomId}")
    public void sendMessage(@DestinationVariable String roomId,
                            @Payload Message message) {
        messagingTemplate.convertAndSend("/room/" + roomId, message);
        message.setChatRoom(ChatRoom.builder()
                .id(Long.valueOf(roomId))
                .build());
        messageService.create(message);
    }

}