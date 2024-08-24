package com.server.realtime_chat.mapper;

import com.server.realtime_chat.dto.request.UserRequestCreate;
import com.server.realtime_chat.dto.response.UserResponse;
import com.server.realtime_chat.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserRequestCreate request);
    UserResponse toDto(User entity);
}
