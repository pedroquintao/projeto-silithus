package com.silithus.anqiraj.handler;

import com.silithus.anqiraj.exception.BadRequestException;
import com.silithus.anqiraj.exception.BadRequestExceptionDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<BadRequestExceptionDetails> handleBadRequestException(BadRequestException exception) {
        return new ResponseEntity<>(
                BadRequestExceptionDetails.builder()
                        .timestamp(LocalDateTime.now())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(exception.getMessage())
                        .developerMessage(exception.getClass().getName())
                        .title("Bad Request Exception")
                        .build(), HttpStatus.BAD_REQUEST);
    }
}
