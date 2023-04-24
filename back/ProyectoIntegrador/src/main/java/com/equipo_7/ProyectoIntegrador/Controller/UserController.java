package com.equipo_7.ProyectoIntegrador.Controller;

import com.equipo_7.ProyectoIntegrador.Dto.UserDTO;
import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Model.JwtRequest;
import com.equipo_7.ProyectoIntegrador.Model.JwtResponse;
import com.equipo_7.ProyectoIntegrador.Model.User;
import com.equipo_7.ProyectoIntegrador.Security.JwtTokenUtil;
import com.equipo_7.ProyectoIntegrador.Service.UserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;



@CrossOrigin("*")
@RestController
@RequestMapping("/user")
@Api(tags = "user", description = "Acceso a los usuarios")
public class UserController {
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> listUsers(){
        return ResponseEntity.ok(userService.listAllUsers());
    }

    @GetMapping("/my")
    public ResponseEntity<UserDTO> getUserMyInfo(@RequestHeader("Authorization") String authHeader) throws AccessDeniedException, BadRequestException {
        String token = authHeader.replace("Bearer ", "");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(token);
        UserDTO userDTO = userService.searchUserById(jwtTokenUtil.getUserFromToken().getId());
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping
    public ResponseEntity<JwtResponse> saveUser(@RequestBody User user) throws HttpClientErrorException, BadRequestException, MessagingException {
        final User createdUser = userService.saveUser(user);
        final String token = JwtTokenUtil.generateToken(user);

        return new ResponseEntity<>(new JwtResponse(token, user), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> searchUser(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        UserDTO userDTO = userService.searchUserById(id);
        return ResponseEntity.ok(userDTO);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        UserDTO userDTO = userService.searchUserById(id);
        userService.deleteUserById(userDTO.getId());
        return ResponseEntity.ok("User with id: " + id + " has been eliminated");
    }

    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody UserDTO userDTO, @RequestHeader("Authorization") String authHeader) throws BadRequestException, ResourceNotFoundException {
        String token = authHeader.replace("Bearer ", "");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(token);
        Long id = jwtTokenUtil.getUserFromToken().getId();
        userService.updateUser(userDTO, id);
        return ResponseEntity.ok("User has been updated");
    }


    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        final User user = authenticate(authenticationRequest);
        final String token = JwtTokenUtil.generateToken(user);

        return ResponseEntity.ok(new JwtResponse(token, user));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader){
        String token = authHeader.replace("Bearer ", "");
        userService.logout(token);
        return ResponseEntity.ok().build();
    }


    private User authenticate(JwtRequest request) throws Exception {
        User user = null;

        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            user = (User)auth.getPrincipal();
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        return user;
    }

    @GetMapping("/emailToken/{token}")
    public ResponseEntity<?> validateEmail(@PathVariable String token) throws ResourceNotFoundException {
        return userService.validateEmail(token);
    }

    @GetMapping("/sendVerificationEmail")
    public ResponseEntity<?> sendEmailAgain(@RequestHeader("Authorization") String authHeader) throws MessagingException, BadRequestException {
        String token = authHeader.replace("Bearer ", "");
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(token);
        Long id = jwtTokenUtil.getUserFromToken().getId();
        userService.sendEmailAgain(id);
        return ResponseEntity.ok().build();
    }
}
