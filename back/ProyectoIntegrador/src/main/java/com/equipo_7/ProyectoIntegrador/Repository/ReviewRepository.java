package com.equipo_7.ProyectoIntegrador.Repository;

import com.equipo_7.ProyectoIntegrador.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<List<Review>> findByProduct_id(Long id_product);
    @Query("SELECT r FROM Review r WHERE product_id = :productId AND user_id = :userId")
    Optional<Review> getReviewByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);

}
