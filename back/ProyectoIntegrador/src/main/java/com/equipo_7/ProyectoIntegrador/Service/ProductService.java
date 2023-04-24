package com.equipo_7.ProyectoIntegrador.Service;

import com.equipo_7.ProyectoIntegrador.Dto.ProductDTO;
import com.equipo_7.ProyectoIntegrador.Dto.ReservationDTO;
import com.equipo_7.ProyectoIntegrador.Dto.ReviewDTO;
import com.equipo_7.ProyectoIntegrador.Model.*;
import com.equipo_7.ProyectoIntegrador.Repository.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CityRepository cityRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;
    private final FeatureRepository featureRepository;
    private final ReservationService reservationService;
    private final ReviewService reviewService;

    private static final Logger LOGGER = Logger.getLogger(ProductService.class);
    @Autowired
    public ProductService(ProductRepository productRepository, CityRepository cityRepository, CategoryRepository categoryRepository, ReviewRepository reviewRepository, ReservationRepository reservationRepository, FeatureRepository featureRepository, ReservationService reservationService, ReviewService reviewService) {
        this.productRepository = productRepository;
        this.cityRepository = cityRepository;
        this.categoryRepository = categoryRepository;
        this.reviewRepository = reviewRepository;
        this.reservationRepository = reservationRepository;
        this.featureRepository = featureRepository;
        this.reservationService = reservationService;
        this.reviewService = reviewService;
    }
    
    public List<ProductDTO> listAllProducts(){
        LOGGER.info("Returning all products");
        List<ProductDTO> productDTOList = new ArrayList<>();
        List<Product> productList = productRepository.findAll();
        for (Product product :
                productList) {
            productDTOList.add(productToProductDTO(product));
        }
        return productDTOList;
    }

    public void deleteProductById(Long id){
        LOGGER.info("Deleting product with id: " + id);
        productRepository.deleteById(id);
    }

    @Transactional
    public ProductDTO saveProduct(ProductDTO productDTO) {

        List<Feature> features = productDTO.getFeatures();
        List<Feature> features1 = new ArrayList<>();
        if(features != null) {
            for (Feature feature : features) {
                Optional<Feature> featureOptional = featureRepository.searchFeature(feature.getTitle());
                if (featureOptional.isPresent()) {
                    features1.add(featureOptional.get());
                } else {
                    features1.add(featureRepository.save(feature));
                }
            }
            productDTO.setFeatures(features1);
        }

        LOGGER.info("Adding new product to database");
        Product product1 = productRepository.save(productDtoToProduct(productDTO));

        List<Image> imageList = product1.getImages();
        List<Policy> policyList = product1.getPolicies();
        List<Review> reviewList = product1.getReviews();
        List<Reservation> reservationList = product1.getReservations();

        if (imageList != null){
            for (Image image : product1.getImages()) {
                image.setProduct(product1);
            }
        }
        if(policyList != null) {
            for (Policy policy : product1.getPolicies()) {
                policy.setProduct(product1);
            }
        }
        if(reviewList != null) {
            for (Review review : product1.getReviews()) {
                review.setProduct(product1);
            }
        }
        if (reservationList != null) {
            for (Reservation reservation : product1.getReservations()) {
                reservation.setProduct(product1);
            }
        }
        return productToProductDTO(product1);
    }

    public Optional<ProductDTO> searchProductById(Long id){
            Optional<Product> productOptional = productRepository.findById(id);
            if(productOptional.isPresent()) {
                LOGGER.info("Returning product with id: " + id);
                return Optional.of(productToProductDTO(productOptional.get()));
            }else {
                return Optional.empty();
            }
    }

    public List<ProductDTO> searchProductsByIds(List<Long> id){
        List<ProductDTO> productDTOList = new ArrayList<>();
        List<Product> productList = productRepository.findAllById(id);
        for (Product product :
                productList) {
            productDTOList.add(productToProductDTO(product));
        }
        LOGGER.info("Returning product with ids: " + id);
        return productDTOList;
    }

    @Transactional
    public void updateProduct(ProductDTO productDTO){
        LOGGER.info("Updating product with title: " + productDTO.getTitle());
        for (Image image : productDTO.getImages()) {
            image.setProduct(productRepository.findById(productDTO.getId()).get());
        }

        for (Policy policy : productDTO.getPolicy()) {
            policy.setProduct(productRepository.findById(productDTO.getId()).get());
        }

        List<Feature> features = productDTO.getFeatures();
        List<Feature> features1 = new ArrayList<>();
        for (Feature feature : features) {
            Optional<Feature> featureOptional = featureRepository.searchFeature(feature.getTitle());
            if (featureOptional.isPresent()) {
                features1.add(featureOptional.get());
            } else {
                features1.add(featureRepository.save(feature));
            }
        }
        productDTO.setFeatures(features1);

        productRepository.save(productDtoToProduct(productDTO));

    }


    public List<ProductDTO> list8Random(){
        LOGGER.info("Returning 8 random products");
        List<Product> productList = productRepository.list8Random();
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Product product :
                productList) {
            productDTOList.add(productToProductDTO(product));
        }
        return productDTOList;
    }

    public Set<ProductDTO> filter(Product product){
        Specification<Product> spec = new ProductSpecification(product);
        List<Product> productList = productRepository.findAll(spec);
        Set<ProductDTO> productDTOList = new HashSet<>();
        for (Product product1 :
                productList) {
            productDTOList.add(productToProductDTO(product1));
        }
        LOGGER.info("Returning products filtered");
        return productDTOList;
    }

    public Set<ProductDTO> filter(Product product, LocalDate startReservation, LocalDate endReservation){
        Set<ProductDTO> productDTOS = filter(product);
        Set<ProductDTO> productDTOResult = new HashSet<>();
        for (ProductDTO productDTO :
                productDTOS) {

            if (productDTO.getReservations().isEmpty() || productDTO.getReservations() == null){
                productDTOResult.add(productDTO);
            }else {
                int pass = 0;
                for (ReservationDTO reservationDTO : productDTO.getReservations()) {
                    if (reservationDTO.getStartReservation().isAfter(endReservation) || reservationDTO.getEndReservation().isBefore(startReservation)){
                        pass++;
                    }
                }
                if(pass == productDTO.getReservations().size()){
                    productDTOResult.add(productDTO);
                }
            }
        }
        LOGGER.info("Returning products filtered");
        return productDTOResult;
    }


    private ProductDTO productToProductDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setImages(product.getImages());
        productDTO.setCategory(product.getCategory().getTitle());
        productDTO.setTitle(product.getTitle());
        productDTO.setCity(product.getCity());
        productDTO.setMapImage(product.getMapImage());
        productDTO.setDescriptionTitle(product.getDescriptionTitle());
        productDTO.setDescription(product.getDescription());
        List<Review> allReviews = product.getReviews();
        Integer allReviewsSum = 0;
        for (Review review : allReviews) {
            allReviewsSum += review.getRating();
        }
        if (allReviewsSum != 0) {
            productDTO.setGlobalRating(((double) allReviewsSum / allReviews.size()));
        }else {
            productDTO.setGlobalRating(0d);
        }
        List<Reservation> reservations = product.getReservations();
        List<ReservationDTO> reservationDTOList = new ArrayList<>();
        for (Reservation reservation :
                reservations) {
            reservationDTOList.add(reservationService.reservationToResrevationDTO(reservation));
        }

        List<ReviewDTO> reviewsDTO = new ArrayList<>();
        for(Review review : allReviews) {
            reviewsDTO.add(reviewService.reviewToReviewDTO(review));
        }
        productDTO.setReviews(reviewsDTO);
        productDTO.setReservations(reservationDTOList);
        productDTO.setFeatures(product.getFeatures());
        productDTO.setPolicy(product.getPolicies());
        productDTO.setLocation(product.getLocation());
        return productDTO;
    }

    private Product productDtoToProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setId(productDTO.getId());
        product.setImages(productDTO.getImages());
        product.setCategory(categoryRepository.searchCategory(productDTO.getCategory()).get());
        product.setTitle(productDTO.getTitle());
        product.setCity(cityRepository.searchCity(productDTO.getCity().getCityName()).get());
        product.setMapImage(productDTO.getMapImage());
        product.setDescriptionTitle(productDTO.getDescriptionTitle());
        product.setDescription(productDTO.getDescription());
        product.setReviews(reviewRepository.findByProduct_id(productDTO.getId()).get());
        product.setReservations(reservationRepository.findByProduct_id(productDTO.getId()));
        product.setFeatures(productDTO.getFeatures());
        product.setPolicies(productDTO.getPolicy());
        product.setLocation(productDTO.getLocation());
        return product;
    }
}
