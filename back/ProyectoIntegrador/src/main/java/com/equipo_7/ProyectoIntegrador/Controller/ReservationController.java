package com.equipo_7.ProyectoIntegrador.Controller;

import com.equipo_7.ProyectoIntegrador.Dto.ReservationDTO;
import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Security.JwtTokenUtil;
import com.equipo_7.ProyectoIntegrador.Service.ReservationService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/")
@Api(tags = "reservation", description = "Acceso a las reservas")
public class ReservationController {
    private ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }


    @GetMapping("product/{idProduct}/reservation")
    public ResponseEntity<List<ReservationDTO>> listReservationsDTO(@PathVariable Long idProduct){
        return ResponseEntity.ok(reservationService.getReservationsByProduct_id(idProduct));
    }

    @PostMapping("product/{idProduct}/reservation")
    public ResponseEntity<ReservationDTO> saveReservation(@RequestBody ReservationDTO reservationDTO, @RequestHeader("Authorization") String authHeader, @PathVariable("idProduct") Long productId) throws HttpClientErrorException {
        String token = authHeader.replace("Bearer ", "");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(token);
        Long userId = Long.parseLong(jwtTokenUtil.getClaimFromTokenByName("id").toString());
        reservationDTO.setUser_id(userId);
        return ResponseEntity.ok(reservationService.saveReservation(reservationDTO, productId));
    }

    @GetMapping("product/{idProduct}/reservation/{id}")
    public ResponseEntity<ReservationDTO> searchReservation(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        Optional<ReservationDTO> reservationDTOOptional = reservationService.searchReservationById(id);
        if (reservationDTOOptional.isPresent()){
            return ResponseEntity.ok(reservationDTOOptional.get());
        }
        else{
            throw  new ResourceNotFoundException("Reservation with id " + id + " not found");
        }
    }


    @DeleteMapping("product/{idProduct}/reservation/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable(name = "id") Long id) throws ResourceNotFoundException{
        Optional<ReservationDTO> reservationDTOOptional  = reservationService.searchReservationById(id);
        if(reservationDTOOptional.isPresent()){
            reservationService.deleteReservationById(id);
            return ResponseEntity.ok("Reservation " + reservationDTOOptional.get().getId() + " has been eliminated");
        }
        else {
            throw new ResourceNotFoundException("Reservation with id " + id + " not found");
        }
    }

    @PutMapping("product/{idProduct}/reservation")
    public ResponseEntity<String> updateReservation(@RequestBody ReservationDTO reservationDTO, @RequestHeader("Authorization") String authHeader, @PathVariable("idProduct") Long productId) throws BadRequestException {
        String token = authHeader.replace("Bearer ", "");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(token);
        Long userId = Long.parseLong(jwtTokenUtil.getClaimFromTokenByName("id").toString());
        reservationDTO.setUser_id(userId);
        reservationService.updateReservation(reservationDTO, productId);
        return ResponseEntity.ok("Reservation has been updated");
    }

    @GetMapping("user/bookings")
    public ResponseEntity<List<ReservationDTO>> listReservationsByUser( @RequestHeader("Authorization") String authHeader){
        String token = authHeader.replace("Bearer ", "");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(token);
        Long userId = Long.parseLong(jwtTokenUtil.getClaimFromTokenByName("id").toString());
        List<ReservationDTO> reservationDTOList = reservationService.listResrvationsByUserId(userId);
        return ResponseEntity.ok(reservationDTOList);
    }

    @GetMapping("user/{id}/bookings")
    public ResponseEntity<List<ReservationDTO>> listReservationsByUser(@PathVariable("id") Long userId){
        List<ReservationDTO> reservationDTOList = reservationService.listResrvationsByUserId(userId);
        return ResponseEntity.ok(reservationDTOList);
    }

    @GetMapping("reservation")
    public ResponseEntity<List<ReservationDTO>> listReservations(){
        return ResponseEntity.ok(reservationService.listAllReservations());
    }
}
