package com.equipo_7.ProyectoIntegrador.Security;

import java.util.Set;
import java.util.HashSet;

public class TokenBlacklist {

    private static Set<String> blacklist = new HashSet<>();

    public static void addToBlacklist(String token) {
        blacklist.add(token);
    }

    public static boolean isBlacklisted(String token) {
        return blacklist.contains(token);
    }
}