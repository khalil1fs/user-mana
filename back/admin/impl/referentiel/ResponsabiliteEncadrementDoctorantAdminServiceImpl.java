package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.ResponsabiliteEncadrementDoctorant;
import com.ird.faa.dao.referentiel.ResponsabiliteEncadrementDoctorantDao;
import com.ird.faa.service.admin.facade.referentiel.ResponsabiliteEncadrementDoctorantAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ResponsabiliteEncadrementDoctorantVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ResponsabiliteEncadrementDoctorantAdminServiceImpl extends AbstractServiceImpl<ResponsabiliteEncadrementDoctorant> implements ResponsabiliteEncadrementDoctorantAdminService {

    @Autowired
    private ResponsabiliteEncadrementDoctorantDao responsabiliteEncadrementDoctorantDao;

    @Autowired
    private ArchivableService<ResponsabiliteEncadrementDoctorant> archivableService;


  


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<ResponsabiliteEncadrementDoctorant> findAll() {
        return responsabiliteEncadrementDoctorantDao.findAll();
    }

    @Override
    public ResponsabiliteEncadrementDoctorant findByCode(String code) {
        if (code == null) return null;
        return responsabiliteEncadrementDoctorantDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return responsabiliteEncadrementDoctorantDao.deleteByCode(code);
    }

    @Override
    public ResponsabiliteEncadrementDoctorant findByIdOrCode(ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant) {
        ResponsabiliteEncadrementDoctorant resultat = null;
        if (responsabiliteEncadrementDoctorant == null || (responsabiliteEncadrementDoctorant.getCode() == null && responsabiliteEncadrementDoctorant.getId() == null))
            return resultat;
        else {
            if (responsabiliteEncadrementDoctorant.getId() != null) {
                resultat = responsabiliteEncadrementDoctorantDao.findById(responsabiliteEncadrementDoctorant.getId()).get();
            } else if (StringUtil.isNotEmpty(responsabiliteEncadrementDoctorant.getCode())) {
                resultat = responsabiliteEncadrementDoctorantDao.findByCode(responsabiliteEncadrementDoctorant.getCode());
            }
            return resultat;
        }
    }

    @Override
    public ResponsabiliteEncadrementDoctorant findById(Long id) {
        if (id == null) return null;
        return responsabiliteEncadrementDoctorantDao.getOne(id);
    }

    @Override
    public ResponsabiliteEncadrementDoctorant findByIdWithAssociatedList(Long id) {
        ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant = findById(id);
        return responsabiliteEncadrementDoctorant;
    }

    @Override
    public ResponsabiliteEncadrementDoctorant archiver(ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant) {
        if (responsabiliteEncadrementDoctorant.getArchive() == null) {
            responsabiliteEncadrementDoctorant.setArchive(false);
        }
        responsabiliteEncadrementDoctorant.setArchive(true);
        responsabiliteEncadrementDoctorant.setDateArchivage(new Date());
        responsabiliteEncadrementDoctorantDao.save(responsabiliteEncadrementDoctorant);
        return responsabiliteEncadrementDoctorant;

    }

    @Override
    public ResponsabiliteEncadrementDoctorant desarchiver(ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant) {
        if (responsabiliteEncadrementDoctorant.getArchive() == null) {
            responsabiliteEncadrementDoctorant.setArchive(false);
        }
        responsabiliteEncadrementDoctorant.setArchive(false);
        responsabiliteEncadrementDoctorant.setDateArchivage(null);
        responsabiliteEncadrementDoctorantDao.save(responsabiliteEncadrementDoctorant);
        return responsabiliteEncadrementDoctorant;
    }


    @Transactional
    public int deleteById(Long id) {
        if (responsabiliteEncadrementDoctorantDao.findById(id) == null) return 0;
        else {
            responsabiliteEncadrementDoctorantDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public ResponsabiliteEncadrementDoctorant update(ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant) {
        ResponsabiliteEncadrementDoctorant foundedResponsabiliteEncadrementDoctorant = findById(responsabiliteEncadrementDoctorant.getId());
        if (foundedResponsabiliteEncadrementDoctorant == null) return null;
        else {
            prepare(responsabiliteEncadrementDoctorant);
            archivableService.prepare(responsabiliteEncadrementDoctorant);
            return responsabiliteEncadrementDoctorantDao.save(responsabiliteEncadrementDoctorant);
        }
    }

    @Override
    public ResponsabiliteEncadrementDoctorant save(ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant) {
        ResponsabiliteEncadrementDoctorant foundedResponsabiliteEncadrementDoctorant = findByCode(responsabiliteEncadrementDoctorant.getCode());
        if (foundedResponsabiliteEncadrementDoctorant != null) return null;

        prepare(responsabiliteEncadrementDoctorant);
        ResponsabiliteEncadrementDoctorant savedResponsabiliteEncadrementDoctorant = responsabiliteEncadrementDoctorantDao.save(responsabiliteEncadrementDoctorant);
        return savedResponsabiliteEncadrementDoctorant;
    }

    @Override
    public List<ResponsabiliteEncadrementDoctorant> save(List<ResponsabiliteEncadrementDoctorant> responsabiliteEncadrementDoctorants) {
        List<ResponsabiliteEncadrementDoctorant> list = new ArrayList<ResponsabiliteEncadrementDoctorant>();
        for (ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant : responsabiliteEncadrementDoctorants) {
            list.add(save(responsabiliteEncadrementDoctorant));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(ResponsabiliteEncadrementDoctorant responsabiliteEncadrementDoctorant) {
        if (responsabiliteEncadrementDoctorant.getCode() == null) return -1;

        ResponsabiliteEncadrementDoctorant foundedResponsabiliteEncadrementDoctorant = findByCode(responsabiliteEncadrementDoctorant.getCode());
        if (foundedResponsabiliteEncadrementDoctorant == null) return -1;
        responsabiliteEncadrementDoctorantDao.delete(foundedResponsabiliteEncadrementDoctorant);
        return 1;
    }


    public List<ResponsabiliteEncadrementDoctorant> findByCriteria(ResponsabiliteEncadrementDoctorantVo responsabiliteEncadrementDoctorantVo) {

        String query = "SELECT o FROM ResponsabiliteEncadrementDoctorant o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", responsabiliteEncadrementDoctorantVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", responsabiliteEncadrementDoctorantVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", responsabiliteEncadrementDoctorantVo.getCode());
        query += SearchUtil.addConstraint("o", "archive", "=", responsabiliteEncadrementDoctorantVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", responsabiliteEncadrementDoctorantVo.getDateArchivage());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", responsabiliteEncadrementDoctorantVo.getDateArchivageMin(), responsabiliteEncadrementDoctorantVo.getDateArchivageMax());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<ResponsabiliteEncadrementDoctorant> responsabiliteEncadrementDoctorants) {
        if (ListUtil.isNotEmpty(responsabiliteEncadrementDoctorants)) {
            responsabiliteEncadrementDoctorants.forEach(e -> responsabiliteEncadrementDoctorantDao.delete(e));
        }
    }

    @Override
    public void update(List<ResponsabiliteEncadrementDoctorant> responsabiliteEncadrementDoctorants) {
        if (ListUtil.isNotEmpty(responsabiliteEncadrementDoctorants)) {
            responsabiliteEncadrementDoctorants.forEach(e -> responsabiliteEncadrementDoctorantDao.save(e));
        }
    }


    @Override
    public List<List<ResponsabiliteEncadrementDoctorant>> getToBeSavedAndToBeDeleted(List<ResponsabiliteEncadrementDoctorant> oldList, List<ResponsabiliteEncadrementDoctorant> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
