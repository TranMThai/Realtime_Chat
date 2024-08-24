package com.server.realtime_chat.service;

import com.server.realtime_chat.dto.request.UserRequestCreate;
import com.server.realtime_chat.dto.response.UserResponse;

public interface UserService {
    UserResponse findById(Integer id);
    UserResponse create(UserRequestCreate request);
}
