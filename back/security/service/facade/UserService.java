package com.ird.faa.security.service.facade;

import java.util.List;
import java.util.Set;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurVo;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;

import com.ird.faa.security.bean.User;

public interface UserService extends UserDetailsService {

    Set<User> findAllWithCriteria(ChercheurVo chercheurVo);

    List<User> findUserBasedOnChercheur(List<Chercheur> chercheurs);

    List<User> findAllWithoutList();

    User findByEmail(String email);

    List<User> findAll();

    List<User> findAllPiloteDeDonnees();

    User findByUsername(String username);

    User findById(Long id);

    void deleteById(Long id);

    User save(User user);

    User update(User user);

    int delete(Long id);

    User findByUsernameWithRoles(String username);

    int  deleteByUsername(String username);

    public UserDetails loadUserByUsername(String username);

    public void prepareUser(User user);

}
