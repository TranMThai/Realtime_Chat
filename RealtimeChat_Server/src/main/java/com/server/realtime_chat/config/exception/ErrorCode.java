package com.server.realtime_chat.config.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND(404, "not found", HttpStatus.NOT_FOUND),
    DUPLICATE_EMAIL(400, "duplicate email", HttpStatus.BAD_REQUEST),
    AUTHENTICATION_FAILED(400, "Authentication failed", HttpStatus.BAD_REQUEST)
    ;

    private final int code;

    private final String message;

    private final HttpStatusCode httpStatusCode;

}