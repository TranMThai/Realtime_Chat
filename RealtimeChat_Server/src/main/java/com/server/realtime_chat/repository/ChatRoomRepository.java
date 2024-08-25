package com.server.realtime_chat.repository;

import com.server.realtime_chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    @Query("SELECT cr " +
            "FROM ChatRoom cr " +
            "WHERE cr.idFirstSender IN :ids " +
            "AND cr.idSecondSender IN :ids")
    Optional<ChatRoom> findByIdUser(@Param("ids") List<Integer> ids);
}
