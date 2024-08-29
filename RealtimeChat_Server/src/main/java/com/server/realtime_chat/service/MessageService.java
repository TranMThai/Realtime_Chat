package com.server.realtime_chat.service;

import com.server.realtime_chat.dto.response.MessageResponse;
import com.server.realtime_chat.entity.Message;

import java.util.List;

public interface MessageService {
    Message create(Message message);

    List<MessageResponse> findAllMessageByIdRoom(Long id, String token);
}
