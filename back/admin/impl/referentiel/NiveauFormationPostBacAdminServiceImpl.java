package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.NiveauFormationPostBac;
import com.ird.faa.dao.referentiel.NiveauFormationPostBacDao;
import com.ird.faa.service.admin.facade.referentiel.NiveauFormationPostBacAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.NiveauFormationPostBacVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NiveauFormationPostBacAdminServiceImpl extends AbstractServiceImpl<NiveauFormationPostBac> implements NiveauFormationPostBacAdminService {

    @Autowired
    private NiveauFormationPostBacDao niveauFormationPostBacDao;

    @Autowired
    private ArchivableService<NiveauFormationPostBac> archivableService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<NiveauFormationPostBac> findAll() {
        return niveauFormationPostBacDao.findAll();
    }

    @Override
    public NiveauFormationPostBac findByCode(String code) {
        if (code == null) return null;
        return niveauFormationPostBacDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return niveauFormationPostBacDao.deleteByCode(code);
    }

    @Override
    public NiveauFormationPostBac findByIdOrCode(NiveauFormationPostBac niveauFormationPostBac) {
        NiveauFormationPostBac resultat = null;
        if (niveauFormationPostBac == null || (niveauFormationPostBac.getCode() == null && niveauFormationPostBac.getId() == null))
            return resultat;
        else {
            if (niveauFormationPostBac.getId() != null) {
                resultat = niveauFormationPostBacDao.findById(niveauFormationPostBac.getId()).get();
            } else if (StringUtil.isNotEmpty(niveauFormationPostBac.getCode())) {
                resultat = niveauFormationPostBacDao.findByCode(niveauFormationPostBac.getCode());
            }
            return resultat;
        }
    }

    @Override
    public NiveauFormationPostBac findById(Long id) {
        if (id == null) return null;
        return niveauFormationPostBacDao.getOne(id);
    }

    @Override
    public NiveauFormationPostBac findByIdWithAssociatedList(Long id) {
        NiveauFormationPostBac niveauFormationPostBac = findById(id);
        return niveauFormationPostBac;
    }

    @Override
    public NiveauFormationPostBac archiver(NiveauFormationPostBac niveauFormationPostBac) {
        if (niveauFormationPostBac.getArchive() == null) {
            niveauFormationPostBac.setArchive(false);
        }
        niveauFormationPostBac.setArchive(true);
        niveauFormationPostBac.setDateArchivage(new Date());
        niveauFormationPostBacDao.save(niveauFormationPostBac);
        return niveauFormationPostBac;

    }

    @Override
    public NiveauFormationPostBac desarchiver(NiveauFormationPostBac niveauFormationPostBac) {
        if (niveauFormationPostBac.getArchive() == null) {
            niveauFormationPostBac.setArchive(false);
        }
        niveauFormationPostBac.setArchive(false);
        niveauFormationPostBac.setDateArchivage(null);
        niveauFormationPostBacDao.save(niveauFormationPostBac);
        return niveauFormationPostBac;
    }


    @Transactional
    public int deleteById(Long id) {
        if (niveauFormationPostBacDao.findById(id) == null) return 0;
        else {
            niveauFormationPostBacDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public NiveauFormationPostBac update(NiveauFormationPostBac niveauFormationPostBac) {
        NiveauFormationPostBac foundedNiveauFormationPostBac = findById(niveauFormationPostBac.getId());
        if (foundedNiveauFormationPostBac == null) return null;
        else {
            archivableService.prepare(niveauFormationPostBac);
            return niveauFormationPostBacDao.save(niveauFormationPostBac);
        }
    }

    @Override
    public NiveauFormationPostBac save(NiveauFormationPostBac niveauFormationPostBac) {
        NiveauFormationPostBac foundedNiveauFormationPostBac = findByCode(niveauFormationPostBac.getCode());
        if (foundedNiveauFormationPostBac != null) return null;


        prepare(niveauFormationPostBac);

        NiveauFormationPostBac savedNiveauFormationPostBac = niveauFormationPostBacDao.save(niveauFormationPostBac);
        return savedNiveauFormationPostBac;
    }

    @Override
    public List<NiveauFormationPostBac> save(List<NiveauFormationPostBac> niveauFormationPostBacs) {
        List<NiveauFormationPostBac> list = new ArrayList<NiveauFormationPostBac>();
        for (NiveauFormationPostBac niveauFormationPostBac : niveauFormationPostBacs) {
            list.add(save(niveauFormationPostBac));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(NiveauFormationPostBac niveauFormationPostBac) {
        if (niveauFormationPostBac.getCode() == null) return -1;

        NiveauFormationPostBac foundedNiveauFormationPostBac = findByCode(niveauFormationPostBac.getCode());
        if (foundedNiveauFormationPostBac == null) return -1;
        niveauFormationPostBacDao.delete(foundedNiveauFormationPostBac);
        return 1;
    }


    public List<NiveauFormationPostBac> findByCriteria(NiveauFormationPostBacVo niveauFormationPostBacVo) {

        String query = "SELECT o FROM NiveauFormationPostBac o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", niveauFormationPostBacVo.getId());
        query += SearchUtil.addConstraint("o", "code", "LIKE", niveauFormationPostBacVo.getCode());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", niveauFormationPostBacVo.getLibelle());
        query += SearchUtil.addConstraint("o", "archive", "=", niveauFormationPostBacVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", niveauFormationPostBacVo.getDateArchivage());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", niveauFormationPostBacVo.getDateArchivageMin(), niveauFormationPostBacVo.getDateArchivageMax());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<NiveauFormationPostBac> niveauFormationPostBacs) {
        if (ListUtil.isNotEmpty(niveauFormationPostBacs)) {
            niveauFormationPostBacs.forEach(e -> niveauFormationPostBacDao.delete(e));
        }
    }

    @Override
    public void update(List<NiveauFormationPostBac> niveauFormationPostBacs) {
        if (ListUtil.isNotEmpty(niveauFormationPostBacs)) {
            niveauFormationPostBacs.forEach(e -> niveauFormationPostBacDao.save(e));
        }
    }


    @Override
    public List<List<NiveauFormationPostBac>> getToBeSavedAndToBeDeleted(List<NiveauFormationPostBac> oldList, List<NiveauFormationPostBac> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
