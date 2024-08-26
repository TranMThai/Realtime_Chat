package com.server.realtime_chat.controller;

import com.server.realtime_chat.dto.response.ApiResponse;
import com.server.realtime_chat.service.ChatRoomService;
import com.server.realtime_chat.service.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ApiResponse<?> findAllMessageByIdRoom(@PathVariable(name = "id") Long id){
        return ApiResponse.builder()
                .result(messageService.findAllMessageByIdRoom(id))
                .build();
    }
}
