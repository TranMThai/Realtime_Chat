package com.server.realtime_chat.service.impl;

import com.server.realtime_chat.entity.Message;
import com.server.realtime_chat.repository.MessageRepository;
import com.server.realtime_chat.service.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    MessageRepository messageRepository;

    @Override
    public Message create(Message message) {
        return messageRepository.save(message);
    }
}
