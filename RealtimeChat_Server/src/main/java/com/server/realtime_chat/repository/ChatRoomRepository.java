package com.server.realtime_chat.repository;

import com.server.realtime_chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query(value = "SELECT * " +
            "FROM chat_room " +
            "WHERE JSON_CONTAINS(id_users, :idUser, '$')",
            nativeQuery = true)
    List<ChatRoom> findAllByIdUser(@Param("idUser") String idUser);

    @Modifying
    @Transactional
    @Query(value = "UPDATE message m " +
            "SET m.is_seen = true " +
            "WHERE m.id_room = :idRoom " +
            "AND m.id_sender <> :idUser",
            nativeQuery = true)
    void seenAllByIdRoom(@Param("idRoom") Long idRoom,
                         @Param("idUser") Integer idUser);
}
