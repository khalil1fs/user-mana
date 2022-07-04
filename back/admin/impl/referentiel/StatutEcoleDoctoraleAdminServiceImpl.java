package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.StatutEcoleDoctorale;
import com.ird.faa.dao.referentiel.StatutEcoleDoctoraleDao;
import com.ird.faa.service.admin.facade.referentiel.StatutEcoleDoctoraleAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.StatutEcoleDoctoraleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StatutEcoleDoctoraleAdminServiceImpl extends AbstractServiceImpl<StatutEcoleDoctorale> implements StatutEcoleDoctoraleAdminService {

    @Autowired
    private StatutEcoleDoctoraleDao statutEcoleDoctoraleDao;

    @Autowired
    private ArchivableService<StatutEcoleDoctorale> archivableService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<StatutEcoleDoctorale> findAll() {
        return statutEcoleDoctoraleDao.findAll();
    }

    @Override
    public StatutEcoleDoctorale findByCode(String code) {
        if (code == null) return null;
        return statutEcoleDoctoraleDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return statutEcoleDoctoraleDao.deleteByCode(code);
    }

    @Override
    public StatutEcoleDoctorale findByIdOrCode(StatutEcoleDoctorale statutEcoleDoctorale) {
        StatutEcoleDoctorale resultat = null;
        if (statutEcoleDoctorale != null) {
            if (StringUtil.isNotEmpty(statutEcoleDoctorale.getId())) {
                resultat = statutEcoleDoctoraleDao.getOne(statutEcoleDoctorale.getId());
            } else if (StringUtil.isNotEmpty(statutEcoleDoctorale.getCode())) {
                resultat = statutEcoleDoctoraleDao.findByCode(statutEcoleDoctorale.getCode());
            }
        }
        return resultat;
    }

    @Override
    public StatutEcoleDoctorale findById(Long id) {
        if (id == null) return null;
        return statutEcoleDoctoraleDao.getOne(id);
    }

    @Override
    public StatutEcoleDoctorale findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (statutEcoleDoctoraleDao.findById(id).isPresent()) {
            statutEcoleDoctoraleDao.deleteById(id);
            res = 1;
        }
        return res;
    }


    @Override
    public StatutEcoleDoctorale update(StatutEcoleDoctorale statutEcoleDoctorale) {
        StatutEcoleDoctorale foundedStatutEcoleDoctorale = findById(statutEcoleDoctorale.getId());
        if (foundedStatutEcoleDoctorale == null) return null;
        else {
            archivableService.prepare(statutEcoleDoctorale);
            return statutEcoleDoctoraleDao.save(statutEcoleDoctorale);
        }
    }

    private void prepareSave(StatutEcoleDoctorale statutEcoleDoctorale) {
        statutEcoleDoctorale.setDateCreation(new Date());
        if (statutEcoleDoctorale.getDateArchivage() == null)
            statutEcoleDoctorale.setDateArchivage(new Date());
        if (statutEcoleDoctorale.getArchive() == null)
            statutEcoleDoctorale.setArchive(false);


    }

    @Override
    public StatutEcoleDoctorale save(StatutEcoleDoctorale statutEcoleDoctorale) {
        prepareSave(statutEcoleDoctorale);

        StatutEcoleDoctorale result = null;
        StatutEcoleDoctorale foundedStatutEcoleDoctorale = findByCode(statutEcoleDoctorale.getCode());
        if (foundedStatutEcoleDoctorale == null) {


            StatutEcoleDoctorale savedStatutEcoleDoctorale = statutEcoleDoctoraleDao.save(statutEcoleDoctorale);

            result = savedStatutEcoleDoctorale;
        }

        return result;
    }

    @Override
    public List<StatutEcoleDoctorale> save(List<StatutEcoleDoctorale> statutEcoleDoctorales) {
        List<StatutEcoleDoctorale> list = new ArrayList<>();
        for (StatutEcoleDoctorale statutEcoleDoctorale : statutEcoleDoctorales) {
            list.add(save(statutEcoleDoctorale));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(StatutEcoleDoctorale statutEcoleDoctorale) {
        if (statutEcoleDoctorale.getCode() == null) return -1;

        StatutEcoleDoctorale foundedStatutEcoleDoctorale = findByCode(statutEcoleDoctorale.getCode());
        if (foundedStatutEcoleDoctorale == null) return -1;
        statutEcoleDoctoraleDao.delete(foundedStatutEcoleDoctorale);
        return 1;
    }


    public List<StatutEcoleDoctorale> findByCriteria(StatutEcoleDoctoraleVo statutEcoleDoctoraleVo) {

        String query = "SELECT o FROM StatutEcoleDoctorale o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", statutEcoleDoctoraleVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", statutEcoleDoctoraleVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", statutEcoleDoctoraleVo.getCode());
        query += SearchUtil.addConstraint("o", "archive", "=", statutEcoleDoctoraleVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", statutEcoleDoctoraleVo.getDateArchivage());
        query += SearchUtil.addConstraintDate("o", "dateCreation", "=", statutEcoleDoctoraleVo.getDateCreation());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", statutEcoleDoctoraleVo.getDateArchivageMin(), statutEcoleDoctoraleVo.getDateArchivageMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateCreation", statutEcoleDoctoraleVo.getDateCreationMin(), statutEcoleDoctoraleVo.getDateCreationMax());
        query += " ORDER BY o.code";
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<StatutEcoleDoctorale> statutEcoleDoctorales) {
        if (ListUtil.isNotEmpty(statutEcoleDoctorales)) {
            statutEcoleDoctorales.forEach(e -> statutEcoleDoctoraleDao.delete(e));
        }
    }

    @Override
    public void update(List<StatutEcoleDoctorale> statutEcoleDoctorales) {
        if (ListUtil.isNotEmpty(statutEcoleDoctorales)) {
            statutEcoleDoctorales.forEach(e -> statutEcoleDoctoraleDao.save(e));
        }
    }


}
