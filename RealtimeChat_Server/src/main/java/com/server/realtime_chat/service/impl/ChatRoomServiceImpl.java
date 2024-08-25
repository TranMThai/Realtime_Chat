package com.server.realtime_chat.service.impl;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.entity.ChatRoom;
import com.server.realtime_chat.repository.ChatRoomRepository;
import com.server.realtime_chat.service.ChatRoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    ChatRoomRepository chatRoomRepository;

    @Override
    public ChatRoom findByIdUser(Integer first, Integer second) {
        List<Integer> ids = new ArrayList<>();
        ids.add(first);
        ids.add(second);
        return chatRoomRepository.findByIdUser(ids)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public ChatRoom create(ChatRoom entity) {
        return null;
    }
}
