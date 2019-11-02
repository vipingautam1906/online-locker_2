package com.locker.security;

import com.locker.security.entity.Security;
import com.locker.user.UserService;
import com.locker.user.entities.User;
import com.locker.util.Randomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@RestController
@RequestMapping("/public/credentials")
public class CredentialsController {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @PostMapping("/login")
    @Transactional
    public ResponseEntity<Security> doLogin(@RequestBody User user) {

        // first check whether this email/password combination exists.
        // if yes. then insert a record in security table. and return that too.
        // otherwise tell user that email/password is invalid.

        User loginUser = userService.getByEmailAndPassword(user.email, user.password);

        Security security = securityService.getByUserId(loginUser.id);
        if (security != null)
            return ResponseEntity.ok(security);

        Security sec = new Security();
        sec.id = Randomizer.generateInt();
        sec.userId = loginUser.id;
        sec.accessToken = Randomizer.generateInt();

        securityService.save(sec);

        return ResponseEntity.ok(sec);
    }

    @DeleteMapping("/logout/{securityTokenId}")
    @Transactional
    public void doLogout(@PathVariable Integer securityTokenId) {
        securityService.deleteById(securityTokenId);
    }
}
