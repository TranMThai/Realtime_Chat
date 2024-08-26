package com.server.realtime_chat.service.impl;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.dto.response.ChatRoomResponse;
import com.server.realtime_chat.entity.ChatRoom;
import com.server.realtime_chat.mapper.ChatRoomMapper;
import com.server.realtime_chat.repository.ChatRoomRepository;
import com.server.realtime_chat.service.ChatRoomService;
import com.server.realtime_chat.service.UserService;
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
    UserService userService;
    ChatRoomMapper chatRoomMapper;

    @Override
    public ChatRoom findById(Long id) {
        return chatRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public List<ChatRoomResponse> findAllByIdUser(Integer id) {
        return chatRoomRepository.findAllByIdUser(id.toString()).stream()
                .map(entity -> {
                    String name = resolveChatPartnerName(entity.getIdUsers(), id);
                    return chatRoomMapper.toDto(entity, name);
                })
                .toList();
    }

    private String resolveChatPartnerName(List<Integer> userIds, Integer currentUserId) {
        if (userIds.size() == 2) {
            Integer otherUserId = userIds.get(0).equals(currentUserId) ? userIds.get(1) : userIds.get(0);
            return userService.findById(otherUserId).getName();
        }
        return "Room";
    }

    @Override
    public ChatRoom create(ChatRoom entity) {
        return chatRoomRepository.save(entity);
    }
}
