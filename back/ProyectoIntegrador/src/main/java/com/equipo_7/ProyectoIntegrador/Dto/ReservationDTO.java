package com.equipo_7.ProyectoIntegrador.Dto;



import com.equipo_7.ProyectoIntegrador.Model.Review;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class ReservationDTO {
    private Long id;
    private LocalTime hourStartReservation;
    private LocalDate startReservation;
    private LocalDate endReservation;
    private ReservationProductDTO product;
    private ReviewDTO review;
    private Long user_id;

    public ReservationDTO() {
    }

    public ReservationDTO(Long id, LocalTime hourStartReservation, LocalDate startReservation, LocalDate endReservation,Long user_id, ReservationProductDTO product, ReviewDTO review) {
        this.id = id;
        this.hourStartReservation = hourStartReservation;
        this.startReservation = startReservation;
        this.endReservation = endReservation;
        this.product = product;
        this.user_id = user_id;
        this.review = review;
    }

    public LocalDate getStartReservation() {
        return startReservation;
    }

    public void setStartReservation(LocalDate startReservation) {
        this.startReservation = startReservation;
    }

    public LocalDate getEndReservation() {
        return endReservation;
    }

    public void setEndReservation(LocalDate endReservation) {
        this.endReservation = endReservation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReservationProductDTO getProduct() {
        return product;
    }

    public void setProduct(ReservationProductDTO product) {
        this.product = product;
    }

    public ReviewDTO getReview() {
        return review;
    }

    public void setReview(ReviewDTO review) {
        this.review = review;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public LocalTime getHourStartReservation() {
        return hourStartReservation;
    }

    public void setHourStartReservation(LocalTime hourStartReservation) {
        this.hourStartReservation = hourStartReservation;
    }
}
