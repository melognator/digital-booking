package com.equipo_7.ProyectoIntegrador.Service;

import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Model.EmailToken;
import com.equipo_7.ProyectoIntegrador.Repository.EmailTokenRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmailTokenService {
    private EmailTokenRepository emailTokenRepository;

    private static final Logger LOGGER = Logger.getLogger(EmailTokenService.class);

    public EmailTokenService(EmailTokenRepository emailTokenRepository) {
        this.emailTokenRepository = emailTokenRepository;
    }


    public EmailToken saveEmailToken(EmailToken emailToken){
        LOGGER.info("Save EmailToken with of user with email " + emailToken.getUser().getEmail());
        return emailTokenRepository.save(emailToken);
    }

    public EmailToken searchByToken(String token) throws ResourceNotFoundException {
        Optional<EmailToken> emailTokenOptional = emailTokenRepository.findByToken(token);
        if(emailTokenOptional.isPresent()){
            EmailToken emailToken = emailTokenOptional.get();
            LOGGER.info("Returning emailToken with id" + emailToken.getId());
            return emailToken;
        }else {
            throw new ResourceNotFoundException("Email token not found in database");
        }
    }

    public void deleteToken(Long id){
        Optional<EmailToken> emailTokenOptional = emailTokenRepository.findById(id);
        if (emailTokenOptional.isPresent()){
            emailTokenRepository.deleteById(id);
        }
    }
}
