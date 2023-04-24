package com.equipo_7.ProyectoIntegrador.Service;

import com.equipo_7.ProyectoIntegrador.Dto.ReviewDTO;
import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Model.Product;
import com.equipo_7.ProyectoIntegrador.Model.Reservation;
import com.equipo_7.ProyectoIntegrador.Model.Review;
import com.equipo_7.ProyectoIntegrador.Model.User;
import com.equipo_7.ProyectoIntegrador.Repository.ReservationRepository;
import com.equipo_7.ProyectoIntegrador.Repository.ReviewRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;
    private ReservationRepository reservationRepository;
    private final static Logger LOGGER = Logger.getLogger(ReviewService.class);

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ReservationRepository reservationRepository) {
        this.reviewRepository = reviewRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<ReviewDTO> listAllReview(){
        LOGGER.info("Returning all review");
        List<Review> reviewList = reviewRepository.findAll();
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        for (Review review : reviewList) {
            reviewDTOList.add(reviewToReviewDTO(review));
        }
        return reviewDTOList;
    }

    public void deleteReviewById(Long id){
        LOGGER.info("Deleting review with id: " + id);
        reviewRepository.deleteById(id);
    }

    public ReviewDTO saveReview(ReviewDTO reviewDTO) throws BadRequestException{
//        List<Reservation> reservations = reservationRepository.getReservationByUserProductBeforeNow(reviewDTO.getProduct_id(),reviewDTO.getUser_id());
        List<Reservation> reservations = reservationRepository.findByUser_id(reviewDTO.getUser_id());
        if (reservations.isEmpty()){
            throw new BadRequestException("Cannot review something without having initiated the reservation");
        }
        if( reviewDTO.getRating() > 5 || reviewDTO.getRating() < 0){
            throw new BadRequestException("Review rating has to be between 0 - 5");
        }
        Optional<Review> reviewOptional = reviewRepository.getReviewByUserIdAndProductId(reviewDTO.getUser_id(), reviewDTO.getProduct_id());
        Review review;
        if(reviewOptional.isEmpty()) {
            LOGGER.info("Adding new review to database");
            review = reviewRepository.save(reviewDtoToReview(reviewDTO));
        }else {
            Review review1 = reviewOptional.get();
            review1.setRating(reviewDTO.getRating());
            review1.setCommentary(reviewDTO.getCommentary());
            LOGGER.info("Updating review with id " + review1.getId());
            review = reviewRepository.save(review1);
        }
        return reviewToReviewDTO(review);
    }

    public Optional<ReviewDTO> searchReviewById(Long id){
        Optional<Review> reviewOptional = reviewRepository.findById(id);
        if(reviewOptional.isPresent()) {
            LOGGER.info("Returning review with id: " + id);
            return Optional.of(reviewToReviewDTO(reviewOptional.get()));
        }else {
            return Optional.empty();
        }
    }


    public ReviewDTO reviewToReviewDTO(Review review){
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setUser_id(review.getUser().getId());
        reviewDTO.setProduct_id(review.getProduct().getId());
        reviewDTO.setId(review.getId());
        reviewDTO.setRating(review.getRating());
        reviewDTO.setCommentary(review.getCommentary());
        reviewDTO.setAuthor_name(review.getUser().getName() + " " + review.getUser().getLastname());
        reviewDTO.setAuthor_profileUrl(review.getUser().getProfileUrl());
        return reviewDTO;
    }
    public Review reviewDtoToReview(ReviewDTO reviewDTO){
        Review review = new Review();
        Product product = new Product();
        User user = new User();

        product.setId(reviewDTO.getProduct_id());
        user.setId(reviewDTO.getUser_id());
        review.setId(reviewDTO.getId());
        review.setRating(reviewDTO.getRating());
        review.setProduct(product);
        review.setUser(user);
        review.setCommentary(reviewDTO.getCommentary());

        return review;
    }

    public ReviewDTO getReviewByReservation(Reservation reservation) {
        Optional<Review> review = reviewRepository.getReviewByUserIdAndProductId(reservation.getUser().getId(), reservation.getProduct().getId());
        if (review.isPresent()) {
            return reviewToReviewDTO(review.get());
        } else {
            return null;
        }
    }
}
