package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeEnseignementDispense;
import com.ird.faa.dao.referentiel.TypeEnseignementDispenseDao;
import com.ird.faa.service.admin.facade.referentiel.TypeEnseignementDispenseAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeEnseignementDispenseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeEnseignementDispenseAdminServiceImpl extends AbstractServiceImpl<TypeEnseignementDispense> implements TypeEnseignementDispenseAdminService {

    @Autowired
    private TypeEnseignementDispenseDao typeEnseignementDispenseDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeEnseignementDispense> findAll() {
        return typeEnseignementDispenseDao.findAll();
    }

    @Override
    public TypeEnseignementDispense findByCode(String code) {
        if (code == null) return null;
        return typeEnseignementDispenseDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeEnseignementDispenseDao.deleteByCode(code);
    }

    @Override
    public TypeEnseignementDispense findByIdOrCode(TypeEnseignementDispense typeEnseignementDispense) {
        TypeEnseignementDispense resultat = null;
        if (typeEnseignementDispense == null || (typeEnseignementDispense.getCode() == null && typeEnseignementDispense.getId() == null))
            return resultat;
        else {
            if (typeEnseignementDispense.getId() != null) {
                resultat = typeEnseignementDispenseDao.findById(typeEnseignementDispense.getId()).get();
            } else if (StringUtil.isNotEmpty(typeEnseignementDispense.getCode())) {
                resultat = typeEnseignementDispenseDao.findByCode(typeEnseignementDispense.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeEnseignementDispense findById(Long id) {
        if (id == null) return null;
        return typeEnseignementDispenseDao.getOne(id);
    }

    @Override
    public TypeEnseignementDispense findByIdWithAssociatedList(Long id) {
        TypeEnseignementDispense typeEnseignementDispense = findById(id);
        return typeEnseignementDispense;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeEnseignementDispenseDao.findById(id) == null) return 0;
        else {
            typeEnseignementDispenseDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeEnseignementDispense update(TypeEnseignementDispense typeEnseignementDispense) {
        TypeEnseignementDispense foundedTypeEnseignementDispense = findById(typeEnseignementDispense.getId());
        if (foundedTypeEnseignementDispense == null) return null;
        else {
            prepare(typeEnseignementDispense);

            return typeEnseignementDispenseDao.save(typeEnseignementDispense);
        }
    }

    @Override
    public TypeEnseignementDispense save(TypeEnseignementDispense typeEnseignementDispense) {
        TypeEnseignementDispense foundedTypeEnseignementDispense = findByCode(typeEnseignementDispense.getCode());
        if (foundedTypeEnseignementDispense != null) return null;


        prepare(typeEnseignementDispense);

        TypeEnseignementDispense savedTypeEnseignementDispense = typeEnseignementDispenseDao.save(typeEnseignementDispense);
        return savedTypeEnseignementDispense;
    }

    @Override
    public List<TypeEnseignementDispense> save(List<TypeEnseignementDispense> typeEnseignementDispenses) {
        List<TypeEnseignementDispense> list = new ArrayList<TypeEnseignementDispense>();
        for (TypeEnseignementDispense typeEnseignementDispense : typeEnseignementDispenses) {
            list.add(save(typeEnseignementDispense));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeEnseignementDispense typeEnseignementDispense) {
        if (typeEnseignementDispense.getCode() == null) return -1;

        TypeEnseignementDispense foundedTypeEnseignementDispense = findByCode(typeEnseignementDispense.getCode());
        if (foundedTypeEnseignementDispense == null) return -1;
        typeEnseignementDispenseDao.delete(foundedTypeEnseignementDispense);
        return 1;
    }


    public List<TypeEnseignementDispense> findByCriteria(TypeEnseignementDispenseVo typeEnseignementDispenseVo) {

        String query = "SELECT o FROM TypeEnseignementDispense o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeEnseignementDispenseVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeEnseignementDispenseVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeEnseignementDispenseVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeEnseignementDispense> typeEnseignementDispenses) {
        if (ListUtil.isNotEmpty(typeEnseignementDispenses)) {
            typeEnseignementDispenses.forEach(e -> typeEnseignementDispenseDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeEnseignementDispense> typeEnseignementDispenses) {
        if (ListUtil.isNotEmpty(typeEnseignementDispenses)) {
            typeEnseignementDispenses.forEach(e -> typeEnseignementDispenseDao.save(e));
        }
    }


    @Override
    public List<List<TypeEnseignementDispense>> getToBeSavedAndToBeDeleted(List<TypeEnseignementDispense> oldList, List<TypeEnseignementDispense> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
