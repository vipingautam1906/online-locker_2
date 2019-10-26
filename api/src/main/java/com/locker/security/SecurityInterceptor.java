package com.locker.security;

import com.locker.security.entity.CurrentRequestUser;
import com.locker.security.entity.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class SecurityInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private EntityManager entityManager;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

        // if address starts from /secured. only then check for access tokens.
        // otherwise user is accessing a public url. no problem.
        // so if secured. then set the user context for this request. in Secured class.

        // checkForSecurity in the request

        if (request.getServletPath().startsWith("/secured")) {
            String accessToken = request.getHeader("AccessToken");

            if (accessToken == null || accessToken.isEmpty())
                throw new RuntimeException("Access token is missing");

            /* fetch from db that actual object.*/

            Query q = entityManager.createNativeQuery("SELECT * FROM security WHERE access_token = ?")
                    .setParameter(1, Integer.valueOf(accessToken));

            List<Object[]> appUsers = q.getResultList();

            if (appUsers.isEmpty())
                throw new RuntimeException("AccessToken doesn't exists in db.");

            Security security = new Security(appUsers.get(0));

            CurrentRequestUser.securedUser = security;

        }

        return true;
    }
}
