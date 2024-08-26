package com.server.realtime_chat.service;

import com.server.realtime_chat.dto.request.ChatRoomRequest;
import com.server.realtime_chat.dto.response.ChatRoomResponse;
import com.server.realtime_chat.dto.response.MessageResponse;
import com.server.realtime_chat.entity.ChatRoom;

import java.util.List;

public interface ChatRoomService {
    ChatRoom findById(Long id);
    List<ChatRoomResponse> findAllByIdUser(Integer id);
    ChatRoomResponse create(ChatRoomRequest request);
}
