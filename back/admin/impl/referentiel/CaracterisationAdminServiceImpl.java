package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Caracterisation;
import com.ird.faa.dao.referentiel.CaracterisationDao;
import com.ird.faa.service.admin.facade.referentiel.CaracterisationAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.CaracterisationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class CaracterisationAdminServiceImpl extends AbstractServiceImpl<Caracterisation> implements CaracterisationAdminService {

    @Autowired
    private CaracterisationDao caracterisationDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Caracterisation> findAll() {
        return caracterisationDao.findAll();
    }

    @Override
    public Caracterisation findByCode(String code) {
        if (code == null) return null;
        return caracterisationDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return caracterisationDao.deleteByCode(code);
    }

    @Override
    public Caracterisation findByIdOrCode(Caracterisation caracterisation) {
        Caracterisation resultat = null;
        if (caracterisation == null || (caracterisation.getCode() == null && caracterisation.getId() == null))
            return resultat;
        else {
            if (caracterisation.getId() != null) {
                resultat = caracterisationDao.findById(caracterisation.getId()).get();
            } else if (StringUtil.isNotEmpty(caracterisation.getCode())) {
                resultat = caracterisationDao.findByCode(caracterisation.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Caracterisation findById(Long id) {
        if (id == null) return null;
        return caracterisationDao.getOne(id);
    }

    @Override
    public Caracterisation findByIdWithAssociatedList(Long id) {
        Caracterisation caracterisation = findById(id);
        return caracterisation;
    }


    @Transactional
    public int deleteById(Long id) {
        if (caracterisationDao.findById(id) == null) return 0;
        else {
            caracterisationDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Caracterisation update(Caracterisation caracterisation) {
        Caracterisation foundedCaracterisation = findById(caracterisation.getId());
        if (foundedCaracterisation == null) return null;
        else {
            prepare(caracterisation);
            return caracterisationDao.save(caracterisation);
        }
    }

    @Override
    public Caracterisation save(Caracterisation caracterisation) {
        Caracterisation foundedCaracterisation = findByCode(caracterisation.getCode());
        if (foundedCaracterisation != null) return null;

        prepare(caracterisation);
        Caracterisation savedCaracterisation = caracterisationDao.save(caracterisation);
        return savedCaracterisation;
    }

    @Override
    public List<Caracterisation> save(List<Caracterisation> caracterisations) {
        List<Caracterisation> list = new ArrayList<Caracterisation>();
        for (Caracterisation caracterisation : caracterisations) {
            list.add(save(caracterisation));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Caracterisation caracterisation) {
        if (caracterisation.getCode() == null) return -1;

        Caracterisation foundedCaracterisation = findByCode(caracterisation.getCode());
        if (foundedCaracterisation == null) return -1;
        caracterisationDao.delete(foundedCaracterisation);
        return 1;
    }


    public List<Caracterisation> findByCriteria(CaracterisationVo caracterisationVo) {

        String query = "SELECT o FROM Caracterisation o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", caracterisationVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", caracterisationVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", caracterisationVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<Caracterisation> caracterisations) {
        if (ListUtil.isNotEmpty(caracterisations)) {
            caracterisations.forEach(e -> caracterisationDao.delete(e));
        }
    }

    @Override
    public void update(List<Caracterisation> caracterisations) {
        if (ListUtil.isNotEmpty(caracterisations)) {
            caracterisations.forEach(e -> caracterisationDao.save(e));
        }
    }


    @Override
    public List<List<Caracterisation>> getToBeSavedAndToBeDeleted(List<Caracterisation> oldList, List<Caracterisation> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
