package com.equipo_7.ProyectoIntegrador.Service;

import com.equipo_7.ProyectoIntegrador.Dto.ReservationDTO;
import com.equipo_7.ProyectoIntegrador.Dto.ReservationProductDTO;
import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Model.Product;
import com.equipo_7.ProyectoIntegrador.Model.Reservation;
import com.equipo_7.ProyectoIntegrador.Model.User;
import com.equipo_7.ProyectoIntegrador.Repository.ProductRepository;
import com.equipo_7.ProyectoIntegrador.Repository.ReservationRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private ReservationRepository reservationRepository;
    private ProductRepository productRepository;
    private ReviewService reviewService;
    private final static Logger LOGGER = Logger.getLogger(ReservationService.class);

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, ProductRepository productRepository, ReviewService reviewService) {
        this.reservationRepository = reservationRepository;
        this.productRepository = productRepository;
        this.reviewService = reviewService;
    }

    public List<ReservationDTO> listAllReservations(){
        LOGGER.info("Returning all reservations");
        List<Reservation> reservationList = reservationRepository.findAll();
        List<ReservationDTO> reservationDTOList = new ArrayList<>();
        for (Reservation reservation :
                reservationList) {
            reservationDTOList.add(reservationToResrevationDTO(reservation));
        }
        return reservationDTOList;
    }

    public void deleteReservationById(Long id){
        LOGGER.info("Deleting reservation with id: " + id);
        reservationRepository.deleteById(id);
    }

    public ReservationDTO saveReservation(ReservationDTO reservationDTO, Long productId) throws HttpClientErrorException {
        List<Reservation> reservationList = reservationRepository.filterReservations(productId, reservationDTO.getEndReservation(),reservationDTO.getStartReservation());
        Optional<Product> product = productRepository.findById(productId);
        if (reservationList.isEmpty() && !reservationDTO.getStartReservation().isBefore(LocalDate.now()) && !reservationDTO.getEndReservation().isBefore(LocalDate.now()) && product.isPresent()) {
            reservationDTO.setProduct(new ReservationProductDTO(product.get()));
            LOGGER.info("Adding new reservation to database");
            Reservation reservation = reservationRepository.save(reservationDtoToReservation(reservationDTO));
            return reservationToResrevationDTO(reservation);
        }else {
            throw new HttpClientErrorException("Reservation not available");
        }
    }

    public Optional<ReservationDTO> searchReservationById(Long id){
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        if(reservationOptional.isPresent()) {
            LOGGER.info("Returning reservation with id: " + id);
            return Optional.of(reservationToResrevationDTO(reservationOptional.get()));
        }else {
            return Optional.empty();
        }
    }

    public void updateReservation(ReservationDTO reservationDTO, Long productId) throws BadRequestException {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            reservationDTO.setProduct(new ReservationProductDTO(product.get()));
            LOGGER.info("Updating reservation with id: " + reservationDTO.getId());
            reservationRepository.save(reservationDtoToReservation(reservationDTO));
        }else {
            throw new BadRequestException("Reservation not found");
        };
    }

    public List<ReservationDTO> getReservationsByProduct_id(Long productId){
        List<Reservation> reservationList = reservationRepository.findByProduct_id(productId);
        List<ReservationDTO> reservationDTOList = new ArrayList<>();
        for (Reservation reservation :
                reservationList) {
            reservationDTOList.add(reservationToResrevationDTO(reservation));
        }
        return reservationDTOList;
    }

    public List<ReservationDTO> listResrvationsByUserId(Long userId){
        List<Reservation> reservationList = reservationRepository.findByUser_id(userId);
        List<ReservationDTO> reservationDTOList = new ArrayList<>();
        for (Reservation reservation :
                reservationList) {
            reservationDTOList.add(reservationToResrevationDTO(reservation));
        }
        return reservationDTOList;
    }

    public ReservationDTO reservationToResrevationDTO(Reservation reservation){
        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setUser_id(reservation.getUser().getId());
        reservationDTO.setProduct(new ReservationProductDTO(reservation.getProduct()));
        reservationDTO.setId(reservation.getId());
        reservationDTO.setHourStartReservation(reservation.getHourStartReservation());
        reservationDTO.setStartReservation(reservation.getReservationStartTime());
        reservationDTO.setEndReservation(reservation.getReservationFinishTime());
        reservationDTO.setReview(reviewService.getReviewByReservation(reservation));
        return reservationDTO;
    }
    private Reservation reservationDtoToReservation(ReservationDTO reservationDTO){
        Reservation reservation = new Reservation();
        User user = new User();

        user.setId(reservationDTO.getUser_id());
        reservation.setId(reservationDTO.getId());
        reservation.setHourStartReservation(reservationDTO.getHourStartReservation());
        reservation.setReservationStartTime(reservationDTO.getStartReservation());
        reservation.setReservationFinishTime(reservationDTO.getEndReservation());
        reservation.setProduct(productRepository.findById(reservationDTO.getProduct().getId()).get());
        reservation.setUser(user);

        return reservation;
    }



}
