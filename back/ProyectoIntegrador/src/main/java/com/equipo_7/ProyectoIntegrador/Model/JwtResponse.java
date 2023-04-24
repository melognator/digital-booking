package com.equipo_7.ProyectoIntegrador.Model;

import com.equipo_7.ProyectoIntegrador.Dto.UserDTO;

public class JwtResponse {

    private final String token;
    private final UserDTO user;

    public JwtResponse(String token, User user) {
        this.token = token;
        this.user = new UserDTO(user);
    }

    public String getToken() {
        return this.token;
    }

    public UserDTO getUser() {
        return user;
    }
}