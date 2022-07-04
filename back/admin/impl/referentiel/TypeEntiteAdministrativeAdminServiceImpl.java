package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeEntiteAdministrative;
import com.ird.faa.dao.referentiel.TypeEntiteAdministrativeDao;
import com.ird.faa.service.admin.facade.referentiel.TypeEntiteAdministrativeAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeEntiteAdministrativeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeEntiteAdministrativeAdminServiceImpl extends AbstractServiceImpl<TypeEntiteAdministrative> implements TypeEntiteAdministrativeAdminService {

    @Autowired
    private TypeEntiteAdministrativeDao typeEntiteAdministrativeDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeEntiteAdministrative> findAll() {
        return typeEntiteAdministrativeDao.findAll();
    }

    @Override
    public TypeEntiteAdministrative findByCode(String code) {
        if (code == null) return null;
        return typeEntiteAdministrativeDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeEntiteAdministrativeDao.deleteByCode(code);
    }

    @Override
    public TypeEntiteAdministrative findByIdOrCode(TypeEntiteAdministrative typeEntiteAdministrative) {
        TypeEntiteAdministrative resultat = null;
        if (typeEntiteAdministrative == null || (typeEntiteAdministrative.getCode() == null && typeEntiteAdministrative.getId() == null))
            return resultat;
        else {
            if (typeEntiteAdministrative.getId() != null) {
                resultat = typeEntiteAdministrativeDao.findById(typeEntiteAdministrative.getId()).get();
            } else if (StringUtil.isNotEmpty(typeEntiteAdministrative.getCode())) {
                resultat = typeEntiteAdministrativeDao.findByCode(typeEntiteAdministrative.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeEntiteAdministrative findById(Long id) {
        if (id == null) return null;
        return typeEntiteAdministrativeDao.getOne(id);
    }

    @Override
    public TypeEntiteAdministrative findByIdWithAssociatedList(Long id) {
        TypeEntiteAdministrative typeEntiteAdministrative = findById(id);
        return typeEntiteAdministrative;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeEntiteAdministrativeDao.findById(id) == null) return 0;
        else {
            typeEntiteAdministrativeDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeEntiteAdministrative update(TypeEntiteAdministrative typeEntiteAdministrative) {
        TypeEntiteAdministrative foundedTypeEntiteAdministrative = findById(typeEntiteAdministrative.getId());
        if (foundedTypeEntiteAdministrative == null) return null;
        else {
            prepare(typeEntiteAdministrative);
            return typeEntiteAdministrativeDao.save(typeEntiteAdministrative);
        }
    }

    @Override
    public TypeEntiteAdministrative save(TypeEntiteAdministrative typeEntiteAdministrative) {
        TypeEntiteAdministrative foundedTypeEntiteAdministrative = findByCode(typeEntiteAdministrative.getCode());
        if (foundedTypeEntiteAdministrative != null) return null;

        prepare(typeEntiteAdministrative);

        TypeEntiteAdministrative savedTypeEntiteAdministrative = typeEntiteAdministrativeDao.save(typeEntiteAdministrative);
        return savedTypeEntiteAdministrative;
    }

    @Override
    public List<TypeEntiteAdministrative> save(List<TypeEntiteAdministrative> typeEntiteAdministratives) {
        List<TypeEntiteAdministrative> list = new ArrayList<TypeEntiteAdministrative>();
        for (TypeEntiteAdministrative typeEntiteAdministrative : typeEntiteAdministratives) {
            list.add(save(typeEntiteAdministrative));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeEntiteAdministrative typeEntiteAdministrative) {
        if (typeEntiteAdministrative.getCode() == null) return -1;

        TypeEntiteAdministrative foundedTypeEntiteAdministrative = findByCode(typeEntiteAdministrative.getCode());
        if (foundedTypeEntiteAdministrative == null) return -1;
        typeEntiteAdministrativeDao.delete(foundedTypeEntiteAdministrative);
        return 1;
    }


    public List<TypeEntiteAdministrative> findByCriteria(TypeEntiteAdministrativeVo typeEntiteAdministrativeVo) {

        String query = "SELECT o FROM TypeEntiteAdministrative o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeEntiteAdministrativeVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeEntiteAdministrativeVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeEntiteAdministrativeVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeEntiteAdministrative> typeEntiteAdministratives) {
        if (ListUtil.isNotEmpty(typeEntiteAdministratives)) {
            typeEntiteAdministratives.forEach(e -> typeEntiteAdministrativeDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeEntiteAdministrative> typeEntiteAdministratives) {
        if (ListUtil.isNotEmpty(typeEntiteAdministratives)) {
            typeEntiteAdministratives.forEach(e -> typeEntiteAdministrativeDao.save(e));
        }
    }


    @Override
    public List<List<TypeEntiteAdministrative>> getToBeSavedAndToBeDeleted(List<TypeEntiteAdministrative> oldList, List<TypeEntiteAdministrative> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
