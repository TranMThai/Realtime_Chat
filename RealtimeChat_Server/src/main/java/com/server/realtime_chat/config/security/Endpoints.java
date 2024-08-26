package com.server.realtime_chat.config.security;

public class Endpoints {

    public static final String[] PUBLIC_ENDPOINTS = {
            "/api/auth/**",
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/api/users"
    };

    public static final String[] AUTHOR_ENDPOINTS = {
            "/api/users/**",
            "/api/message/**",
            "/api/chat_room/**"
    };

}
