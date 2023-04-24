package com.equipo_7.ProyectoIntegrador.Model;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.*;

public class ProductSpecification implements Specification<Product>
{
    private Product product;

    public ProductSpecification(Product product) {
        this.product = product;
    }


    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if(product.getCategory() != null && product.getCategory().getTitle() != null){
            predicates.add(criteriaBuilder.equal(root.get("category").get("title"), product.getCategory().getTitle()));
        }

        if(product.getCity() != null && product.getCity().getCityName() != null){
            predicates.add(criteriaBuilder.equal(root.get("city").get("cityName"), product.getCity().getCityName()));
        }

        if (product.getFeatures() != null && !product.getFeatures().isEmpty()) {
            List<Long> featureIds = product.getFeatures().stream().map(Feature::getId).toList();

            List<Predicate> featurePredicates = new ArrayList<>();
            for (Long featureId : featureIds) {
                featurePredicates.add(root.join("features").get("id").in(featureId));
            }

            Predicate allFeaturesPredicate = criteriaBuilder.and(featurePredicates.toArray(new Predicate[0]));
            predicates.add(allFeaturesPredicate);
        }


        query.distinct(true);

        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
    }
}
