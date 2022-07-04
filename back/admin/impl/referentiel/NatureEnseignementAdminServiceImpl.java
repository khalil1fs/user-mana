package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.NatureEnseignement;
import com.ird.faa.dao.referentiel.NatureEnseignementDao;
import com.ird.faa.service.admin.facade.referentiel.NatureEnseignementAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.NatureEnseignementVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NatureEnseignementAdminServiceImpl extends AbstractServiceImpl<NatureEnseignement> implements NatureEnseignementAdminService {

    @Autowired
    private NatureEnseignementDao natureEnseignementDao;

    @Autowired
    private ArchivableService<NatureEnseignement> archivableService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<NatureEnseignement> findAll() {
        return natureEnseignementDao.findAll();
    }

    @Override
    public NatureEnseignement findByCode(String code) {
        if (code == null) return null;
        return natureEnseignementDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return natureEnseignementDao.deleteByCode(code);
    }

    @Override
    public NatureEnseignement findByIdOrCode(NatureEnseignement natureEnseignement) {
        NatureEnseignement resultat = null;
        if (natureEnseignement != null) {
            if (StringUtil.isNotEmpty(natureEnseignement.getId())) {
                resultat = natureEnseignementDao.getOne(natureEnseignement.getId());
            } else if (StringUtil.isNotEmpty(natureEnseignement.getCode())) {
                resultat = natureEnseignementDao.findByCode(natureEnseignement.getCode());
            }
        }
        return resultat;
    }

    @Override
    public NatureEnseignement findById(Long id) {
        if (id == null) return null;
        return natureEnseignementDao.getOne(id);
    }

    @Override
    public NatureEnseignement findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    public NatureEnseignement archiver(NatureEnseignement natureEnseignement) {
        if (natureEnseignement.getArchive() == null) {
            natureEnseignement.setArchive(false);
        }
        natureEnseignement.setArchive(true);
        natureEnseignement.setDateArchivage(new Date());
        natureEnseignementDao.save(natureEnseignement);
        return natureEnseignement;

    }

    @Override
    public NatureEnseignement desarchiver(NatureEnseignement natureEnseignement) {
        if (natureEnseignement.getArchive() == null) {
            natureEnseignement.setArchive(false);
        }
        natureEnseignement.setArchive(false);
        natureEnseignement.setDateArchivage(null);
        natureEnseignementDao.save(natureEnseignement);
        return natureEnseignement;
    }


    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (natureEnseignementDao.findById(id).isPresent()) {
            natureEnseignementDao.deleteById(id);
            res = 1;
        }
        return res;
    }


    @Override
    public NatureEnseignement update(NatureEnseignement natureEnseignement) {
        NatureEnseignement foundedNatureEnseignement = findById(natureEnseignement.getId());
        if (foundedNatureEnseignement == null) return null;
        else {
            archivableService.prepare(natureEnseignement);
            return natureEnseignementDao.save(natureEnseignement);
        }
    }


    @Override
    public NatureEnseignement save(NatureEnseignement natureEnseignement) {

        NatureEnseignement result = null;
        NatureEnseignement foundedNatureEnseignement = findByCode(natureEnseignement.getCode());
        if (foundedNatureEnseignement == null) {

            prepare(natureEnseignement);

            NatureEnseignement savedNatureEnseignement = natureEnseignementDao.save(natureEnseignement);

            result = savedNatureEnseignement;
        }

        return result;
    }

    @Override
    public List<NatureEnseignement> save(List<NatureEnseignement> natureEnseignements) {
        List<NatureEnseignement> list = new ArrayList<>();
        for (NatureEnseignement natureEnseignement : natureEnseignements) {
            list.add(save(natureEnseignement));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(NatureEnseignement natureEnseignement) {
        if (natureEnseignement.getCode() == null) return -1;

        NatureEnseignement foundedNatureEnseignement = findByCode(natureEnseignement.getCode());
        if (foundedNatureEnseignement == null) return -1;
        natureEnseignementDao.delete(foundedNatureEnseignement);
        return 1;
    }


    public List<NatureEnseignement> findByCriteria(NatureEnseignementVo natureEnseignementVo) {

        String query = "SELECT o FROM NatureEnseignement o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", natureEnseignementVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", natureEnseignementVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", natureEnseignementVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", natureEnseignementVo.getDescription());
        query += SearchUtil.addConstraint("o", "archive", "=", natureEnseignementVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", natureEnseignementVo.getDateArchivage());
        query += SearchUtil.addConstraintDate("o", "dateCreation", "=", natureEnseignementVo.getDateCreation());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", natureEnseignementVo.getDateArchivageMin(), natureEnseignementVo.getDateArchivageMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateCreation", natureEnseignementVo.getDateCreationMin(), natureEnseignementVo.getDateCreationMax());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<NatureEnseignement> natureEnseignements) {
        if (ListUtil.isNotEmpty(natureEnseignements)) {
            natureEnseignements.forEach(e -> natureEnseignementDao.delete(e));
        }
    }

    @Override
    public void update(List<NatureEnseignement> natureEnseignements) {
        if (ListUtil.isNotEmpty(natureEnseignements)) {
            natureEnseignements.forEach(e -> natureEnseignementDao.save(e));
        }
    }


}
