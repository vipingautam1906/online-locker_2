package com.locker.security;

import com.locker.security.entity.CurrentRequestUser;
import com.locker.security.entity.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class SecurityInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private SecurityService securityService;

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

        // if address starts from /secured. only then check for access tokens.
        // otherwise user is accessing a public url. no problem.
        // so if secured. then set the user context for this request. in Secured class.
        // checkForSecurity in the request

        if (request.getServletPath().startsWith("/secured")) {
            String accessToken = request.getHeader("AccessToken");

            if (accessToken == null || accessToken.isEmpty())
                throw new RuntimeException("AccessToken header is missing");

            /* fetch from db that actual object.*/

            Security security = securityService.findByAccessToken(Integer.valueOf(accessToken));
            CurrentRequestUser.securedUser = security;
        }

        return true;
    }
}
