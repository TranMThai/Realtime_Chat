package com.server.realtime_chat.controller;

import com.server.realtime_chat.config.security.AuthenticationService;
import com.server.realtime_chat.dto.request.AuthenticationRequest;
import com.server.realtime_chat.dto.response.ApiResponse;
import com.server.realtime_chat.dto.response.AuthenticationResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {

    AuthenticationService authenticationService;

    @PostMapping("/token")
    public ApiResponse<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(request);
        return ApiResponse.builder()
                .result(authenticationResponse)
                .build();
    }
}
