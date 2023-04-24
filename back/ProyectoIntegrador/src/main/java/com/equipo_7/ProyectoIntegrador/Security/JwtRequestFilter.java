package com.equipo_7.ProyectoIntegrador.Security;

import com.equipo_7.ProyectoIntegrador.Service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = Logger.getLogger(JwtRequestFilter.class);

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(jwtToken);

            try {
                username = jwtTokenUtil.getUsernameFromToken();
                validateToken(jwtTokenUtil, username, chain, request, response);
            } catch (IllegalArgumentException e) {
                LOGGER.error("Unable to get JWT Token", e);
            } catch (ExpiredJwtException e) {
                LOGGER.error("JWT Token has expired", e);
            }
        } else {
            chain.doFilter(request, response);
        }
    }


    private void validateToken(JwtTokenUtil jwtTokenUtil, String username, FilterChain chain, HttpServletRequest request,
                               HttpServletResponse response) throws ServletException, IOException {

        // Once we get the token validate it.
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userService.loadUserByUsername(username);

            // if token is valid configure Spring Security to manually set
            // authentication
            if (jwtTokenUtil.validateToken(userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // After setting the Authentication in the context, we specify
                // that the current user is authenticated. So it passes the
                // Spring Security Configurations successfully.
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        chain.doFilter(request, response);
    }
}
