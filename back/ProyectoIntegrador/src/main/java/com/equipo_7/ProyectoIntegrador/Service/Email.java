package com.equipo_7.ProyectoIntegrador.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class Email {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private MailContentBuilder mailContentBuilder;

    public void sendVerificationEmail(String to, String subject, String user, String token) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setFrom("no-reply@digitalBooking.com");
        helper.setSubject(subject);
        String content = mailContentBuilder.buildVerificationEmail(user, token);
        helper.setText(content, true);
        javaMailSender.send(message);
    }
}