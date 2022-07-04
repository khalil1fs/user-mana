package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Nationalite;
import com.ird.faa.dao.referentiel.NationaliteDao;
import com.ird.faa.service.admin.facade.referentiel.NationaliteAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.NationaliteVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class NationaliteAdminServiceImpl extends AbstractServiceImpl<Nationalite> implements NationaliteAdminService {

    @Autowired
    private NationaliteDao nationaliteDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Nationalite> findAll() {
        return nationaliteDao.findAll();
    }

    @Override
    public Nationalite findByCode(String code) {
        if (code == null) return null;
        return nationaliteDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return nationaliteDao.deleteByCode(code);
    }

    @Override
    public Nationalite findByIdOrCode(Nationalite nationalite) {
        Nationalite resultat = null;
        if (nationalite == null || (nationalite.getCode() == null && nationalite.getId() == null))
            return resultat;
        else {
            if (nationalite.getId() != null) {
                resultat = nationaliteDao.findById(nationalite.getId()).get();
            } else if (StringUtil.isNotEmpty(nationalite.getCode())) {
                resultat = nationaliteDao.findByCode(nationalite.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Nationalite findById(Long id) {
        if (id == null) return null;
        return nationaliteDao.getOne(id);
    }

    @Override
    public Nationalite findByIdWithAssociatedList(Long id) {
        Nationalite nationalite = findById(id);
        return nationalite;
    }


    @Transactional
    public int deleteById(Long id) {
        if (nationaliteDao.findById(id) == null) return 0;
        else {
            nationaliteDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Nationalite update(Nationalite nationalite) {
        Nationalite foundedNationalite = findById(nationalite.getId());
        if (foundedNationalite == null) return null;
        else {
            prepare(nationalite);
            return nationaliteDao.save(nationalite);
        }
    }

    @Override
    public Nationalite save(Nationalite nationalite) {
        Nationalite foundedNationalite = findByCode(nationalite.getCode());
        if (foundedNationalite != null) return null;

        prepare(nationalite);

        Nationalite savedNationalite = nationaliteDao.save(nationalite);
        return savedNationalite;
    }

    @Override
    public List<Nationalite> save(List<Nationalite> nationalites) {
        List<Nationalite> list = new ArrayList<Nationalite>();
        for (Nationalite nationalite : nationalites) {
            list.add(save(nationalite));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Nationalite nationalite) {
        if (nationalite.getCode() == null) return -1;

        Nationalite foundedNationalite = findByCode(nationalite.getCode());
        if (foundedNationalite == null) return -1;
        nationaliteDao.delete(foundedNationalite);
        return 1;
    }


    public List<Nationalite> findByCriteria(NationaliteVo nationaliteVo) {

        String query = "SELECT o FROM Nationalite o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", nationaliteVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", nationaliteVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", nationaliteVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<Nationalite> nationalites) {
        if (ListUtil.isNotEmpty(nationalites)) {
            nationalites.forEach(e -> nationaliteDao.delete(e));
        }
    }

    @Override
    public void update(List<Nationalite> nationalites) {
        if (ListUtil.isNotEmpty(nationalites)) {
            nationalites.forEach(e -> nationaliteDao.save(e));
        }
    }


    @Override
    public List<List<Nationalite>> getToBeSavedAndToBeDeleted(List<Nationalite> oldList, List<Nationalite> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
