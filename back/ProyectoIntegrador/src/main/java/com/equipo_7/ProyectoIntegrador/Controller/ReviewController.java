package com.equipo_7.ProyectoIntegrador.Controller;

import com.equipo_7.ProyectoIntegrador.Dto.ReviewDTO;
import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Security.JwtTokenUtil;
import com.equipo_7.ProyectoIntegrador.Service.ProductService;
import com.equipo_7.ProyectoIntegrador.Service.ReviewService;
import com.equipo_7.ProyectoIntegrador.Service.UserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/review")
@Api(tags = "review", description = "Acceso a las reseñas")
public class ReviewController {
    private ReviewService reviewService;
    private ProductService productService;

    @Autowired
    public ReviewController(ReviewService reviewService, ProductService productService) {
        this.reviewService = reviewService;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ReviewDTO>> listReview(){
        return ResponseEntity.ok(reviewService.listAllReview());
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> saveReview(@RequestBody ReviewDTO reviewDTO,  @RequestHeader("Authorization") String authHeader) throws BadRequestException {
        ResponseEntity<ReviewDTO> responseEntity;
        String token = authHeader.replace("Bearer ", "");
        if(productService.searchProductById(reviewDTO.getProduct_id()).isPresent()){
            JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(token);
            Long userId = Long.parseLong(jwtTokenUtil.getClaimFromTokenByName("id").toString());
            reviewDTO.setUser_id(userId);
            responseEntity = ResponseEntity.ok(reviewService.saveReview(reviewDTO));
        }else {
            throw new BadRequestException("Review must have a product associated");
        }
        return responseEntity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> searchReview(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<ReviewDTO> reviewDTOOptional = reviewService.searchReviewById(id);
        if (reviewDTOOptional.isPresent()){
            return ResponseEntity.ok(reviewDTOOptional.get());
        }
        else{
            throw  new ResourceNotFoundException("Review with id " + id + " not found");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<ReviewDTO> reviewDTOOptional  = reviewService.searchReviewById(id);
        if(reviewDTOOptional.isPresent()){
            reviewService.deleteReviewById(id);
            return ResponseEntity.ok("Review " + reviewDTOOptional.get().getId() + " has been eliminated");
        }
        else {
            throw new ResourceNotFoundException("Review with id " + id + " not found");
        }
    }
}
