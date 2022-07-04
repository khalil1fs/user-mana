package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeUtilisateur;
import com.ird.faa.dao.referentiel.TypeUtilisateurDao;
import com.ird.faa.service.admin.facade.referentiel.TypeUtilisateurAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeUtilisateurVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeUtilisateurAdminServiceImpl extends AbstractServiceImpl<TypeUtilisateur> implements TypeUtilisateurAdminService {

    @Autowired
    private TypeUtilisateurDao typeUtilisateurDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeUtilisateur> findAll() {
        return typeUtilisateurDao.findAll();
    }

    @Override
    public TypeUtilisateur findByCode(String code) {
        if (code == null) return null;
        return typeUtilisateurDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeUtilisateurDao.deleteByCode(code);
    }

    @Override
    public TypeUtilisateur findByIdOrCode(TypeUtilisateur typeUtilisateur) {
        TypeUtilisateur resultat = null;
        if (typeUtilisateur == null || (typeUtilisateur.getCode() == null && typeUtilisateur.getId() == null))
            return resultat;
        else {
            if (typeUtilisateur.getId() != null) {
                resultat = typeUtilisateurDao.findById(typeUtilisateur.getId()).get();
            } else if (StringUtil.isNotEmpty(typeUtilisateur.getCode())) {
                resultat = typeUtilisateurDao.findByCode(typeUtilisateur.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeUtilisateur findById(Long id) {
        if (id == null) return null;
        return typeUtilisateurDao.getOne(id);
    }

    @Override
    public TypeUtilisateur findByIdWithAssociatedList(Long id) {
        TypeUtilisateur typeUtilisateur = findById(id);
        return typeUtilisateur;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeUtilisateurDao.findById(id) == null) return 0;
        else {
            typeUtilisateurDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeUtilisateur update(TypeUtilisateur typeUtilisateur) {
        TypeUtilisateur foundedTypeUtilisateur = findById(typeUtilisateur.getId());
        if (foundedTypeUtilisateur == null) return null;
        else {
            prepare(typeUtilisateur);

            return typeUtilisateurDao.save(typeUtilisateur);
        }
    }

    @Override
    public TypeUtilisateur save(TypeUtilisateur typeUtilisateur) {
        TypeUtilisateur foundedTypeUtilisateur = findByCode(typeUtilisateur.getCode());
        if (foundedTypeUtilisateur != null) return null;
        prepare(typeUtilisateur);


        TypeUtilisateur savedTypeUtilisateur = typeUtilisateurDao.save(typeUtilisateur);
        return savedTypeUtilisateur;
    }

    @Override
    public List<TypeUtilisateur> save(List<TypeUtilisateur> typeUtilisateurs) {
        List<TypeUtilisateur> list = new ArrayList<TypeUtilisateur>();
        for (TypeUtilisateur typeUtilisateur : typeUtilisateurs) {
            list.add(save(typeUtilisateur));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeUtilisateur typeUtilisateur) {
        if (typeUtilisateur.getCode() == null) return -1;

        TypeUtilisateur foundedTypeUtilisateur = findByCode(typeUtilisateur.getCode());
        if (foundedTypeUtilisateur == null) return -1;
        typeUtilisateurDao.delete(foundedTypeUtilisateur);
        return 1;
    }


    public List<TypeUtilisateur> findByCriteria(TypeUtilisateurVo typeUtilisateurVo) {

        String query = "SELECT o FROM TypeUtilisateur o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeUtilisateurVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeUtilisateurVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeUtilisateurVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeUtilisateur> typeUtilisateurs) {
        if (ListUtil.isNotEmpty(typeUtilisateurs)) {
            typeUtilisateurs.forEach(e -> typeUtilisateurDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeUtilisateur> typeUtilisateurs) {
        if (ListUtil.isNotEmpty(typeUtilisateurs)) {
            typeUtilisateurs.forEach(e -> typeUtilisateurDao.save(e));
        }
    }


    @Override
    public List<List<TypeUtilisateur>> getToBeSavedAndToBeDeleted(List<TypeUtilisateur> oldList, List<TypeUtilisateur> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
