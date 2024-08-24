package com.server.realtime_chat.service.impl;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.dto.request.UserRequestCreate;
import com.server.realtime_chat.dto.response.UserResponse;
import com.server.realtime_chat.entity.User;
import com.server.realtime_chat.mapper.UserMapper;
import com.server.realtime_chat.repository.UserRepository;
import com.server.realtime_chat.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    UserMapper userMapper;

    @Override
    public UserResponse findById(Integer id){
        return userRepository.findById(id).map(userMapper::toDto)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public UserResponse create(UserRequestCreate request) {
        Optional<User> optional = userRepository.findByUsername(request.getUsername());
        if (!optional.isPresent()) {
            request.setPassword(passwordEncoder.encode(request.getPassword()));
            User entity = userMapper.toEntity(request);
            User save = userRepository.save(entity);
            UserResponse response = userMapper.toDto(save);
            return response;
        }
        throw new AppException(ErrorCode.DUPLICATE_EMAIL);
    }
}
