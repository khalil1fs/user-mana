package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeInstance;
import com.ird.faa.dao.referentiel.TypeInstanceDao;
import com.ird.faa.service.admin.facade.referentiel.TypeInstanceAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeInstanceVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeInstanceAdminServiceImpl extends AbstractServiceImpl<TypeInstance> implements TypeInstanceAdminService {

    @Autowired
    private TypeInstanceDao typeInstanceDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeInstance> findAll() {
        return typeInstanceDao.findAll();
    }

    @Override
    public TypeInstance findByCode(String code) {
        if (code == null) return null;
        return typeInstanceDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeInstanceDao.deleteByCode(code);
    }

    @Override
    public TypeInstance findByIdOrCode(TypeInstance typeInstance) {
        TypeInstance resultat = null;
        if (typeInstance == null || (typeInstance.getCode() == null && typeInstance.getId() == null))
            return resultat;
        else {
            if (typeInstance.getId() != null) {
                resultat = typeInstanceDao.findById(typeInstance.getId()).get();
            } else if (StringUtil.isNotEmpty(typeInstance.getCode())) {
                resultat = typeInstanceDao.findByCode(typeInstance.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeInstance findById(Long id) {
        if (id == null) return null;
        return typeInstanceDao.getOne(id);
    }

    @Override
    public TypeInstance findByIdWithAssociatedList(Long id) {
        TypeInstance typeInstance = findById(id);
        return typeInstance;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeInstanceDao.findById(id) == null) return 0;
        else {
            typeInstanceDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeInstance update(TypeInstance typeInstance) {
        TypeInstance foundedTypeInstance = findById(typeInstance.getId());
        if (foundedTypeInstance == null) return null;
        else {
            prepare(typeInstance);
            return typeInstanceDao.save(typeInstance);
        }
    }

    @Override
    public TypeInstance save(TypeInstance typeInstance) {
        TypeInstance foundedTypeInstance = findByCode(typeInstance.getCode());
        if (foundedTypeInstance != null) return null;

        prepare(typeInstance);

        TypeInstance savedTypeInstance = typeInstanceDao.save(typeInstance);
        return savedTypeInstance;
    }

    @Override
    public List<TypeInstance> save(List<TypeInstance> typeInstances) {
        List<TypeInstance> list = new ArrayList<TypeInstance>();
        for (TypeInstance typeInstance : typeInstances) {
            list.add(save(typeInstance));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeInstance typeInstance) {
        if (typeInstance.getCode() == null) return -1;

        TypeInstance foundedTypeInstance = findByCode(typeInstance.getCode());
        if (foundedTypeInstance == null) return -1;
        typeInstanceDao.delete(foundedTypeInstance);
        return 1;
    }


    public List<TypeInstance> findByCriteria(TypeInstanceVo typeInstanceVo) {

        String query = "SELECT o FROM TypeInstance o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeInstanceVo.getId());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeInstanceVo.getCode());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeInstanceVo.getLibelle());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeInstance> typeInstances) {
        if (ListUtil.isNotEmpty(typeInstances)) {
            typeInstances.forEach(e -> typeInstanceDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeInstance> typeInstances) {
        if (ListUtil.isNotEmpty(typeInstances)) {
            typeInstances.forEach(e -> typeInstanceDao.save(e));
        }
    }


    @Override
    public List<List<TypeInstance>> getToBeSavedAndToBeDeleted(List<TypeInstance> oldList, List<TypeInstance> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
