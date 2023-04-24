package com.equipo_7.ProyectoIntegrador.Repository;

import com.equipo_7.ProyectoIntegrador.Model.Product;
import com.equipo_7.ProyectoIntegrador.Model.ProductSpecification;
import com.equipo_7.ProyectoIntegrador.Model.Reservation;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @Query(nativeQuery = true, value = "SELECT * FROM product ORDER BY RAND() LIMIT 8")
    List<Product> list8Random();

    @Override
    List<Product> findAllById(Iterable<Long> longs);

    List<Product> findAll(Specification<Product> spec);
    default List<Product> findAll(Product product) {
        return findAll(new ProductSpecification(product));
    }
}