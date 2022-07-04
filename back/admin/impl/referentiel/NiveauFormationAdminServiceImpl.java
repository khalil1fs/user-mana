package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.NiveauFormation;
import com.ird.faa.dao.referentiel.NiveauFormationDao;
import com.ird.faa.service.admin.facade.referentiel.NiveauFormationAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.NiveauFormationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class NiveauFormationAdminServiceImpl extends AbstractServiceImpl<NiveauFormation> implements NiveauFormationAdminService {

    @Autowired
    private NiveauFormationDao niveauFormationDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<NiveauFormation> findAll() {
        return niveauFormationDao.findAll();
    }

    @Override
    public NiveauFormation findByCode(String code) {
        if (code == null) return null;
        return niveauFormationDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return niveauFormationDao.deleteByCode(code);
    }

    @Override
    public NiveauFormation findByIdOrCode(NiveauFormation niveauFormation) {
        NiveauFormation resultat = null;
        if (niveauFormation == null || (niveauFormation.getCode() == null && niveauFormation.getId() == null))
            return resultat;
        else {
            if (niveauFormation.getId() != null) {
                resultat = niveauFormationDao.findById(niveauFormation.getId()).get();
            } else if (StringUtil.isNotEmpty(niveauFormation.getCode())) {
                resultat = niveauFormationDao.findByCode(niveauFormation.getCode());
            }
            return resultat;
        }
    }

    @Override
    public NiveauFormation findById(Long id) {
        if (id == null) return null;
        return niveauFormationDao.getOne(id);
    }

    @Override
    public NiveauFormation findByIdWithAssociatedList(Long id) {
        NiveauFormation niveauFormation = findById(id);
        return niveauFormation;
    }


    @Transactional
    public int deleteById(Long id) {
        if (niveauFormationDao.findById(id) == null) return 0;
        else {
            niveauFormationDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public NiveauFormation update(NiveauFormation niveauFormation) {
        NiveauFormation foundedNiveauFormation = findById(niveauFormation.getId());
        if (foundedNiveauFormation == null) return null;
        else {
            prepare(niveauFormation);
            return niveauFormationDao.save(niveauFormation);
        }
    }

    @Override
    public NiveauFormation save(NiveauFormation niveauFormation) {
        NiveauFormation foundedNiveauFormation = findByCode(niveauFormation.getCode());
        if (foundedNiveauFormation != null) return null;

        prepare(niveauFormation);
        NiveauFormation savedNiveauFormation = niveauFormationDao.save(niveauFormation);
        return savedNiveauFormation;
    }

    @Override
    public List<NiveauFormation> save(List<NiveauFormation> niveauFormations) {
        List<NiveauFormation> list = new ArrayList<NiveauFormation>();
        for (NiveauFormation niveauFormation : niveauFormations) {
            list.add(save(niveauFormation));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(NiveauFormation niveauFormation) {
        if (niveauFormation.getCode() == null) return -1;

        NiveauFormation foundedNiveauFormation = findByCode(niveauFormation.getCode());
        if (foundedNiveauFormation == null) return -1;
        niveauFormationDao.delete(foundedNiveauFormation);
        return 1;
    }


    public List<NiveauFormation> findByCriteria(NiveauFormationVo niveauFormationVo) {

        String query = "SELECT o FROM NiveauFormation o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", niveauFormationVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", niveauFormationVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", niveauFormationVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<NiveauFormation> niveauFormations) {
        if (ListUtil.isNotEmpty(niveauFormations)) {
            niveauFormations.forEach(e -> niveauFormationDao.delete(e));
        }
    }

    @Override
    public void update(List<NiveauFormation> niveauFormations) {
        if (ListUtil.isNotEmpty(niveauFormations)) {
            niveauFormations.forEach(e -> niveauFormationDao.save(e));
        }
    }


    @Override
    public List<List<NiveauFormation>> getToBeSavedAndToBeDeleted(List<NiveauFormation> oldList, List<NiveauFormation> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
