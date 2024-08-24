package com.server.realtime_chat.controller;

import com.server.realtime_chat.dto.request.UserRequestCreate;
import com.server.realtime_chat.dto.response.ApiResponse;
import com.server.realtime_chat.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class UserController {

    UserService userService;

    @GetMapping("/{id}")
    public ApiResponse<?> findById(
            @PathVariable(name = "id") Integer id
    ){
        return ApiResponse
                .builder()
                .result(userService.findById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<?> create(
            @RequestBody UserRequestCreate request
            ){
        return ApiResponse
                .builder()
                .result(userService.create(request))
                .build();
    }
}
