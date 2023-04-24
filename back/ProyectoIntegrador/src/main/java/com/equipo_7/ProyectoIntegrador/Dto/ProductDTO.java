package com.equipo_7.ProyectoIntegrador.Dto;

import com.equipo_7.ProyectoIntegrador.Model.*;

import java.util.Date;
import java.util.List;

public class ProductDTO {
    private Long id;
    private List<Image> images;
    private String category;
    private String title;
    private City city;
    private Location location;
    private String mapImage;
    private String description;
    private String descriptionTitle;
    private Double globalRating;
    private List<ReservationDTO> reservations;
    private List<Feature> features;
    private List<Policy> policy;
    private List<ReviewDTO> reviews;

    public ProductDTO() {
    }

    public ProductDTO(Long id, List<Image> images, String category, String title, City city, Location location, String mapImage, String description, String descriptionTitle, Double globalRating, List<ReservationDTO> reservations, List<Feature> features, List<Policy> policy, List<ReviewDTO> reviews) {
        this.id = id;
        this.images = images;
        this.category = category;
        this.title = title;
        this.city = city;
        this.location = location;
        this.mapImage = mapImage;
        this.description = description;
        this.descriptionTitle = descriptionTitle;
        this.globalRating = globalRating;
        this.reservations = reservations;
        this.features = features;
        this.policy = policy;
        this.reviews = reviews;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
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

    public String getMapImage() {
        return mapImage;
    }

    public void setMapImage(String mapImage) {
        this.mapImage = mapImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionTitle() {
        return descriptionTitle;
    }

    public void setDescriptionTitle(String descriptionTitle) {
        this.descriptionTitle = descriptionTitle;
    }

    public Double getGlobalRating() {
        return globalRating;
    }

    public void setGlobalRating(Double globalRating) {
        this.globalRating = globalRating;
    }


    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

    public List<Policy> getPolicy() {
        return policy;
    }

    public void setPolicy(List<Policy> policy) {
        this.policy = policy;
    }

    public List<ReservationDTO> getReservations() {
        return reservations;
    }

    public void setReservations(List<ReservationDTO> reservations) {
        this.reservations = reservations;
    }

    public List<ReviewDTO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewDTO> reviews) {
        this.reviews = reviews;
    }
}
