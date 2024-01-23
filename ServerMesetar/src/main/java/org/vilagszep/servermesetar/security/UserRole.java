package org.vilagszep.servermesetar.security;

public enum UserRole {
    USER("READ"),
    ADMIN("WRITE");

    private final String authority;

    UserRole(String authority) {
        this.authority = authority;
    }

    String getAuthority(String authority) {
        return authority;
    }
}
