package com.server.realtime_chat.mapper;

import com.server.realtime_chat.dto.request.UserRequestCreate;
import com.server.realtime_chat.dto.response.MessageResponse;
import com.server.realtime_chat.dto.response.UserResponse;
import com.server.realtime_chat.entity.Message;
import com.server.realtime_chat.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    MessageResponse toDto(Message entity);
}
