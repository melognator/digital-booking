package com.equipo_7.ProyectoIntegrador.Security;

import com.equipo_7.ProyectoIntegrador.Model.User;
import com.equipo_7.ProyectoIntegrador.Service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class JwtTokenUtil {

    private static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000;
    public static final String SECRET = "mysecret";

    @Autowired
    private UserService userService;
    private String token = null;

    public JwtTokenUtil(String jwtToken) {
        this.token = jwtToken;
    }


    public String getUsernameFromToken() {
        return getClaimFromToken(Claims::getSubject);
    }

    public Date getExpirationDateFromToken() {
        return getClaimFromToken(Claims::getExpiration);
    }


    public <T> T getClaimFromToken(Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken();
        return claimsResolver.apply(claims);
    }


    public Object getClaimFromTokenByName(String name) {
        final Claims claims = getAllClaimsFromToken();
        return claims.get(name);
    }


    public Claims getAllClaimsFromToken() {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }


    private Boolean isTokenExpired() {
        final Date expiration = getExpirationDateFromToken();
        return expiration.before(new Date());
    }


    public static String generateToken(User user) {
        Map<String, Object> claims = addClaims(user);
        return doGenerateToken(claims, user.getUsername());
    }


    private static Map<String, Object> addClaims(User user) {
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("id", user.getId());
        return claims;
    }


    private static String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, SECRET).compact();
    }


    public Boolean validateToken(UserDetails userDetails) {
        final String username = getUsernameFromToken();
        return (username.equals(userDetails.getUsername()) && !isTokenExpired() && !TokenBlacklist.isBlacklisted(token));
    }

    public Boolean validateToken() {
        return (!isTokenExpired());
    }

    public User getUserFromToken() {
        final Claims claims = getAllClaimsFromToken();
        User user = new User();
        user.setId(Long.parseLong(claims.get("id").toString()));
        // Add more user properties to the User object as needed
        return user;
    }
}

