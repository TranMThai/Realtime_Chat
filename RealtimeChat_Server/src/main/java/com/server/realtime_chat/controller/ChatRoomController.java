package com.server.realtime_chat.controller;

import com.server.realtime_chat.dto.request.ChatRoomRequest;
import com.server.realtime_chat.dto.response.ApiResponse;
import com.server.realtime_chat.service.ChatRoomService;
import com.server.realtime_chat.service.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat_room")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class ChatRoomController {

    ChatRoomService chatRoomService;
    MessageService messageService;

    @GetMapping("/{id}")
    public ApiResponse<?> findAllByIdUser(@PathVariable(name = "id") Integer id){
        return ApiResponse.builder()
                .result(chatRoomService.findAllByIdUser(id))
                .build();
    }

    @GetMapping("/messages/{id}")
    public ApiResponse<?> findAllMessageByIdRoom(@PathVariable(name = "id") Long id,
                                                 @RequestHeader("Authorization") String token){
        return ApiResponse.builder()
                .result(messageService.findAllMessageByIdRoom(id, token))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createRoom(@RequestBody ChatRoomRequest request){
        return ApiResponse.builder()
                .result(chatRoomService.create(request))
                .build();
    }
}
