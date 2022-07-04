package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.NiveauEtude;
import com.ird.faa.dao.referentiel.NiveauEtudeDao;
import com.ird.faa.service.admin.facade.referentiel.NiveauEtudeAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.NiveauEtudeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class NiveauEtudeAdminServiceImpl extends AbstractServiceImpl<NiveauEtude> implements NiveauEtudeAdminService {

    @Autowired
    private NiveauEtudeDao niveauEtudeDao;


  


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<NiveauEtude> findAll() {
        return niveauEtudeDao.findAll();
    }

    @Override
    public NiveauEtude findByCode(String code) {
        if (code == null) return null;
        return niveauEtudeDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return niveauEtudeDao.deleteByCode(code);
    }

    @Override
    public NiveauEtude findByIdOrCode(NiveauEtude niveauEtude) {
        NiveauEtude resultat = null;
        if (niveauEtude == null || (niveauEtude.getCode() == null && niveauEtude.getId() == null))
            return resultat;
        else {
            if (niveauEtude.getId() != null) {
                resultat = niveauEtudeDao.findById(niveauEtude.getId()).get();
            } else if (StringUtil.isNotEmpty(niveauEtude.getCode())) {
                resultat = niveauEtudeDao.findByCode(niveauEtude.getCode());
            }
            return resultat;
        }
    }

    @Override
    public NiveauEtude findById(Long id) {
        if (id == null) return null;
        return niveauEtudeDao.getOne(id);
    }

    @Override
    public NiveauEtude findByIdWithAssociatedList(Long id) {
        NiveauEtude niveauEtude = findById(id);
        return niveauEtude;
    }


    @Transactional
    public int deleteById(Long id) {
        if (niveauEtudeDao.findById(id) == null) return 0;
        else {
            niveauEtudeDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public NiveauEtude update(NiveauEtude niveauEtude) {
        NiveauEtude foundedNiveauEtude = findById(niveauEtude.getId());
        if (foundedNiveauEtude == null) return null;
        else {
            prepare(niveauEtude);
            return niveauEtudeDao.save(niveauEtude);
        }
    }

    @Override
    public NiveauEtude save(NiveauEtude niveauEtude) {
        NiveauEtude foundedNiveauEtude = findByCode(niveauEtude.getCode());
        if (foundedNiveauEtude != null) return null;

        prepare(niveauEtude);
        NiveauEtude savedNiveauEtude = niveauEtudeDao.save(niveauEtude);
        return savedNiveauEtude;
    }

    @Override
    public List<NiveauEtude> save(List<NiveauEtude> niveauEtudes) {
        List<NiveauEtude> list = new ArrayList<NiveauEtude>();
        for (NiveauEtude niveauEtude : niveauEtudes) {
            list.add(save(niveauEtude));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(NiveauEtude niveauEtude) {
        if (niveauEtude.getCode() == null) return -1;

        NiveauEtude foundedNiveauEtude = findByCode(niveauEtude.getCode());
        if (foundedNiveauEtude == null) return -1;
        niveauEtudeDao.delete(foundedNiveauEtude);
        return 1;
    }


    public List<NiveauEtude> findByCriteria(NiveauEtudeVo niveauEtudeVo) {

        String query = "SELECT o FROM NiveauEtude o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", niveauEtudeVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", niveauEtudeVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", niveauEtudeVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<NiveauEtude> niveauEtudes) {
        if (ListUtil.isNotEmpty(niveauEtudes)) {
            niveauEtudes.forEach(e -> niveauEtudeDao.delete(e));
        }
    }

    @Override
    public void update(List<NiveauEtude> niveauEtudes) {
        if (ListUtil.isNotEmpty(niveauEtudes)) {
            niveauEtudes.forEach(e -> niveauEtudeDao.save(e));
        }
    }


    @Override
    public List<List<NiveauEtude>> getToBeSavedAndToBeDeleted(List<NiveauEtude> oldList, List<NiveauEtude> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
