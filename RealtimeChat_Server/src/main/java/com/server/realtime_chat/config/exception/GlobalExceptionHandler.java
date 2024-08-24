package com.server.realtime_chat.config.exception;

import com.server.realtime_chat.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<?> handlingAppException(AppException e) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                        .code(e.getErrorCode().getCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }
}
