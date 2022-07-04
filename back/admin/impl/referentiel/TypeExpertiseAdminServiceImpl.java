package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeExpertise;
import com.ird.faa.dao.referentiel.TypeExpertiseDao;
import com.ird.faa.service.admin.facade.referentiel.TypeExpertiseAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeExpertiseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeExpertiseAdminServiceImpl extends AbstractServiceImpl<TypeExpertise> implements TypeExpertiseAdminService {

    @Autowired
    private TypeExpertiseDao typeExpertiseDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeExpertise> findAll() {
        return typeExpertiseDao.findAll();
    }

    @Override
    public TypeExpertise findByCode(String code) {
        if (code == null) return null;
        return typeExpertiseDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeExpertiseDao.deleteByCode(code);
    }

    @Override
    public TypeExpertise findByIdOrCode(TypeExpertise typeExpertise) {
        TypeExpertise resultat = null;
        if (typeExpertise == null || (typeExpertise.getCode() == null && typeExpertise.getId() == null))
            return resultat;
        else {
            if (typeExpertise.getId() != null) {
                resultat = typeExpertiseDao.findById(typeExpertise.getId()).get();
            } else if (StringUtil.isNotEmpty(typeExpertise.getCode())) {
                resultat = typeExpertiseDao.findByCode(typeExpertise.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeExpertise findById(Long id) {
        if (id == null) return null;
        return typeExpertiseDao.getOne(id);
    }

    @Override
    public TypeExpertise findByIdWithAssociatedList(Long id) {
        TypeExpertise typeExpertise = findById(id);
        return typeExpertise;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeExpertiseDao.findById(id) == null) return 0;
        else {
            typeExpertiseDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeExpertise update(TypeExpertise typeExpertise) {
        TypeExpertise foundedTypeExpertise = findById(typeExpertise.getId());
        if (foundedTypeExpertise == null) return null;
        else {
            prepare(typeExpertise);
            return typeExpertiseDao.save(typeExpertise);
        }
    }

    @Override
    public TypeExpertise save(TypeExpertise typeExpertise) {
        TypeExpertise foundedTypeExpertise = findByCode(typeExpertise.getCode());
        if (foundedTypeExpertise != null) return null;

        prepare(typeExpertise);

        TypeExpertise savedTypeExpertise = typeExpertiseDao.save(typeExpertise);
        return savedTypeExpertise;
    }

    @Override
    public List<TypeExpertise> save(List<TypeExpertise> typeExpertises) {
        List<TypeExpertise> list = new ArrayList<TypeExpertise>();
        for (TypeExpertise typeExpertise : typeExpertises) {
            list.add(save(typeExpertise));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeExpertise typeExpertise) {
        if (typeExpertise.getCode() == null) return -1;

        TypeExpertise foundedTypeExpertise = findByCode(typeExpertise.getCode());
        if (foundedTypeExpertise == null) return -1;
        typeExpertiseDao.delete(foundedTypeExpertise);
        return 1;
    }


    public List<TypeExpertise> findByCriteria(TypeExpertiseVo typeExpertiseVo) {

        String query = "SELECT o FROM TypeExpertise o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeExpertiseVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeExpertiseVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeExpertiseVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeExpertise> typeExpertises) {
        if (ListUtil.isNotEmpty(typeExpertises)) {
            typeExpertises.forEach(e -> typeExpertiseDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeExpertise> typeExpertises) {
        if (ListUtil.isNotEmpty(typeExpertises)) {
            typeExpertises.forEach(e -> typeExpertiseDao.save(e));
        }
    }


    @Override
    public List<List<TypeExpertise>> getToBeSavedAndToBeDeleted(List<TypeExpertise> oldList, List<TypeExpertise> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
