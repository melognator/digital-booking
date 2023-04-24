package com.equipo_7.ProyectoIntegrador.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
@Component
public class MailContentBuilder {
    private final TemplateEngine templateEngine;

    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String buildVerificationEmail(String user, String token) {
        Context context = new Context();
        context.setVariable("user", user);
        context.setVariable("token", token);
        return templateEngine.process("Email_body.html", context);
    }
}
