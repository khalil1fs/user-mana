package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TypeInstrumentIrd;
import com.ird.faa.dao.referentiel.TypeInstrumentIrdDao;
import com.ird.faa.service.admin.facade.referentiel.TypeInstrumentIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeInstrumentIrdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeInstrumentIrdAdminServiceImpl extends AbstractServiceImpl<TypeInstrumentIrd> implements TypeInstrumentIrdAdminService {

    @Autowired
    private TypeInstrumentIrdDao typeInstrumentIrdDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TypeInstrumentIrd> findAll() {
        return typeInstrumentIrdDao.findAll();
    }

    @Override
    public TypeInstrumentIrd findByCode(String code) {
        if (code == null) return null;
        return typeInstrumentIrdDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return typeInstrumentIrdDao.deleteByCode(code);
    }

    @Override
    public TypeInstrumentIrd findByIdOrCode(TypeInstrumentIrd typeInstrumentIrd) {
        TypeInstrumentIrd resultat = null;
        if (typeInstrumentIrd == null || (typeInstrumentIrd.getCode() == null && typeInstrumentIrd.getId() == null))
            return resultat;
        else {
            if (typeInstrumentIrd.getId() != null) {
                resultat = typeInstrumentIrdDao.findById(typeInstrumentIrd.getId()).get();
            } else if (StringUtil.isNotEmpty(typeInstrumentIrd.getCode())) {
                resultat = typeInstrumentIrdDao.findByCode(typeInstrumentIrd.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TypeInstrumentIrd findById(Long id) {
        if (id == null) return null;
        return typeInstrumentIrdDao.getOne(id);
    }

    @Override
    public TypeInstrumentIrd findByIdWithAssociatedList(Long id) {
        TypeInstrumentIrd typeInstrumentIrd = findById(id);
        return typeInstrumentIrd;
    }


    @Transactional
    public int deleteById(Long id) {
        if (typeInstrumentIrdDao.findById(id) == null) return 0;
        else {
            typeInstrumentIrdDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TypeInstrumentIrd update(TypeInstrumentIrd typeInstrumentIrd) {
        TypeInstrumentIrd foundedTypeInstrumentIrd = findById(typeInstrumentIrd.getId());
        if (foundedTypeInstrumentIrd == null) return null;
        else {
            prepare(typeInstrumentIrd);
            return typeInstrumentIrdDao.save(typeInstrumentIrd);
        }
    }

    @Override
    public TypeInstrumentIrd save(TypeInstrumentIrd typeInstrumentIrd) {
        TypeInstrumentIrd foundedTypeInstrumentIrd = findByCode(typeInstrumentIrd.getCode());
        if (foundedTypeInstrumentIrd != null) return null;

        prepare(typeInstrumentIrd);

        TypeInstrumentIrd savedTypeInstrumentIrd = typeInstrumentIrdDao.save(typeInstrumentIrd);
        return savedTypeInstrumentIrd;
    }

    @Override
    public List<TypeInstrumentIrd> save(List<TypeInstrumentIrd> typeInstrumentIrds) {
        List<TypeInstrumentIrd> list = new ArrayList<TypeInstrumentIrd>();
        for (TypeInstrumentIrd typeInstrumentIrd : typeInstrumentIrds) {
            list.add(save(typeInstrumentIrd));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TypeInstrumentIrd typeInstrumentIrd) {
        if (typeInstrumentIrd.getCode() == null) return -1;

        TypeInstrumentIrd foundedTypeInstrumentIrd = findByCode(typeInstrumentIrd.getCode());
        if (foundedTypeInstrumentIrd == null) return -1;
        typeInstrumentIrdDao.delete(foundedTypeInstrumentIrd);
        return 1;
    }


    public List<TypeInstrumentIrd> findByCriteria(TypeInstrumentIrdVo typeInstrumentIrdVo) {

        String query = "SELECT o FROM TypeInstrumentIrd o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", typeInstrumentIrdVo.getId());
        query += SearchUtil.addConstraint("o", "code", "LIKE", typeInstrumentIrdVo.getCode());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", typeInstrumentIrdVo.getLibelle());
        query += SearchUtil.addConstraint("o", "archive", "=", typeInstrumentIrdVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", typeInstrumentIrdVo.getDateArchivage());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", typeInstrumentIrdVo.getDateArchivageMin(), typeInstrumentIrdVo.getDateArchivageMax());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TypeInstrumentIrd> typeInstrumentIrds) {
        if (ListUtil.isNotEmpty(typeInstrumentIrds)) {
            typeInstrumentIrds.forEach(e -> typeInstrumentIrdDao.delete(e));
        }
    }

    @Override
    public void update(List<TypeInstrumentIrd> typeInstrumentIrds) {
        if (ListUtil.isNotEmpty(typeInstrumentIrds)) {
            typeInstrumentIrds.forEach(e -> typeInstrumentIrdDao.save(e));
        }
    }


    @Override
    public List<List<TypeInstrumentIrd>> getToBeSavedAndToBeDeleted(List<TypeInstrumentIrd> oldList, List<TypeInstrumentIrd> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
