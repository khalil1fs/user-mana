package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.PubliqueProfessionel;
import com.ird.faa.dao.referentiel.PubliqueProfessionelDao;
import com.ird.faa.service.admin.facade.referentiel.PubliqueProfessionelAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.PubliqueProfessionelVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PubliqueProfessionelAdminServiceImpl extends AbstractServiceImpl<PubliqueProfessionel>
        implements PubliqueProfessionelAdminService {

    @Autowired
    private PubliqueProfessionelDao publiqueProfessionelDao;

    @Autowired
    private ArchivableService<PubliqueProfessionel> archivableService;

  


    @Autowired
    private EntityManager entityManager;

    @Override
    public List<PubliqueProfessionel> findAll() {
        return publiqueProfessionelDao.findAll();
    }

    @Override
    public PubliqueProfessionel findByCode(String code) {
        return publiqueProfessionelDao.findByCode(code);
    }

    @Override
    public int deleteByCode(String code) {
        return publiqueProfessionelDao.deleteByCode(code);
    }

    @Override
    public PubliqueProfessionel findById(Long id) {
        if (id == null)
            return null;
        return publiqueProfessionelDao.getOne(id);
    }

    @Override
    public PubliqueProfessionel findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    public PubliqueProfessionel archiver(PubliqueProfessionel publiqueProfessionel) {
        if (publiqueProfessionel.getArchive() == null) {
            publiqueProfessionel.setArchive(false);
        }
        publiqueProfessionel.setArchive(true);
        publiqueProfessionel.setDateArchivage(new Date());
        publiqueProfessionelDao.save(publiqueProfessionel);
        return publiqueProfessionel;

    }

    @Override
    public PubliqueProfessionel desarchiver(PubliqueProfessionel publiqueProfessionel) {
        if (publiqueProfessionel.getArchive() == null) {
            publiqueProfessionel.setArchive(false);
        }
        publiqueProfessionel.setArchive(false);
        publiqueProfessionel.setDateArchivage(null);
        publiqueProfessionelDao.save(publiqueProfessionel);
        return publiqueProfessionel;
    }

    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (publiqueProfessionelDao.findById(id).isPresent()) {
            publiqueProfessionelDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public PubliqueProfessionel update(PubliqueProfessionel publiqueProfessionel) {
        PubliqueProfessionel foundedPubliqueProfessionel = findById(publiqueProfessionel.getId());
        if (foundedPubliqueProfessionel == null)
            return null;
        else {
            prepare(publiqueProfessionel);
            archivableService.prepare(publiqueProfessionel);
            return publiqueProfessionelDao.save(publiqueProfessionel);
        }
    }


    @Override
    public PubliqueProfessionel save(PubliqueProfessionel publiqueProfessionel) {
        prepare(publiqueProfessionel);
        return publiqueProfessionelDao.save(publiqueProfessionel);

    }

    @Override
    public List<PubliqueProfessionel> save(List<PubliqueProfessionel> publiqueProfessionels) {
        List<PubliqueProfessionel> list = new ArrayList<>();
        for (PubliqueProfessionel publiqueProfessionel : publiqueProfessionels) {
            list.add(save(publiqueProfessionel));
        }
        return list;
    }

    @Override
    @Transactional
    public int delete(PubliqueProfessionel publiqueProfessionel) {
        if (publiqueProfessionel.getId() == null)
            return -1;
        PubliqueProfessionel foundedPubliqueProfessionel = findById(publiqueProfessionel.getId());
        if (foundedPubliqueProfessionel == null)
            return -1;
        publiqueProfessionelDao.delete(foundedPubliqueProfessionel);
        return 1;
    }

    public List<PubliqueProfessionel> findByCriteria(PubliqueProfessionelVo publiqueProfessionelVo) {

        String query = "SELECT o FROM PubliqueProfessionel o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", publiqueProfessionelVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", publiqueProfessionelVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", publiqueProfessionelVo.getCode());
        query += SearchUtil.addConstraint("o", "archive", "=", publiqueProfessionelVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", publiqueProfessionelVo.getDateArchivage());
        query += SearchUtil.addConstraintDate("o", "dateCreation", "=", publiqueProfessionelVo.getDateCreation());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", publiqueProfessionelVo.getDateArchivageMin(),
                publiqueProfessionelVo.getDateArchivageMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateCreation", publiqueProfessionelVo.getDateCreationMin(),
                publiqueProfessionelVo.getDateCreationMax());
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    @Transactional
    public void delete(List<PubliqueProfessionel> publiqueProfessionels) {
        if (ListUtil.isNotEmpty(publiqueProfessionels)) {
            publiqueProfessionels.forEach(e -> publiqueProfessionelDao.delete(e));
        }
    }

    @Override
    public void update(List<PubliqueProfessionel> publiqueProfessionels) {
        if (ListUtil.isNotEmpty(publiqueProfessionels)) {
            publiqueProfessionels.forEach(e -> publiqueProfessionelDao.save(e));
        }
    }

}
