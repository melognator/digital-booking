package com.equipo_7.ProyectoIntegrador.Dto;

import com.equipo_7.ProyectoIntegrador.Model.City;
import com.equipo_7.ProyectoIntegrador.Model.Image;
import com.equipo_7.ProyectoIntegrador.Model.Location;
import com.equipo_7.ProyectoIntegrador.Model.Product;

import java.util.List;

public class ReservationProductDTO {
    private Long id;
    private String category;
    private String title;
    private City city;
    private Location location;
    private List<Image> image;

    public ReservationProductDTO() {
    }

    public ReservationProductDTO(Product product) {
        this.id = product.getId();
        this.category = product.getCategory().getTitle();
        this.title = product.getTitle();
        this.city = product.getCity();
        this.location = product.getLocation();
        this.image = product.getImages();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Image> getImage() {
        return image;
    }

    public void setImage(List<Image> image) {
        this.image = image;
    }
}
