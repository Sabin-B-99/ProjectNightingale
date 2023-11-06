package com.projnight.authorizationserver.exception;

import org.springframework.http.HttpStatus;

public class ClientNotFoundException extends RuntimeException {

    private HttpStatus status;

    public ClientNotFoundException(String message, HttpStatus httpStatus) {
        super(message);
        this.status = httpStatus;
    }
}
