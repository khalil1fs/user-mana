package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeOutil;
import com.ird.faa.dao.referentiel.TypeOutilDao;
import com.ird.faa.service.admin.facade.referentiel.TypeOutilAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeOutilVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeOutilAdminServiceImpl extends AbstractServiceImpl<TypeOutil> implements TypeOutilAdminService {

    @Autowired
    private TypeOutilDao typeOutilDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeOutil> findAll() {
        return typeOutilDao.findAll();
    }

    @Override
    public TypeOutil findByCode(String code) {
        if (code == null) return null;
        return typeOutilDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeOutilDao.deleteByCode(code);
    }

    @Override
    public TypeOutil findByIdOrCode(TypeOutil typeOutil) {
        TypeOutil resultat = null;
        if (typeOutil == null || (typeOutil.getCode() == null && typeOutil.getId() == null))
            return resultat;
        else {
            if (typeOutil.getId() != null) {
                resultat = typeOutilDao.findById(typeOutil.getId()).get();
            } else if (StringUtil.isNotEmpty(typeOutil.getCode())) {
                resultat = typeOutilDao.findByCode(typeOutil.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeOutil findById(Long id) {
        if (id == null) return null;
        return typeOutilDao.getOne(id);
    }

    @Override
    public TypeOutil findByIdWithAssociatedList(Long id) {
        TypeOutil typeOutil = findById(id);
        return typeOutil;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeOutilDao.findById(id) == null) return 0;
        else {
            typeOutilDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeOutil update(TypeOutil typeOutil) {
        TypeOutil foundedTypeOutil = findById(typeOutil.getId());
        if (foundedTypeOutil == null) return null;
        else {
            prepare(typeOutil);

            return typeOutilDao.save(typeOutil);
        }
    }

    @Override
    public TypeOutil save(TypeOutil typeOutil) {
        TypeOutil foundedTypeOutil = findByCode(typeOutil.getCode());
        if (foundedTypeOutil != null) return null;

        prepare(typeOutil);

        TypeOutil savedTypeOutil = typeOutilDao.save(typeOutil);
        return savedTypeOutil;
    }

    @Override
    public List<TypeOutil> save(List<TypeOutil> typeOutils) {
        List<TypeOutil> list = new ArrayList<TypeOutil>();
        for (TypeOutil typeOutil : typeOutils) {
            list.add(save(typeOutil));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeOutil typeOutil) {
        if (typeOutil.getCode() == null) return -1;

        TypeOutil foundedTypeOutil = findByCode(typeOutil.getCode());
        if (foundedTypeOutil == null) return -1;
        typeOutilDao.delete(foundedTypeOutil);
        return 1;
    }


    public List<TypeOutil> findByCriteria(TypeOutilVo typeOutilVo) {

        String query = "SELECT o FROM TypeOutil o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeOutilVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeOutilVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeOutilVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeOutil> typeOutils) {
        if (ListUtil.isNotEmpty(typeOutils)) {
            typeOutils.forEach(e -> typeOutilDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeOutil> typeOutils) {
        if (ListUtil.isNotEmpty(typeOutils)) {
            typeOutils.forEach(e -> typeOutilDao.save(e));
        }
    }


    @Override
    public List<List<TypeOutil>> getToBeSavedAndToBeDeleted(List<TypeOutil> oldList, List<TypeOutil> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
