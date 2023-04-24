package com.equipo_7.ProyectoIntegrador.Repository;

import com.equipo_7.ProyectoIntegrador.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE title=?1")
    Optional<Category> searchCategory(String title);

    @Modifying
    @Query("DELETE FROM Category WHERE title=?1")
    void deleteCategory(String title);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.category=?1")
    Integer countProductsByCategory(Category category);
}
