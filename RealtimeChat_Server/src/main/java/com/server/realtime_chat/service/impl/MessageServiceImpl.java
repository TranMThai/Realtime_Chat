package com.server.realtime_chat.service.impl;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.dto.response.MessageResponse;
import com.server.realtime_chat.entity.Message;
import com.server.realtime_chat.mapper.MessageMapper;
import com.server.realtime_chat.repository.ChatRoomRepository;
import com.server.realtime_chat.repository.MessageRepository;
import com.server.realtime_chat.service.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    MessageRepository messageRepository;
    ChatRoomRepository chatRoomRepository;
    MessageMapper messageMapper;

    @Override
    public Message create(Message message) {
        chatRoomRepository.findById(message.getChatRoom().getId())
                .orElseThrow(()-> new AppException(ErrorCode.NOT_FOUND));
        return messageRepository.save(message);
    }

    @Override
    public List<MessageResponse> findAllMessageByIdRoom(Long id) {
        return messageRepository.findAllByIdRoom(id).stream()
                .map(messageMapper::toDto)
                .toList();
    }
}
