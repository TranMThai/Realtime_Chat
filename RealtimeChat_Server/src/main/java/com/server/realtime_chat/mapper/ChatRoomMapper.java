package com.server.realtime_chat.mapper;

import com.server.realtime_chat.dto.request.ChatRoomRequest;
import com.server.realtime_chat.dto.response.ChatRoomResponse;
import com.server.realtime_chat.entity.ChatRoom;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    default ChatRoomResponse toDto(ChatRoom entity, String nameReceiver, Integer unseenMessageCount, Integer lastSender) {
        return ChatRoomResponse.builder()
                .id(entity.getId())
                .idUsers(entity.getIdUsers())
                .nameReceiver(nameReceiver)
                .lastMessage(getLastMessage(entity))
                .unseenMessageCount(unseenMessageCount)
                .idLastSender(lastSender)
                .build();
    }

    ChatRoom toEntity(ChatRoomRequest request);

    default String getLastMessage(ChatRoom entity) {
        try {
            int size = entity.getMessages().size();
            if (size > 0) {
                return entity.getMessages()
                        .get(entity.getMessages().size() - 1)
                        .getContent();
            }
        } catch (Exception e) {
        }
        return null;
    }
}
