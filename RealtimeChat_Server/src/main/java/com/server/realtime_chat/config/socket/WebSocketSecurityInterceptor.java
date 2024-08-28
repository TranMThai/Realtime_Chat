package com.server.realtime_chat.config.socket;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.config.security.AuthenticationService;
import com.server.realtime_chat.entity.ChatRoom;
import com.server.realtime_chat.entity.User;
import com.server.realtime_chat.repository.ChatRoomRepository;
import com.server.realtime_chat.repository.UserRepository;
import com.server.realtime_chat.service.ChatRoomService;
import com.server.realtime_chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
public class WebSocketSecurityInterceptor implements ChannelInterceptor {

    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String token = accessor.getFirstNativeHeader("Authorization") + "";
            if (token.length() == 0 || !authenticationService.introspect(token)) {
                throw new AppException(ErrorCode.AUTHENTICATION_FAILED);
            }
        }
        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
            isUserInRoom(accessor);
        }
        if (StompCommand.SEND.equals(accessor.getCommand())) {
            isUserInRoom(accessor);
        }

        return message;
    }

    private void isUserInRoom(StompHeaderAccessor accessor) {
        try {
            String idRoom = accessor.getFirstNativeHeader("idRoom");
            String token = accessor.getFirstNativeHeader("token");
            ChatRoom chatRoom = chatRoomRepository.findById(Long.valueOf(idRoom)).get();
            User user = authenticationService.decodeToUser(token);
            if(!chatRoom.getIdUsers().contains(user.getId())){
                throw new AppException(ErrorCode.USER_NOT_IN_ROOM);
            }
        }catch (Exception e) {
            throw new AppException(ErrorCode.AUTHENTICATION_FAILED);
        }
    }

}