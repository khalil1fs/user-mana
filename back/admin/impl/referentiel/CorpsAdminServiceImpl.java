package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Corps;
import com.ird.faa.dao.referentiel.CorpsDao;
import com.ird.faa.service.admin.facade.referentiel.CorpsAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.CorpsVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class CorpsAdminServiceImpl extends AbstractServiceImpl<Corps> implements CorpsAdminService {

    @Autowired
    private CorpsDao corpsDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Corps> findAll() {
        return corpsDao.findAll();
    }

    @Override
    public Corps findByCode(String code) {
        if (code == null) return null;
        return corpsDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return corpsDao.deleteByCode(code);
    }

    @Override
    public Corps findByIdOrCode(Corps corps) {
        Corps resultat = null;
        if (corps == null || (corps.getCode() == null && corps.getId() == null))
            return resultat;
        else {
            if (corps.getId() != null) {
                resultat = corpsDao.findById(corps.getId()).get();
            } else if (StringUtil.isNotEmpty(corps.getCode())) {
                resultat = corpsDao.findByCode(corps.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Corps findById(Long id) {
        if (id == null) return null;
        return corpsDao.getOne(id);
    }

    @Override
    public Corps findByIdWithAssociatedList(Long id) {
        Corps corps = findById(id);
        return corps;
    }


    @Transactional
    public int deleteById(Long id) {
        if (corpsDao.findById(id) == null) return 0;
        else {
            corpsDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Corps update(Corps corps) {
        Corps foundedCorps = findById(corps.getId());
        if (foundedCorps == null) return null;
        else {
            prepare(corps);
            return corpsDao.save(corps);
        }
    }

    @Override
    public Corps save(Corps corps) {
        Corps foundedCorps = findByCode(corps.getCode());
        if (foundedCorps != null) return null;

        prepare(corps);
        Corps savedCorps = corpsDao.save(corps);
        return savedCorps;
    }

    @Override
    public List<Corps> save(List<Corps> corpss) {
        List<Corps> list = new ArrayList<Corps>();
        for (Corps corps : corpss) {
            list.add(save(corps));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Corps corps) {
        if (corps.getCode() == null) return -1;

        Corps foundedCorps = findByCode(corps.getCode());
        if (foundedCorps == null) return -1;
        corpsDao.delete(foundedCorps);
        return 1;
    }


    public List<Corps> findByCriteria(CorpsVo corpsVo) {

        String query = "SELECT o FROM Corps o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", corpsVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", corpsVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", corpsVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", corpsVo.getDescription());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<Corps> corpss) {
        if (ListUtil.isNotEmpty(corpss)) {
            corpss.forEach(e -> corpsDao.delete(e));
        }
    }

    @Override
    public void update(List<Corps> corpss) {
        if (ListUtil.isNotEmpty(corpss)) {
            corpss.forEach(e -> corpsDao.save(e));
        }
    }


    @Override
    public List<List<Corps>> getToBeSavedAndToBeDeleted(List<Corps> oldList, List<Corps> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
