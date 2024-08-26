package com.server.realtime_chat.config.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.server.realtime_chat.config.exception.AppException;
import com.server.realtime_chat.config.exception.ErrorCode;
import com.server.realtime_chat.dto.request.AuthenticationRequest;
import com.server.realtime_chat.dto.response.AuthenticationResponse;
import com.server.realtime_chat.entity.User;
import com.server.realtime_chat.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    @NonFinal
    @Value("${jwt.SIGNER_KEY}")
    private String key;

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).get();
        boolean isAuth = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (isAuth) {
            String token = generateToken(user);
            return AuthenticationResponse.builder()
                    .token(token)
                    .build();
        }
        throw new AppException(ErrorCode.AUTHENTICATION_FAILED);
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("thai_dep_trai_bo_doi_qua")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(100, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("user_id", user.getId())
                .claim("scope", "user")
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(key.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            return null;
        }
    }

    public boolean introspect(String token) {
        try {
            JWSVerifier verifier = new MACVerifier(key.getBytes());
            SignedJWT signed = SignedJWT.parse(token);
            boolean verified = verifier.verify(signed.getHeader(),
                    signed.getSigningInput(),
                    signed.getSignature());
            Date expiryTime = signed.getJWTClaimsSet().getExpirationTime();

            return verified && expiryTime.after(new Date());
        } catch (JOSEException | ParseException e) {
            throw new AppException(ErrorCode.AUTHENTICATION_FAILED);
        }
    }

}
