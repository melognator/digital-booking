package com.equipo_7.ProyectoIntegrador.Repository;

import com.equipo_7.ProyectoIntegrador.Model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
    @Query("SELECT f FROM Feature f WHERE title=?1")
    Optional<Feature> searchFeature(String title);
}
