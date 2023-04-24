package com.equipo_7.ProyectoIntegrador.Repository;

import com.equipo_7.ProyectoIntegrador.Model.Product;
import com.equipo_7.ProyectoIntegrador.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
   List<Reservation> findByProduct_id(Long id_product);
   List<Reservation> findByUser_id(Long id_user);
   @Query("SELECT r FROM Reservation r WHERE r.product.id = :productId AND ((r.reservationStartTime BETWEEN :startTime AND :endTime) OR (r.reservationFinishTime BETWEEN :startTime AND :endTime))")
   List<Reservation> filterReservations(@Param("productId") Long productId, @Param("endTime") LocalDate endTime, @Param("startTime") LocalDate startTime);
   @Query("SELECT r FROM Reservation r where r.product.id = :productId AND r.user.id = :userId AND r.reservationStartTime < CURRENT_DATE()")
   List<Reservation> getReservationByUserProductBeforeNow(@Param("productId") Long productId,@Param("userId") Long userId);

}
