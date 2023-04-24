package com.equipo_7.ProyectoIntegrador.Dto;

public class ReviewDTO {
    private Long id;
    private Long user_id;
    private String author_name;
    private String author_profileUrl;
    private Long product_id;
    private String commentary;
    private Integer rating;

    public ReviewDTO(Long id, Long user_id, String author_name, String author_profileUrl, Long product_id, String commentary, Integer rating) {
        this.id = id;
        this.user_id = user_id;
        this.author_name = author_name;
        this.author_profileUrl = author_profileUrl;
        this.product_id = product_id;
        this.commentary = commentary;
        this.rating = rating;
    }

    public ReviewDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getCommentary() {
        return commentary;
    }

    public void setCommentary(String commentary) {
        this.commentary = commentary;
    }

    public String getAuthor_name() {
        return author_name;
    }

    public void setAuthor_name(String author_name) {
        this.author_name = author_name;
    }

    public String getAuthor_profileUrl() {
        return author_profileUrl;
    }

    public void setAuthor_profileUrl(String author_profileUrl) {
        this.author_profileUrl = author_profileUrl;
    }
}
