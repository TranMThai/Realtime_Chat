package com.server.realtime_chat.service.impl;

import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.config.socket.WebSocketService;
import com.server.realtime_chat.dto.request.ChatRoomRequest;
import com.server.realtime_chat.dto.response.ChatRoomResponse;
import com.server.realtime_chat.entity.ChatRoom;
import com.server.realtime_chat.mapper.ChatRoomMapper;
import com.server.realtime_chat.mapper.MessageMapper;
import com.server.realtime_chat.repository.ChatRoomRepository;
import com.server.realtime_chat.repository.MessageRepository;
import com.server.realtime_chat.service.ChatRoomService;
import com.server.realtime_chat.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    WebSocketService webSocketService;
    ChatRoomRepository chatRoomRepository;
    ChatRoomMapper chatRoomMapper;
    MessageRepository messageRepository;
    UserService userService;
    MessageMapper messageMapper;

    @Override
    public ChatRoom findById(Long id) {
        return chatRoomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public List<ChatRoomResponse> findAllByIdUser(Integer id) {
        return chatRoomRepository.findAllByIdUser(id.toString()).stream()
                .map(entity -> {
                    String name = resolveChatPartnerName(entity.getIdUsers(), id);
                    try {
                        Integer messageIndex = entity.getMessages().size() - 1;
                        Integer lastIdSender = entity.getMessages()
                                .get(messageIndex)
                                .getIdSender();
                        return chatRoomMapper.toDto(entity, name, messageRepository.coutUnSeenMessageByIdRoom(entity.getId(), lastIdSender), lastIdSender);
                    } catch (Exception e) {
                        return chatRoomMapper.toDto(entity, name, 0, null);
                    }
                })
                .toList();
    }

    private String resolveChatPartnerName(List<Integer> userIds, Integer currentUserId) {
        if (userIds.size() == 2) {
            Integer otherUserId = userIds.get(0).equals(currentUserId) ? userIds.get(1) : userIds.get(0);
            return userService.findById(otherUserId).getName();
        }
        return "Room";
    }

    @Override
    public ChatRoomResponse create(ChatRoomRequest request) {
        var anyRoom = chatRoomRepository.findAll().stream()
                .filter(cr -> cr.getIdUsers().containsAll(request.getIdUsers()))
                .findAny();
        if (anyRoom.isPresent()) {
            throw new AppException(ErrorCode.DUPLICATE_CHAT_ROOM);
        }
        ChatRoom entity = chatRoomMapper.toEntity(request);
        ChatRoom save = chatRoomRepository.save(entity);
        for (Integer id : request.getIdUsers()) {
            webSocketService.responseRealtime("/user/" + id, findAllByIdUser(id));
        }
        ChatRoomResponse response = chatRoomMapper.toDto(save, null, 0, null);
        return response;
    }

    @Override
    public void seenAllByIdRoom(Long idRoom, Integer idUser) {
        chatRoomRepository.seenAllByIdRoom(idRoom, idUser);
        List<Integer> idUsers = findById(idRoom).getIdUsers();
        for (Integer id : idUsers) {
            webSocketService.responseRealtime("/user/" + id, findAllByIdUser(id));
        }
    }

}
