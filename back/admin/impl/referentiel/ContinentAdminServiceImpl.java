package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Continent;
import com.ird.faa.dao.referentiel.ContinentDao;
import com.ird.faa.service.admin.facade.referentiel.ContinentAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ContinentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContinentAdminServiceImpl extends AbstractServiceImpl<Continent> implements ContinentAdminService {

    @Autowired
    private ContinentDao continentDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Continent> findAll() {
        return continentDao.findAll();
    }

    @Override
    public Continent findByCode(String code) {
        if (code == null) return null;
        return continentDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return continentDao.deleteByCode(code);
    }

    @Override
    public Continent findByIdOrCode(Continent continent) {
        Continent resultat = null;
        if (continent == null || (continent.getCode() == null && continent.getId() == null))
            return resultat;
        else {
            if (continent.getId() != null) {
                resultat = continentDao.findById(continent.getId()).get();
            } else if (StringUtil.isNotEmpty(continent.getCode())) {
                resultat = continentDao.findByCode(continent.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Continent findById(Long id) {
        if (id == null) return null;
        return continentDao.getOne(id);
    }

    @Override
    public Continent findByIdWithAssociatedList(Long id) {
        Continent continent = findById(id);
        return continent;
    }


    @Transactional
    public int deleteById(Long id) {
        if (continentDao.findById(id) == null) return 0;
        else {
            continentDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Continent update(Continent continent) {
        Continent foundedContinent = findById(continent.getId());
        if (foundedContinent == null) return null;
        else {
            prepare(continent);
            return continentDao.save(continent);
        }
    }

    @Override
    public Continent save(Continent continent) {
        Continent foundedContinent = findByCode(continent.getCode());
        if (foundedContinent != null) return null;

        prepare(continent);

        Continent savedContinent = continentDao.save(continent);
        return savedContinent;
    }

    @Override
    public List<Continent> save(List<Continent> continents) {
        List<Continent> list = new ArrayList<Continent>();
        for (Continent continent : continents) {
            list.add(save(continent));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Continent continent) {
        if (continent.getCode() == null) return -1;

        Continent foundedContinent = findByCode(continent.getCode());
        if (foundedContinent == null) return -1;
        continentDao.delete(foundedContinent);
        return 1;
    }


    public List<Continent> findByCriteria(ContinentVo continentVo) {

        String query = "SELECT o FROM Continent o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", continentVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", continentVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", continentVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<Continent> continents) {
        if (ListUtil.isNotEmpty(continents)) {
            continents.forEach(e -> continentDao.delete(e));
        }
    }

    @Override
    public void update(List<Continent> continents) {
        if (ListUtil.isNotEmpty(continents)) {
            continents.forEach(e -> continentDao.save(e));
        }
    }


    @Override
    public List<List<Continent>> getToBeSavedAndToBeDeleted(List<Continent> oldList, List<Continent> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
