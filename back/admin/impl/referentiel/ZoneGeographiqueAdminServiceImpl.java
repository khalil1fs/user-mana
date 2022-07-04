package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.ZoneGeographique;
import com.ird.faa.dao.referentiel.ZoneGeographiqueDao;
import com.ird.faa.service.admin.facade.referentiel.ZoneGeographiqueAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ZoneGeographiqueVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ZoneGeographiqueAdminServiceImpl extends AbstractServiceImpl<ZoneGeographique>
        implements ZoneGeographiqueAdminService {

    @Autowired
    private ZoneGeographiqueDao zoneGeographiqueDao;

    @Autowired
    private ArchivableService<ZoneGeographique> archivableService;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<ZoneGeographique> findAll() {
        String query = "SELECT o FROM ZoneGeographique o where 1=1 ";
        query += " ORDER BY o.code";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public ZoneGeographique findByCode(String code) {
        if (code == null)
            return null;
        return zoneGeographiqueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return zoneGeographiqueDao.deleteByCode(code);
    }

    @Override
    public ZoneGeographique findByIdOrCode(ZoneGeographique zoneGeographique) {
        ZoneGeographique resultat = null;
        if (zoneGeographique != null) {
            if (StringUtil.isNotEmpty(zoneGeographique.getId())) {
                resultat = zoneGeographiqueDao.getOne(zoneGeographique.getId());
            } else if (StringUtil.isNotEmpty(zoneGeographique.getCode())) {
                resultat = zoneGeographiqueDao.findByCode(zoneGeographique.getCode());
            }
        }
        return resultat;
    }

    @Override
    public ZoneGeographique findById(Long id) {
        if (id == null)
            return null;
        return zoneGeographiqueDao.getOne(id);
    }

    @Override
    public ZoneGeographique findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    public ZoneGeographique archiver(ZoneGeographique zoneGeographique) {
        if (zoneGeographique.getArchive() == null) {
            zoneGeographique.setArchive(false);
        }
        zoneGeographique.setArchive(true);
        zoneGeographique.setDateArchivage(new Date());
        zoneGeographiqueDao.save(zoneGeographique);
        return zoneGeographique;

    }

    @Override
    public ZoneGeographique desarchiver(ZoneGeographique zoneGeographique) {
        if (zoneGeographique.getArchive() == null) {
            zoneGeographique.setArchive(false);
        }
        zoneGeographique.setArchive(false);
        zoneGeographique.setDateArchivage(null);
        zoneGeographiqueDao.save(zoneGeographique);
        return zoneGeographique;
    }

    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (zoneGeographiqueDao.findById(id).isPresent()) {
            zoneGeographiqueDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public ZoneGeographique update(ZoneGeographique zoneGeographique) {
        ZoneGeographique foundedZoneGeographique = findById(zoneGeographique.getId());
        if (foundedZoneGeographique == null)
            return null;
        else {
            archivableService.prepare(zoneGeographique);
            return zoneGeographiqueDao.save(zoneGeographique);
        }
    }

    private void prepareSave(ZoneGeographique zoneGeographique) {
        zoneGeographique.setDateCreation(new Date());
        if (zoneGeographique.getArchive() == null)
            zoneGeographique.setArchive(false);
//        if (zoneGeographique.getAdmin() == null)
//            zoneGeographique.setAdmin(false);
//        if (zoneGeographique.getVisible() == null)
//            zoneGeographique.setVisible(false);
        if (zoneGeographique.getDateArchivage() == null && zoneGeographique.getArchive() == true) {
            zoneGeographique.setDateArchivage(new Date());
        }
    }

    @Override
    public ZoneGeographique save(ZoneGeographique zoneGeographique) {
        prepareSave(zoneGeographique);

        ZoneGeographique result = null;
        ZoneGeographique foundedZoneGeographique = findByCode(zoneGeographique.getCode());
        if (foundedZoneGeographique == null) {
            ZoneGeographique savedZoneGeographique = zoneGeographiqueDao.save(zoneGeographique);
            result = savedZoneGeographique;
        }

        return result;
    }

    @Override
    public List<ZoneGeographique> save(List<ZoneGeographique> zoneGeographiques) {
        List<ZoneGeographique> list = new ArrayList<>();
        for (ZoneGeographique zoneGeographique : zoneGeographiques) {
            list.add(save(zoneGeographique));
        }
        return list;
    }

    @Override
    @Transactional
    public int delete(ZoneGeographique zoneGeographique) {
        if (zoneGeographique.getCode() == null)
            return -1;

        ZoneGeographique foundedZoneGeographique = findByCode(zoneGeographique.getCode());
        if (foundedZoneGeographique == null)
            return -1;
        zoneGeographiqueDao.delete(foundedZoneGeographique);
        return 1;
    }

    public List<ZoneGeographique> findByCriteria(ZoneGeographiqueVo zoneGeographiqueVo) {

        String query = "SELECT o FROM ZoneGeographique o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", zoneGeographiqueVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", zoneGeographiqueVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", zoneGeographiqueVo.getCode());
        query += SearchUtil.addConstraint("o", "archive", "=", zoneGeographiqueVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", zoneGeographiqueVo.getDateArchivage());
        query += SearchUtil.addConstraintDate("o", "dateCreation", "=", zoneGeographiqueVo.getDateCreation());
        query += SearchUtil.addConstraint("o", "admin", "=", zoneGeographiqueVo.getAdmin());
        query += SearchUtil.addConstraint("o", "visible", "=", zoneGeographiqueVo.getVisible());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", zoneGeographiqueVo.getDateArchivageMin(),
                zoneGeographiqueVo.getDateArchivageMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateCreation", zoneGeographiqueVo.getDateCreationMin(),
                zoneGeographiqueVo.getDateCreationMax());
        query += " ORDER BY o.code";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    @Transactional
    public void delete(List<ZoneGeographique> zoneGeographiques) {
        if (ListUtil.isNotEmpty(zoneGeographiques)) {
            zoneGeographiques.forEach(e -> zoneGeographiqueDao.delete(e));
        }
    }

    @Override
    public void update(List<ZoneGeographique> zoneGeographiques) {
        if (ListUtil.isNotEmpty(zoneGeographiques)) {
            zoneGeographiques.forEach(e -> zoneGeographiqueDao.save(e));
        }
    }

}
