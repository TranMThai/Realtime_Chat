package com.server.realtime_chat.config.socket;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.config.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class WebSocketSecurityInterceptor implements ChannelInterceptor {

    @Autowired
    AuthenticationService authenticationService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String token = accessor.getFirstNativeHeader("Authorization");
            if (token == null || !validateToken(token)) {
                throw new AppException(ErrorCode.AUTHENTICATION_FAILED);
            }
        }
        return message;
    }

    private boolean validateToken(String token) {
        return authenticationService.introspect(token.replaceFirst("Bearer ",""));
    }

}