package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.OutilFormationContinue;
import com.ird.faa.dao.referentiel.OutilFormationContinueDao;
import com.ird.faa.service.admin.facade.referentiel.OutilFormationContinueAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.OutilFormationContinueVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OutilFormationContinueAdminServiceImpl extends AbstractServiceImpl<OutilFormationContinue> implements OutilFormationContinueAdminService {

    @Autowired
    private OutilFormationContinueDao outilFormationContinueDao;

    @Autowired
    private ArchivableService<OutilFormationContinue> archivableService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<OutilFormationContinue> findAll() {
        return outilFormationContinueDao.findAll();
    }

    @Override
    public OutilFormationContinue findByCode(String code) {
        if (code == null) return null;
        return outilFormationContinueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return outilFormationContinueDao.deleteByCode(code);
    }

    @Override
    public OutilFormationContinue findByIdOrCode(OutilFormationContinue outilFormationContinue) {
        OutilFormationContinue resultat = null;
        if (outilFormationContinue != null) {
            if (StringUtil.isNotEmpty(outilFormationContinue.getId())) {
                resultat = outilFormationContinueDao.getOne(outilFormationContinue.getId());
            } else if (StringUtil.isNotEmpty(outilFormationContinue.getCode())) {
                resultat = outilFormationContinueDao.findByCode(outilFormationContinue.getCode());
            }
        }
        return resultat;
    }

    @Override
    public OutilFormationContinue findById(Long id) {
        if (id == null) return null;
        return outilFormationContinueDao.getOne(id);
    }

    @Override
    public OutilFormationContinue findByIdWithAssociatedList(Long id) {
        return findById(id);
    }


    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (outilFormationContinueDao.findById(id).isPresent()) {
            outilFormationContinueDao.deleteById(id);
            res = 1;
        }
        return res;
    }


    @Override
    public OutilFormationContinue update(OutilFormationContinue outilFormationContinue) {
        OutilFormationContinue foundedOutilFormationContinue = findById(outilFormationContinue.getId());
        if (foundedOutilFormationContinue == null) return null;
        else {
            archivableService.prepare(outilFormationContinue);
            return outilFormationContinueDao.save(outilFormationContinue);
        }
    }

    private void prepareSave(OutilFormationContinue outilFormationContinue) {
        outilFormationContinue.setDateCreation(new Date());
        if (outilFormationContinue.getDateArchivage() == null)
            outilFormationContinue.setDateArchivage(new Date());
        if (outilFormationContinue.getArchive() == null)
            outilFormationContinue.setArchive(false);


    }

    @Override
    public OutilFormationContinue save(OutilFormationContinue outilFormationContinue) {
        prepareSave(outilFormationContinue);

        OutilFormationContinue result = null;
        OutilFormationContinue foundedOutilFormationContinue = findByCode(outilFormationContinue.getCode());
        if (foundedOutilFormationContinue == null) {


            OutilFormationContinue savedOutilFormationContinue = outilFormationContinueDao.save(outilFormationContinue);

            result = savedOutilFormationContinue;
        }

        return result;
    }

    @Override
    public List<OutilFormationContinue> save(List<OutilFormationContinue> outilFormationContinues) {
        List<OutilFormationContinue> list = new ArrayList<>();
        for (OutilFormationContinue outilFormationContinue : outilFormationContinues) {
            list.add(save(outilFormationContinue));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(OutilFormationContinue outilFormationContinue) {
        if (outilFormationContinue.getCode() == null) return -1;

        OutilFormationContinue foundedOutilFormationContinue = findByCode(outilFormationContinue.getCode());
        if (foundedOutilFormationContinue == null) return -1;
        outilFormationContinueDao.delete(foundedOutilFormationContinue);
        return 1;
    }


    public List<OutilFormationContinue> findByCriteria(OutilFormationContinueVo outilFormationContinueVo) {

        String query = "SELECT o FROM OutilFormationContinue o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", outilFormationContinueVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", outilFormationContinueVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", outilFormationContinueVo.getCode());
        query += SearchUtil.addConstraint("o", "archive", "=", outilFormationContinueVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", outilFormationContinueVo.getDateArchivage());
        query += SearchUtil.addConstraintDate("o", "dateCreation", "=", outilFormationContinueVo.getDateCreation());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", outilFormationContinueVo.getDateArchivageMin(), outilFormationContinueVo.getDateArchivageMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateCreation", outilFormationContinueVo.getDateCreationMin(), outilFormationContinueVo.getDateCreationMax());
        query += " ORDER BY o.code";
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<OutilFormationContinue> outilFormationContinues) {
        if (ListUtil.isNotEmpty(outilFormationContinues)) {
            outilFormationContinues.forEach(e -> outilFormationContinueDao.delete(e));
        }
    }

    @Override
    public void update(List<OutilFormationContinue> outilFormationContinues) {
        if (ListUtil.isNotEmpty(outilFormationContinues)) {
            outilFormationContinues.forEach(e -> outilFormationContinueDao.save(e));
        }
    }


}
