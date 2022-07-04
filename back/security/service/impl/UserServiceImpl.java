package com.ird.faa.security.service.impl;

import java.util.*;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.dao.impl.ChercheurDaoImpl;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.converter.formulaire.ChercheurConverter;
import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import  com.ird.faa.security.bean.Role;
import com.ird.faa.security.bean.User;
import com.ird.faa.security.dao.UserDao;

import com.ird.faa.security.service.facade.RoleService;
import com.ird.faa.security.service.facade.UserService;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;

@Service
public class UserServiceImpl extends AbstractServiceImpl<User> implements UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private ChercheurDaoImpl chercheurDaoImpl;
    
    @Autowired
    private ChercheurConverter chercheurConverter;

    @Autowired
    private ChercheurAdminService chercheurAdminService;
    @Autowired
    private RoleService roleService;

    @Autowired
    @Lazy
    PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    EntityManager entityManager;

    @Override
    public List<User> findAllWithoutList(){
        return userDao.findAllWithoutList();
    }

    @Override
    public Set<User> findAllWithCriteria(ChercheurVo chercheurVo){
        List<User> usersResult = findByCriteria(chercheurVo);

        List<Chercheur> resultList = chercheurAdminService.findByCriteria(chercheurVo);
        List<User> chercheursResult = findUserBasedOnChercheur(resultList);

        for (User user : usersResult) {
            if (user.getPasswordChanged())
                user.setRole("Pilot");
            else
                user.setRole("Admin");
        }

        return ListUtil.toSet(usersResult,chercheursResult);
    }

    @Override
    public List<User> findUserBasedOnChercheur(List<Chercheur> chercheurs){
//        List<Chercheur> allChercheurs = chercheurDaoImpl.getAllChercheurs();
//        List<Chercheur> allChercheurs = chercheurAdminService.findAll();
        List<User> result = new ArrayList<>();
        for (Chercheur chercheur : chercheurs) {
            result.add(chercheurToUser(chercheur));
        }
        return result;
    }


        private User chercheurToUser(Chercheur chercheur){
            User user = new User();
            user.setArchive(chercheur.getArchive());
            user.setDateArchivage(chercheur.getDateArchivage());
            user.setDateCreation(chercheur.getDateCreation());
            user.setNom(chercheur.getNom());
            user.setId(chercheur.getId());
            user.setNumeroMatricule(chercheur.getNumeroMatricule());
            user.setPasswordChanged(chercheur.getPasswordChanged());
            user.setEmail(chercheur.getEmail());
            user.setPrenom(chercheur.getPrenom());
            user.setUsername(chercheur.getUsername());
            user.setPassword(chercheur.getPassword());
            user.setRoles(chercheur.getRoles());
            user.setEnabled(chercheur.getEnabled());
            user.setRole("Chercheur");
            return user;
    } 
    

    @Override
    public User findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }
    @Override
    public List<User> findAllPiloteDeDonnees(){
        String query = "SELECT u from User u WHERE u.passwordChanged = true";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public User findByUsername(String username) {
        if (username == null)
            return null;
        return userDao.findByUsername(username);
    }

    @Override
    public User findByUsernameWithRoles(String username) {
        if (username == null)
            return null;
        return userDao.findByUsername(username);
    }

    @Override
    @Transactional
    public int deleteByUsername(String username) {
        return userDao.deleteByUsername(username);
    }

    @Override
    public User findById(Long id) {
        if (id == null)
            return null;
        return userDao.getOne(id);
    }

    @Transactional
    public void deleteById(Long id) {
        userDao.deleteById(id);
    }


    public void prepareUser(User user) {

        User foundedUserByUsername = findByUsername(user.getUsername());
        User foundedUserByEmail = userDao.findByEmail(user.getEmail());
        if (foundedUserByUsername != null || foundedUserByEmail != null) return ;
        else {
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                user.setPassword((user.getUsername()));
            }
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            user.setAccountNonExpired(true);
            user.setAccountNonLocked(true);
            user.setCredentialsNonExpired(true);
            user.setEnabled(true);
            user.setPasswordChanged(false);
            user.setDateCreation(new Date());

            if (user.getRoles() != null) {
                Collection<Role> roles = new ArrayList<Role>();
                for (Role role : user.getRoles()) {
                    roles.add(roleService.save(role));
                }
                user.setRoles(roles);
            }
        }



    }


    @Override
    public User save(User user) {
        User foundedUserByUsername = findByUsername(user.getUsername());
        User foundedUserByEmail = findByEmail(user.getEmail());
        Chercheur foundedChercheurByEmail = chercheurAdminService.findByEmail(user.getEmail());
        if (foundedUserByUsername != null) return null;
//        else if(foundedUserByEmail != null || foundedChercheurByEmail != null ){
//            throw new ResponseStatusException(HttpStatus.valueOf(512));
//        }
        else {
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                user.setPassword((user.getUsername()));
            }
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            user.setAccountNonExpired(true);
            user.setAccountNonLocked(true);
            user.setCredentialsNonExpired(true);
            user.setEnabled(true);
            if (user.getPasswordChanged()!= true) {
                user.setPasswordChanged(false);
            }
            prepare(user);
            user.setDateCreation(new Date());

            if (user.getRoles() != null) {
                Collection<Role> roles = new ArrayList<Role>();
                for (Role role : user.getRoles()) {
                    roles.add(roleService.save(role));
                }
                user.setRoles(roles);
            }
            User mySaved = userDao.save(user);

            return mySaved;
        }
    }

    @Override
    public User update(User user) {
        User foundedUser = findById(user.getId());
        User foundedUserByEmail = findByEmail(user.getEmail());
        Chercheur foundedChercheurByEmail = chercheurAdminService.findByEmail(user.getEmail());

        if (foundedUser == null) return null;

        else {
            if (!foundedUser.getEmail().equals(user.getEmail()) && (foundedUserByEmail != null || foundedChercheurByEmail != null)) {
                throw new ResponseStatusException(HttpStatus.valueOf(512));
            }
            foundedUser.setEmail(user.getEmail());
            foundedUser.setUsername(user.getUsername());
            foundedUser.setPrenom(user.getPrenom());
            foundedUser.setArchive(user.getArchive());
            foundedUser.setDateArchivage(user.getDateArchivage());
            foundedUser.setNom(user.getNom());
            foundedUser.setEnabled(user.isEnabled());
            foundedUser.setCredentialsNonExpired(user.isCredentialsNonExpired());
            foundedUser.setAccountNonLocked(user.isAccountNonLocked());
            foundedUser.setAccountNonExpired(user.isAccountNonExpired());
            foundedUser.setAuthorities(new ArrayList<>());
            Collection<Role> roles = new ArrayList<Role>();
            for (Role role : user.getRoles()) {
                roles.add(roleService.save(role));
            }
            prepare(user);
            foundedUser.setRoles(roles);
            return userDao.save(foundedUser);
        }
    }

    @Override
    @Transactional
    public int delete(Long id) {
        User foundedUser = findById(id);
        if (foundedUser == null) return -1;
        userDao.delete(foundedUser);
        return 1;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsernameWithRoles(username);
    }

    public List<User> findByCriteria(ChercheurVo chercheurVo) {

        String query = "SELECT o FROM User o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", chercheurVo.getId());
        query += SearchUtil.addConstraint("o", "numeroMatricule", "LIKE", chercheurVo.getNumeroMatricule());
        query += SearchUtil.addConstraint("o", "email", "LIKE", chercheurVo.getEmail());
        query += SearchUtil.addConstraint("o", "enabled", "=", chercheurVo.getEnabled());
        query += SearchUtil.addConstraint("o", "archive", "=", chercheurVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "createdAt", "=", chercheurVo.getCreatedAt());
        query += SearchUtil.addConstraintDate("o", "updatedAt", "=", chercheurVo.getUpdatedAt());
        query += SearchUtil.addConstraint("o", "accountNonExpired", "=", chercheurVo.getAccountNonExpired());
        query += SearchUtil.addConstraint("o", "accountNonLocked", "=", chercheurVo.getAccountNonLocked());
        query += SearchUtil.addConstraint("o", "username", "LIKE", chercheurVo.getUsername());
        query += SearchUtil.addConstraint("o", "password", "LIKE", chercheurVo.getPassword());
        query += SearchUtil.addConstraint("o", "prenom", "LIKE", chercheurVo.getPrenom());
        query += SearchUtil.addConstraint("o", "nom", "LIKE", chercheurVo.getNom());
        query += SearchUtil.addConstraint("o", "role", "LIKE", chercheurVo.getRole());
        query += SearchUtil.addConstraint("o", "passwordChanged", "=", chercheurVo.getPasswordChanged());
        query += SearchUtil.addConstraintMinMaxDate("o", "createdAt", chercheurVo.getCreatedAtMin(),
                chercheurVo.getCreatedAtMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "updatedAt", chercheurVo.getUpdatedAtMin(),
                chercheurVo.getUpdatedAtMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", chercheurVo.getDateArchivageMin(),
                chercheurVo.getDateArchivageMax());


        return entityManager.createQuery(query).getResultList();
    }


}
