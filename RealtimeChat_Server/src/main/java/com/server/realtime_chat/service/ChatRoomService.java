package com.server.realtime_chat.service;

import com.server.realtime_chat.entity.ChatRoom;

public interface ChatRoomService {
    ChatRoom findByIdUser(Integer first, Integer second);
    ChatRoom create(ChatRoom entity);
}
