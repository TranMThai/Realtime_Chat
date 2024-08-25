package com.server.realtime_chat.service;

import com.server.realtime_chat.entity.Message;

public interface MessageService {
    Message create(Message message);
}
