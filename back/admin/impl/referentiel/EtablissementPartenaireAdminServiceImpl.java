package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.EtablissementPartenaire;
import com.ird.faa.bean.referentiel.Langue;
import com.ird.faa.dao.referentiel.EtablissementPartenaireDao;
import com.ird.faa.service.admin.facade.referentiel.EtablissementPartenaireAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.EtablissementPartenaireVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class EtablissementPartenaireAdminServiceImpl extends AbstractServiceImpl<EtablissementPartenaire> implements EtablissementPartenaireAdminService {

    @Autowired
    private EtablissementPartenaireDao etablissementPartenaireDao;



  


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<EtablissementPartenaire> findAll() {
        return etablissementPartenaireDao.findAll();
    }

    @Override
    public EtablissementPartenaire findByCode(String code) {
        if (code == null) return null;
        return etablissementPartenaireDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return etablissementPartenaireDao.deleteByCode(code);
    }

    @Override
    public EtablissementPartenaire findByIdOrCode(EtablissementPartenaire etablissementPartenaire) {
        EtablissementPartenaire resultat = null;
        if (etablissementPartenaire == null || (etablissementPartenaire.getCode() == null && etablissementPartenaire.getId() == null))
            return resultat;
        else {
            if (etablissementPartenaire.getId() != null) {
                resultat = etablissementPartenaireDao.findById(etablissementPartenaire.getId()).get();
            } else if (StringUtil.isNotEmpty(etablissementPartenaire.getCode())) {
                resultat = etablissementPartenaireDao.findByCode(etablissementPartenaire.getCode());
            }
            return resultat;
        }
    }

    @Override
    public EtablissementPartenaire findById(Long id) {
        if (id == null) return null;
        return etablissementPartenaireDao.getOne(id);
    }

    @Override
    public EtablissementPartenaire findByIdWithAssociatedList(Long id) {
        EtablissementPartenaire etablissementPartenaire = findById(id);
        return etablissementPartenaire;
    }


    @Transactional
    public int deleteById(Long id) {
        if (etablissementPartenaireDao.findById(id) == null) return 0;
        else {
            etablissementPartenaireDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public EtablissementPartenaire update(EtablissementPartenaire etablissementPartenaire) {
        EtablissementPartenaire foundedEtablissementPartenaire = findById(etablissementPartenaire.getId());
        if (foundedEtablissementPartenaire == null) return null;
        else {
            prepare(etablissementPartenaire);
            return etablissementPartenaireDao.save(etablissementPartenaire);
        }
    }

    @Override
    public EtablissementPartenaire save(EtablissementPartenaire etablissementPartenaire) {
        EtablissementPartenaire foundedEtablissementPartenaire = findByCode(etablissementPartenaire.getCode());
        if (foundedEtablissementPartenaire != null) return null;

        prepare(etablissementPartenaire);
        EtablissementPartenaire savedEtablissementPartenaire = etablissementPartenaireDao.save(etablissementPartenaire);
        return savedEtablissementPartenaire;
    }

    @Override
    public List<EtablissementPartenaire> save(List<EtablissementPartenaire> etablissementPartenaires) {
        List<EtablissementPartenaire> list = new ArrayList<EtablissementPartenaire>();
        for (EtablissementPartenaire etablissementPartenaire : etablissementPartenaires) {
            list.add(save(etablissementPartenaire));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(EtablissementPartenaire etablissementPartenaire) {
        if (etablissementPartenaire.getCode() == null) return -1;

        EtablissementPartenaire foundedEtablissementPartenaire = findByCode(etablissementPartenaire.getCode());
        if (foundedEtablissementPartenaire == null) return -1;
        etablissementPartenaireDao.delete(foundedEtablissementPartenaire);
        return 1;
    }


    public List<EtablissementPartenaire> findByCriteria(EtablissementPartenaireVo etablissementPartenaireVo) {

        String query = "SELECT o FROM EtablissementPartenaire o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", etablissementPartenaireVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", etablissementPartenaireVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", etablissementPartenaireVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", etablissementPartenaireVo.getDescription());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<EtablissementPartenaire> etablissementPartenaires) {
        if (ListUtil.isNotEmpty(etablissementPartenaires)) {
            etablissementPartenaires.forEach(e -> etablissementPartenaireDao.delete(e));
        }
    }

    @Override
    public void update(List<EtablissementPartenaire> etablissementPartenaires) {
        if (ListUtil.isNotEmpty(etablissementPartenaires)) {
            etablissementPartenaires.forEach(e -> etablissementPartenaireDao.save(e));
        }
    }


    @Override
    public List<List<EtablissementPartenaire>> getToBeSavedAndToBeDeleted(List<EtablissementPartenaire> oldList, List<EtablissementPartenaire> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
