package org.vilagszep.servermesetar.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

//this object is for handling exceptions
@Getter
public class AppException extends RuntimeException{

    private final HttpStatus code;

    public AppException(String message, HttpStatus code) {
        super(message);
        this.code = code;
    }

}
