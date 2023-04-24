package com.equipo_7.ProyectoIntegrador.Service;


import com.equipo_7.ProyectoIntegrador.Dto.UserDTO;
import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Model.EmailToken;
import com.equipo_7.ProyectoIntegrador.Model.Role;
import com.equipo_7.ProyectoIntegrador.Model.User;
import com.equipo_7.ProyectoIntegrador.Repository.RoleRepository;
import com.equipo_7.ProyectoIntegrador.Repository.UserRepository;
import com.equipo_7.ProyectoIntegrador.Security.PasswordEncoder;
import com.equipo_7.ProyectoIntegrador.Security.TokenBlacklist;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private EmailTokenService emailTokenService;
    private Email email;
    @Value("${password}")
    private String password;
    private static final Logger LOGGER = Logger.getLogger(UserService.class);

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, EmailTokenService emailTokenService, Email email) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.emailTokenService = emailTokenService;
        this.email = email;
    }

    public List<User> listAllUsers(){
        LOGGER.info("Returning all users");
        return userRepository.findAll();

    }

    public void deleteUserById(Long id){
        LOGGER.info("Deleting user with id: " + id);
        userRepository.deleteById(id);
    }

    public User saveUser(User user) throws HttpClientErrorException, BadRequestException, MessagingException {
        if (user.getName().trim().isEmpty() || user.getLastname().trim().isEmpty()){
            throw new BadRequestException("Name and lastname cannot be empty");
        }
        Optional<User> userOptional = searchUserByEmail(user.getEmail());
        if(userOptional.isPresent()){
            throw new HttpClientErrorException("Email already in use");
        }

        Role role =  new Role();
        Boolean isAdmin = false;
        if(user.getAdmin_secret() != null) {
            isAdmin = user.getAdmin_secret().equals(password);
        }

        if(isAdmin){
            Optional<Role> roleOptionalAdmin = roleRepository.findByName("ROLE_ADMIN");
            if (roleOptionalAdmin.isPresent()){
                role=roleOptionalAdmin.get();
            }else {
                role.setName("ROLE_ADMIN");
            }
        }else {
            Optional<Role> roleOptional = roleRepository.findByName("ROLE_USER");
            if (roleOptional.isPresent()){
                role=roleOptional.get();
            }else {
                role.setName("ROLE_USER");
            }
        }
        user.setRole(role);
        user.setPassword(passwordEncoder.bCryptPasswordEncoder().encode(user.getPassword()));
        user.setEmailValid(false);
        LOGGER.info("Adding new user to database");
        User user1 = userRepository.save(user);

        String tokenForEmail = UUID.randomUUID().toString();
        EmailToken emailToken = new EmailToken(tokenForEmail, LocalDateTime.now(),LocalDateTime.now().plusMinutes(15), user1);
        emailTokenService.saveEmailToken(emailToken);
        email.sendVerificationEmail(user.getEmail(), "Email verification",user.getName() + " " + user.getLastname(),tokenForEmail);

        return user1;
    }

    public void sendEmailAgain(Long id) throws MessagingException, BadRequestException {
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isEmpty()){
            throw new BadRequestException("User not found");
        }
        User user = userOptional.get();
        String tokenForEmail = UUID.randomUUID().toString();
        EmailToken emailToken = new EmailToken(tokenForEmail, LocalDateTime.now(),LocalDateTime.now().plusMinutes(15), user);
        emailTokenService.saveEmailToken(emailToken);
        email.sendVerificationEmail(user.getEmail(), "Email verification",user.getName() + " " + user.getLastname(),tokenForEmail);

    }

    public UserDTO searchUserById(Long id) throws BadRequestException{
        LOGGER.info("Returning user with id: " + id);
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return new UserDTO(user.get());
        }else {
            throw new BadRequestException("User not found");
        }
    }

    public Optional<User> searchUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void updateUser(UserDTO userDTO, Long id) throws ResourceNotFoundException {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()){
            throw new ResourceNotFoundException("User not found");
        }
        User user = userOptional.get();
        user.setName(userDTO.getName());
        user.setLastname(userDTO.getLastname());
        user.setEmail(userDTO.getEmail());
        user.setCity(userDTO.getCity());
        user.setProfileUrl(userDTO.getProfileUrl());

        LOGGER.info("Updating user with id: " + userDTO.getId());
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(username);
        if(userOptional.isPresent()){
            return userOptional.get();
        }else {
            throw new UsernameNotFoundException("Email not found in database");
        }
    }

    public void logout(String token){
        LOGGER.info("New token added to the blacklist");
        TokenBlacklist.addToBlacklist(token);
    }

    public ResponseEntity<String> validateEmail(String token) throws ResourceNotFoundException {
        EmailToken emailToken = emailTokenService.searchByToken(token);
        Optional<User> userOptional = userRepository.findById(emailToken.getUser().getId());
        if (userOptional.isPresent()){
            User user = userOptional.get();
            user.setEmailValid(true);
            userRepository.save(user);
            emailTokenService.deleteToken(emailToken.getId());
            return ResponseEntity.ok("Email verified");
        }else {
            throw new ResourceNotFoundException("User not found");
        }
    }

}
