package com.server.realtime_chat.service.impl;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.config.security.AuthenticationService;
import com.server.realtime_chat.config.socket.WebSocketService;
import com.server.realtime_chat.dto.response.MessageResponse;
import com.server.realtime_chat.entity.ChatRoom;
import com.server.realtime_chat.entity.Message;
import com.server.realtime_chat.entity.User;
import com.server.realtime_chat.mapper.MessageMapper;
import com.server.realtime_chat.repository.ChatRoomRepository;
import com.server.realtime_chat.repository.MessageRepository;
import com.server.realtime_chat.service.ChatRoomService;
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

    WebSocketService webSocketService;
    AuthenticationService authenticationService;
    MessageRepository messageRepository;
    ChatRoomRepository chatRoomRepository;
    MessageMapper messageMapper;
    ChatRoomService chatRoomService;

    @Override
    public Message create(Message message) {
        chatRoomRepository.findById(message.getChatRoom().getId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        message.setIsSeen(false);
        Message save = messageRepository.save(message);
        messageRepository.flush();
        Message response = messageRepository.findById(save.getId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        notification(response);
        return response;
    }

    @Override
    public List<MessageResponse> findAllMessageByIdRoom(Long id, String token) {
        User user = authenticationService.decodeToUser(token);
        ChatRoom chatRoom = chatRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        if (!chatRoom.getIdUsers().contains(user.getId())) {
            throw new AppException(ErrorCode.AUTHENTICATION_FAILED);
        }
        return messageRepository.findAllByIdRoom(id).stream()
                .map(messageMapper::toDto)
                .toList();
    }

    private void notification(Message message) {
        List<Integer> idReceivers = message.getChatRoom().getIdUsers().stream()
                .filter(id -> !id.equals(message.getIdSender()))
                .toList();
        for (Integer id : idReceivers) {
            webSocketService.responseRealtime("/user/" + id, chatRoomService.findAllByIdUser(id));
        }
    }
}
