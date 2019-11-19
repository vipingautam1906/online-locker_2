package com.locker.security;

import com.locker.security.entity.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Service
public class SecurityRepository {

    @Autowired
    private EntityManager entityManager;

    public void save(Security sec) {
        entityManager.createNativeQuery("INSERT INTO security (id, user_id, access_token) VALUES (?, ?, ?)")
                .setParameter(1, sec.id)
                .setParameter(2, sec.userId)
                .setParameter(3, sec.accessToken)
                .executeUpdate();
    }

    public Security getByUserId(Integer userId) {
        Query q = entityManager.createNativeQuery("SELECT id, user_id, access_token FROM security WHERE user_id = ?")
                .setParameter(1, userId);
        List<Object[]> securities = q.getResultList();
        if (securities.isEmpty())
            return null;
        return new Security(securities.get(0));
    }

    public void deleteById(Integer id) {
        entityManager.createNativeQuery("DELETE FROM security WHERE id = ?")
                .setParameter(1, id)
                .executeUpdate();
    }

    public Security findByAccessToken(Integer accessToken) {
        Query q = entityManager.createNativeQuery("SELECT * FROM security WHERE access_token = ?")
                .setParameter(1, Integer.valueOf(accessToken));

        List<Object[]> appUsers = q.getResultList();

        if (appUsers.isEmpty())
            throw new RuntimeException("AccessToken doesn't exists in db.");

        return new Security(appUsers.get(0));
    }
}
