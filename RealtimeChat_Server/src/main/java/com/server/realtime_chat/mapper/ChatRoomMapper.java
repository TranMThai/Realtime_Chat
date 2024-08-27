package com.server.realtime_chat.mapper;

import com.server.realtime_chat.dto.request.ChatRoomRequest;
import com.server.realtime_chat.dto.response.ChatRoomResponse;
import com.server.realtime_chat.entity.ChatRoom;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    default ChatRoomResponse toDto(ChatRoom entity, String nameReceiver) {
        return ChatRoomResponse.builder()
                .id(entity.getId())
                .idUsers(entity.getIdUsers())
                .nameReceiver(nameReceiver)
                .lastMessage(getLastMessage(entity))
                .build();
    }

    ChatRoom toEntity(ChatRoomRequest request);

    default String getLastMessage(ChatRoom entity) {
        int size = entity.getMessages().size();
        if (size > 0) {
            return entity.getMessages()
                    .get(entity.getMessages().size() - 1)
                    .getContent();
        }
        return null;
    }
}
