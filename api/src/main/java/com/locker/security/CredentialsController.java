package com.locker.security;

import com.locker.security.entity.CurrentRequestUser;
import com.locker.security.entity.Security;
import com.locker.util.Randomizer;
import com.locker.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/public/credentials")
public class CredentialsController {

    @Autowired
    private EntityManager entityManager;

    @PostMapping("/login")
    @Transactional
    public ResponseEntity<Security> doLogin(@RequestBody User user) {

        // first check whether this email/password combination exists.
        // if yes. then insert a record in security table. and return that too.
        // otherwise tell user that email/password is invalid.

        Query q = entityManager.createNativeQuery("SELECT * FROM app_user WHERE email=? AND password=?")
                .setParameter(1, user.email)
                .setParameter(2, user.password);

        List<Object[]> appUsers = q.getResultList();

        if (appUsers.isEmpty())
            throw new RuntimeException("User with this email/password doesn't exists");

        User loginUser = new User(appUsers.get(0));


        q = entityManager.createNativeQuery("SELECT * FROM security WHERE user_id = ?")
                .setParameter(1, loginUser.id);

        List<Object[]> securities = q.getResultList();

        if (!securities.isEmpty()) {
            Security security = new Security(securities.get(0));
            return ResponseEntity.ok(security);
        }

        // insert into security table now.
        Security sec = new Security();
        sec.id = Randomizer.generateInt();
        sec.userId = loginUser.id;
        sec.accessToken = Randomizer.generateInt();
        sec.expiryTimestamp = new Date();

        int resultResponse = entityManager.createNativeQuery("INSERT INTO security (id, user_id, access_token, expiry_timestamp) VALUES (?, ?, ?, ?)")
                .setParameter(1, sec.id)
                .setParameter(2, sec.userId)
                .setParameter(3, sec.accessToken)
                .setParameter(4, sec.expiryTimestamp)
                .executeUpdate();
        System.out.println(" insert security db response " + resultResponse);

        return ResponseEntity.ok(sec);

    }

    @DeleteMapping("/logout/{securityTokenId}")
    @Transactional
    public void doLogout(@PathVariable Integer securityTokenId) {
        int resultResponse = entityManager.createNativeQuery("DELETE FROM security WHERE id = ?")
                .setParameter(1, securityTokenId)
                .executeUpdate();
        System.out.println("delete security db response " + resultResponse);
    }

}
