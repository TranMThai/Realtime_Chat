package com.server.realtime_chat.repository;

import com.server.realtime_chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query(value = "SELECT m " +
            "FROM Message m " +
            "WHERE m.chatRoom.id = :id")
    List<Message> findAllByIdRoom(@Param("id") Long id);

    @Query(value = "SELECT COUNT(m) " +
            "FROM Message m " +
            "WHERE m.chatRoom.id = :id " +
            "AND m.isSeen = false")
    Integer coutUnSeenMessageByIdRoom(@Param("id") Long id);
}
