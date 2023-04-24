package com.equipo_7.ProyectoIntegrador.Dto;

import javax.persistence.Column;

public class CategoryDTO {
    private Long id;
    private String title;
    private String description;
    private Integer productsAmount;
    private String img;

    public CategoryDTO(Long id, String title, String description, Integer productsAmount, String img) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.productsAmount = productsAmount;
        this.img = img;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getProductsAmount() {
        return productsAmount;
    }

    public void setProductsAmount(Integer productsAmount) {
        this.productsAmount = productsAmount;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
