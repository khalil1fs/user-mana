package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.StatutMaster;
import com.ird.faa.dao.referentiel.StatutMasterDao;
import com.ird.faa.service.admin.facade.referentiel.StatutMasterAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.StatutMasterVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatutMasterAdminServiceImpl extends AbstractServiceImpl<StatutMaster> implements StatutMasterAdminService {

    @Autowired
    private StatutMasterDao statutMasterDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<StatutMaster> findAll() {
        return statutMasterDao.findAll();
    }

    @Override
    public StatutMaster findByCode(String code) {
        if (code == null) return null;
        return statutMasterDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return statutMasterDao.deleteByCode(code);
    }

    @Override
    public StatutMaster findByIdOrCode(StatutMaster statutMaster) {
        StatutMaster resultat = null;
        if (statutMaster == null || (statutMaster.getCode() == null && statutMaster.getId() == null))
            return resultat;
        else {
            if (statutMaster.getId() != null) {
                resultat = statutMasterDao.findById(statutMaster.getId()).get();
            } else if (StringUtil.isNotEmpty(statutMaster.getCode())) {
                resultat = statutMasterDao.findByCode(statutMaster.getCode());
            }
            return resultat;
        }
    }

    @Override
    public StatutMaster findById(Long id) {
        if (id == null) return null;
        return statutMasterDao.getOne(id);
    }

    @Override
    public StatutMaster findByIdWithAssociatedList(Long id) {
        StatutMaster statutMaster = findById(id);
        return statutMaster;
    }


    @Transactional
    public int deleteById(Long id) {
        if (statutMasterDao.findById(id) == null) return 0;
        else {
            statutMasterDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public StatutMaster update(StatutMaster statutMaster) {
        StatutMaster foundedStatutMaster = findById(statutMaster.getId());
        if (foundedStatutMaster == null) return null;
        else {
            prepare(statutMaster);
            return statutMasterDao.save(statutMaster);
        }
    }

    @Override
    public StatutMaster save(StatutMaster statutMaster) {
        StatutMaster foundedStatutMaster = findByCode(statutMaster.getCode());
        if (foundedStatutMaster != null) return null;

        prepare(statutMaster);
        StatutMaster savedStatutMaster = statutMasterDao.save(statutMaster);
        return savedStatutMaster;
    }

    @Override
    public List<StatutMaster> save(List<StatutMaster> statutMasters) {
        List<StatutMaster> list = new ArrayList<StatutMaster>();
        for (StatutMaster statutMaster : statutMasters) {
            list.add(save(statutMaster));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(StatutMaster statutMaster) {
        if (statutMaster.getCode() == null) return -1;

        StatutMaster foundedStatutMaster = findByCode(statutMaster.getCode());
        if (foundedStatutMaster == null) return -1;
        statutMasterDao.delete(foundedStatutMaster);
        return 1;
    }


    public List<StatutMaster> findByCriteria(StatutMasterVo statutMasterVo) {

        String query = "SELECT o FROM StatutMaster o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", statutMasterVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", statutMasterVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", statutMasterVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<StatutMaster> statutMasters) {
        if (ListUtil.isNotEmpty(statutMasters)) {
            statutMasters.forEach(e -> statutMasterDao.delete(e));
        }
    }

    @Override
    public void update(List<StatutMaster> statutMasters) {
        if (ListUtil.isNotEmpty(statutMasters)) {
            statutMasters.forEach(e -> statutMasterDao.save(e));
        }
    }


    @Override
    public List<List<StatutMaster>> getToBeSavedAndToBeDeleted(List<StatutMaster> oldList, List<StatutMaster> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
