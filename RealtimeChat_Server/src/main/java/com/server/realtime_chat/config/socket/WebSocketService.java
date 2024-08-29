package com.server.realtime_chat.config.socket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class WebSocketService {

    SimpMessagingTemplate messagingTemplate;

    public <T> void responseRealtime(String url, T responses) {
        try {
            messagingTemplate.convertAndSend(url, responses);
        } catch (MessageDeliveryException e) {
        }
    }
}
