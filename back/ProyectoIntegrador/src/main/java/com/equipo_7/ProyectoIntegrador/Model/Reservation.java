package com.equipo_7.ProyectoIntegrador.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.NonNull;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalTime hourStartReservation;
    @Column(nullable = false)
    private LocalDate reservationStartTime;
    @Column(nullable = false)
    private LocalDate reservationFinishTime;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    private User user;

    public Reservation() {
    }

    public Reservation(LocalTime hourStartReservation, LocalDate reservationStartTime, LocalDate reservationFinishTime, @NonNull Product product, @NonNull User user) {
        this.hourStartReservation = hourStartReservation;
        this.reservationStartTime = reservationStartTime;
        this.reservationFinishTime = reservationFinishTime;
        this.product = product;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getReservationStartTime() {
        return reservationStartTime;
    }

    public void setReservationStartTime(LocalDate reservationStartTime) {
        this.reservationStartTime = reservationStartTime;
    }

    public LocalDate getReservationFinishTime() {
        return reservationFinishTime;
    }

    public void setReservationFinishTime(LocalDate reservationFinishTime) {
        this.reservationFinishTime = reservationFinishTime;
    }

    public LocalTime getHourStartReservation() {
        return hourStartReservation;
    }

    public void setHourStartReservation(LocalTime hourStartReservation) {
        this.hourStartReservation = hourStartReservation;
    }
}
