package com.equipo_7.ProyectoIntegrador.Dto;

import com.equipo_7.ProyectoIntegrador.Model.User;

public class UserDTO {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private String city;
    private String profileUrl;
    private String  role;
    private Boolean emailValid;

    public UserDTO(User user) {
        this.name = user.getName();
        this.lastname = user.getLastname();
        this.email = user.getEmail();
        this.city = user.getCity();
        this.id = user.getId();
        this.profileUrl = user.getProfileUrl();
        this.role = user.getRole().getName();
        this.emailValid = user.getEmailValid();
    }

    public UserDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getEmailValid() {
        return emailValid;
    }

    public void setEmailValid(Boolean emailValid) {
        this.emailValid = emailValid;
    }
}
