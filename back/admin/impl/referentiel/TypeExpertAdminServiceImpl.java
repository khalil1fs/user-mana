package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeExpert;
import com.ird.faa.dao.referentiel.TypeExpertDao;
import com.ird.faa.service.admin.facade.referentiel.TypeExpertAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeExpertVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeExpertAdminServiceImpl extends AbstractServiceImpl<TypeExpert> implements TypeExpertAdminService {

    @Autowired
    private TypeExpertDao typeExpertDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeExpert> findAll() {
        return typeExpertDao.findAll();
    }

    @Override
    public TypeExpert findByCode(String code) {
        if (code == null) return null;
        return typeExpertDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeExpertDao.deleteByCode(code);
    }

    @Override
    public TypeExpert findByIdOrCode(TypeExpert typeExpert) {
        TypeExpert resultat = null;
        if (typeExpert == null || (typeExpert.getCode() == null && typeExpert.getId() == null))
            return resultat;
        else {
            if (typeExpert.getId() != null) {
                resultat = typeExpertDao.findById(typeExpert.getId()).get();
            } else if (StringUtil.isNotEmpty(typeExpert.getCode())) {
                resultat = typeExpertDao.findByCode(typeExpert.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeExpert findById(Long id) {
        if (id == null) return null;
        return typeExpertDao.getOne(id);
    }

    @Override
    public TypeExpert findByIdWithAssociatedList(Long id) {
        TypeExpert typeExpert = findById(id);
        return typeExpert;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeExpertDao.findById(id) == null) return 0;
        else {
            typeExpertDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeExpert update(TypeExpert typeExpert) {
        TypeExpert foundedTypeExpert = findById(typeExpert.getId());
        if (foundedTypeExpert == null) return null;
        else {
            prepare(typeExpert);
            return typeExpertDao.save(typeExpert);
        }
    }

    @Override
    public TypeExpert save(TypeExpert typeExpert) {
        TypeExpert foundedTypeExpert = findByCode(typeExpert.getCode());
        if (foundedTypeExpert != null) return null;

        prepare(typeExpert);

        TypeExpert savedTypeExpert = typeExpertDao.save(typeExpert);
        return savedTypeExpert;
    }

    @Override
    public List<TypeExpert> save(List<TypeExpert> typeExperts) {
        List<TypeExpert> list = new ArrayList<TypeExpert>();
        for (TypeExpert typeExpert : typeExperts) {
            list.add(save(typeExpert));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeExpert typeExpert) {
        if (typeExpert.getCode() == null) return -1;

        TypeExpert foundedTypeExpert = findByCode(typeExpert.getCode());
        if (foundedTypeExpert == null) return -1;
        typeExpertDao.delete(foundedTypeExpert);
        return 1;
    }


    public List<TypeExpert> findByCriteria(TypeExpertVo typeExpertVo) {

        String query = "SELECT o FROM TypeExpert o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeExpertVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeExpertVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeExpertVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeExpert> typeExperts) {
        if (ListUtil.isNotEmpty(typeExperts)) {
            typeExperts.forEach(e -> typeExpertDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeExpert> typeExperts) {
        if (ListUtil.isNotEmpty(typeExperts)) {
            typeExperts.forEach(e -> typeExpertDao.save(e));
        }
    }


    @Override
    public List<List<TypeExpert>> getToBeSavedAndToBeDeleted(List<TypeExpert> oldList, List<TypeExpert> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
