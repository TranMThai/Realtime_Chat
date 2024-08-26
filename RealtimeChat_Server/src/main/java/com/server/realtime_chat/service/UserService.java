package com.server.realtime_chat.service;

import com.server.realtime_chat.dto.request.UserRequestCreate;
import com.server.realtime_chat.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> findAll();
    UserResponse findById(Integer id);
    UserResponse create(UserRequestCreate request);
    List<UserResponse> findAllUsersWithoutRoomWithIdUser(Integer id);
}
