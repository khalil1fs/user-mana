package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeReclamation;
import com.ird.faa.dao.referentiel.TypeReclamationDao;
import com.ird.faa.service.admin.facade.referentiel.TypeReclamationAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeReclamationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeReclamationAdminServiceImpl extends AbstractServiceImpl<TypeReclamation> implements TypeReclamationAdminService {

    @Autowired
    private TypeReclamationDao typeReclamationDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeReclamation> findAll() {
        return typeReclamationDao.findAll();
    }

    @Override
    public TypeReclamation findByCode(String code) {
        if (code == null) return null;
        return typeReclamationDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeReclamationDao.deleteByCode(code);
    }

    @Override
    public TypeReclamation findByIdOrCode(TypeReclamation typeReclamation) {
        TypeReclamation resultat = null;
        if (typeReclamation == null || (typeReclamation.getCode() == null && typeReclamation.getId() == null))
            return resultat;
        else {
            if (typeReclamation.getId() != null) {
                resultat = typeReclamationDao.findById(typeReclamation.getId()).get();
            } else if (StringUtil.isNotEmpty(typeReclamation.getCode())) {
                resultat = typeReclamationDao.findByCode(typeReclamation.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeReclamation findById(Long id) {
        if (id == null) return null;
        return typeReclamationDao.getOne(id);
    }

    @Override
    public TypeReclamation findByIdWithAssociatedList(Long id) {
        TypeReclamation typeReclamation = findById(id);
        return typeReclamation;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeReclamationDao.findById(id) == null) return 0;
        else {
            typeReclamationDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeReclamation update(TypeReclamation typeReclamation) {
        TypeReclamation foundedTypeReclamation = findById(typeReclamation.getId());
        if (foundedTypeReclamation == null) return null;
        else {
            prepare(typeReclamation);
            return typeReclamationDao.save(typeReclamation);
        }
    }

    @Override
    public TypeReclamation save(TypeReclamation typeReclamation) {
        TypeReclamation foundedTypeReclamation = findByCode(typeReclamation.getCode());
        if (foundedTypeReclamation != null) return null;

        prepare(typeReclamation);
        TypeReclamation savedTypeReclamation = typeReclamationDao.save(typeReclamation);
        return savedTypeReclamation;
    }

    @Override
    public List<TypeReclamation> save(List<TypeReclamation> typeReclamations) {
        List<TypeReclamation> list = new ArrayList<TypeReclamation>();
        for (TypeReclamation typeReclamation : typeReclamations) {
            list.add(save(typeReclamation));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeReclamation typeReclamation) {
        if (typeReclamation.getCode() == null) return -1;

        TypeReclamation foundedTypeReclamation = findByCode(typeReclamation.getCode());
        if (foundedTypeReclamation == null) return -1;
        typeReclamationDao.delete(foundedTypeReclamation);
        return 1;
    }


    public List<TypeReclamation> findByCriteria(TypeReclamationVo typeReclamationVo) {

        String query = "SELECT o FROM TypeReclamation o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeReclamationVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeReclamationVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeReclamationVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeReclamation> typeReclamations) {
        if (ListUtil.isNotEmpty(typeReclamations)) {
            typeReclamations.forEach(e -> typeReclamationDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeReclamation> typeReclamations) {
        if (ListUtil.isNotEmpty(typeReclamations)) {
            typeReclamations.forEach(e -> typeReclamationDao.save(e));
        }
    }


    @Override
    public List<List<TypeReclamation>> getToBeSavedAndToBeDeleted(List<TypeReclamation> oldList, List<TypeReclamation> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
