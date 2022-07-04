package com.ird.faa.security.common;

import java.util.stream.Stream;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ird.faa.FaaApplication;
import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.security.bean.User;
import com.ird.faa.security.service.facade.UserService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;


@Service
public class SecurityUtil {

    public static User getCurrentUser() {
        UserService userService= FaaApplication.getCtx().getBean(UserService.class);

        SecurityContext securityContext = SecurityContextHolder.getContext();
        Object user = securityContext.getAuthentication().getPrincipal();
        System.out.println(user);
        if (user instanceof String) {
            return userService.findByUsername((String) user);
        } else if (user instanceof User) {
            return (User) user;
        } else {
            return null;
        }
    }

    
    public static Chercheur getCurrentChercheur() {
        ChercheurAdminService chercheurService= FaaApplication.getCtx().getBean(ChercheurAdminService.class);

        SecurityContext securityContext = SecurityContextHolder.getContext();
        Object chercheur = securityContext.getAuthentication().getPrincipal();
        System.out.println(chercheur);
        if (chercheur instanceof String) {
            return chercheurService.findByUsername((String) chercheur);
        } else if (chercheur instanceof Chercheur) {
            return (Chercheur) chercheur;
        } else {
            return null;
        }
    }


    public static boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null &&
        getAuthorities(authentication).noneMatch(AuthoritiesConstants.anonymous::equals);
    }


    public static boolean isCurrentUserInRole(String authority) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null &&
        getAuthorities(authentication).anyMatch(authority::equals);
    }

    private static Stream<String> getAuthorities(Authentication authentication) {
        return authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority);
        }

}
