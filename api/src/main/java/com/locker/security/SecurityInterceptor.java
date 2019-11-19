package com.locker.security;

import com.locker.security.entity.CurrentRequestUser;
import com.locker.security.entity.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * A Crucial Service helps in securing the endpoints before they actually hit.
 * this class extends {@link HandlerInterceptorAdapter } class which has
 * several methods.
 * we have Override preHandle() method here, and checks if the path of request
 * starts with /secured. if yes then check for the access token in that.
 * and do authorization there.
 */
@Service
public class SecurityInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private SecurityRepository securityRepository;

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        // if address starts from /secured. only then check for access tokens.
        // otherwise user is accessing a public url. no problem.
        // so if secured. then set the user context for this request. in
        // Secured class. checkForSecurity in the request

        if (request.getServletPath().startsWith("/secured")) {
            String accessToken = request.getHeader("AccessToken");

            if (accessToken == null || accessToken.isEmpty())
                throw new RuntimeException("AccessToken header is missing");

            /* fetch from db that actual object.*/

            Security security = securityRepository.findByAccessToken(
                    Integer.valueOf(accessToken));
            CurrentRequestUser.securedUser = security;
        }

        return true;
    }
}
