package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.StructureIrd;
import com.ird.faa.dao.referentiel.StructureIrdDao;
import com.ird.faa.service.admin.facade.referentiel.StructureIrdAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.StructureIrdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class StructureIrdAdminServiceImpl extends AbstractServiceImpl<StructureIrd> implements StructureIrdAdminService {

    @Autowired
    private StructureIrdDao structureIrdDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<StructureIrd> findAll() {
        return structureIrdDao.findAll();
    }

    @Override
    public StructureIrd findByCode(String code) {
        if (code == null) return null;
        return structureIrdDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return structureIrdDao.deleteByCode(code);
    }

    @Override
    public StructureIrd findByIdOrCode(StructureIrd structureIrd) {
        StructureIrd resultat = null;
        if (structureIrd == null || (structureIrd.getCode() == null && structureIrd.getId() == null))
            return resultat;
        else {
            if (structureIrd.getId() != null) {
                resultat = structureIrdDao.findById(structureIrd.getId()).get();
            } else if (StringUtil.isNotEmpty(structureIrd.getCode())) {
                resultat = structureIrdDao.findByCode(structureIrd.getCode());
            }
            return resultat;
        }
    }

    @Override
    public StructureIrd findById(Long id) {
        if (id == null) return null;
        return structureIrdDao.getOne(id);
    }

    @Override
    public StructureIrd findByIdWithAssociatedList(Long id) {
        StructureIrd structureIrd = findById(id);
        return structureIrd;
    }


    @Transactional
    public int deleteById(Long id) {
        if (structureIrdDao.findById(id) == null) return 0;
        else {
            structureIrdDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public StructureIrd update(StructureIrd structureIrd) {
        StructureIrd foundedStructureIrd = findById(structureIrd.getId());
        if (foundedStructureIrd == null) return null;
        else {
            prepare(structureIrd);
            return structureIrdDao.save(structureIrd);
        }
    }

    @Override
    public StructureIrd save(StructureIrd structureIrd) {
        StructureIrd foundedStructureIrd = findByCode(structureIrd.getCode());
        if (foundedStructureIrd != null) return null;

        prepare(structureIrd);

        StructureIrd savedStructureIrd = structureIrdDao.save(structureIrd);
        return savedStructureIrd;
    }

    @Override
    public List<StructureIrd> save(List<StructureIrd> structureIrds) {
        List<StructureIrd> list = new ArrayList<StructureIrd>();
        for (StructureIrd structureIrd : structureIrds) {
            list.add(save(structureIrd));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(StructureIrd structureIrd) {
        if (structureIrd.getCode() == null) return -1;

        StructureIrd foundedStructureIrd = findByCode(structureIrd.getCode());
        if (foundedStructureIrd == null) return -1;
        structureIrdDao.delete(foundedStructureIrd);
        return 1;
    }


    public List<StructureIrd> findByCriteria(StructureIrdVo structureIrdVo) {

        String query = "SELECT o FROM StructureIrd o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", structureIrdVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", structureIrdVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", structureIrdVo.getCode());
        query += SearchUtil.addConstraint("o", "archive", "=", structureIrdVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", structureIrdVo.getDateArchivage());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", structureIrdVo.getDateArchivageMin(), structureIrdVo.getDateArchivageMax());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<StructureIrd> structureIrds) {
        if (ListUtil.isNotEmpty(structureIrds)) {
            structureIrds.forEach(e -> structureIrdDao.delete(e));
        }
    }

    @Override
    public void update(List<StructureIrd> structureIrds) {
        if (ListUtil.isNotEmpty(structureIrds)) {
            structureIrds.forEach(e -> structureIrdDao.save(e));
        }
    }


    @Override
    public List<List<StructureIrd>> getToBeSavedAndToBeDeleted(List<StructureIrd> oldList, List<StructureIrd> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
