package com.locker.security;

import com.locker.security.entity.Security;
import com.locker.user.UserRepository;
import com.locker.user.entities.User;
import com.locker.util.Randomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

/**
 * CredentialsController helps in doing loging and logout in the application.
 * Given the user's email and password, this controller asks repository
 * to see if that emaild/password combination exits. if not then simply
 * either email or password is wrong.
 * <p>
 * If a combination exists in the system, check its already
 * generated security entity record.
 * if there is already a security record generated in db, then just return
 * it otherwise create a new one. and then return security object.
 */
@RestController
@RequestMapping("/public/credentials")
public class CredentialsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityRepository securityRepository;

    /**
     * this method takes email/password fields from user object, and checks its
     * existence in db for security
     * @param user UI should pass email and password in this object.
     * @return saved/fetched security object from db.
     */
    @PostMapping("/login")
    @Transactional
    public ResponseEntity<Security> doLogin(@RequestBody User user) {

        /* first check whether this email/password combination exists.
            if yes. then insert a record in security table. and return that too.
            otherwise tell user that email/password is invalid.
         */
        User loginUser = userRepository.getByEmailAndPassword(
                user.email, user.password);

        Security security = securityRepository.getByUserId(loginUser.id);
        if (security != null)
            return ResponseEntity.ok(security);

        Security sec = new Security();
        sec.id = Randomizer.generateInt();
        sec.userId = loginUser.id;
        sec.accessToken = Randomizer.generateInt();

        securityRepository.save(sec);

        return ResponseEntity.ok(sec);
    }

    /**
     * this method simply removes security table row for given
     * tokenId via repository call.
     * @param securityTokenId
     */
    @DeleteMapping("/logout/{securityTokenId}")
    @Transactional
    public void doLogout(@PathVariable Integer securityTokenId) {
        securityRepository.deleteById(securityTokenId);
    }
}
