package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.AffectationStructurelle;
import com.ird.faa.bean.referentiel.Langue;
import com.ird.faa.dao.referentiel.AffectationStructurelleDao;
import com.ird.faa.service.admin.facade.referentiel.AffectationStructurelleAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.AffectationStructurelleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class AffectationStructurelleAdminServiceImpl extends AbstractServiceImpl<AffectationStructurelle> implements AffectationStructurelleAdminService {

    @Autowired
    private AffectationStructurelleDao affectationStructurelleDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<AffectationStructurelle> findAll() {
        return affectationStructurelleDao.findAll();
    }

    @Override
    public AffectationStructurelle findByCode(String code) {
        if (code == null) return null;
        return affectationStructurelleDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return affectationStructurelleDao.deleteByCode(code);
    }

    @Override
    public AffectationStructurelle findByIdOrCode(AffectationStructurelle affectationStructurelle) {
        AffectationStructurelle resultat = null;
        if (affectationStructurelle != null) {
            if (StringUtil.isNotEmpty(affectationStructurelle.getId())) {
                resultat = affectationStructurelleDao.getOne(affectationStructurelle.getId());
            } else if (StringUtil.isNotEmpty(affectationStructurelle.getCode())) {
                resultat = affectationStructurelleDao.findByCode(affectationStructurelle.getCode());
            }
        }
        return resultat;
    }

    @Override
    public AffectationStructurelle findById(Long id) {
        if (id == null) return null;
        return affectationStructurelleDao.getOne(id);
    }

    @Override
    public AffectationStructurelle findByIdWithAssociatedList(Long id) {
        return findById(id);
    }


    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (affectationStructurelleDao.findById(id).isPresent()) {
            affectationStructurelleDao.deleteById(id);
            res = 1;
        }
        return res;
    }


    @Override
    public AffectationStructurelle update(AffectationStructurelle affectationStructurelle) {
        AffectationStructurelle foundedAffectationStructurelle = findById(affectationStructurelle.getId());
        if (foundedAffectationStructurelle == null) return null;
        else {
            prepare(affectationStructurelle);
            return affectationStructurelleDao.save(affectationStructurelle);
        }
    }

    @Override
    public AffectationStructurelle save(AffectationStructurelle affectationStructurelle) {

        AffectationStructurelle result = null;
        AffectationStructurelle foundedAffectationStructurelle = findByCode(affectationStructurelle.getCode());
        if (foundedAffectationStructurelle == null) {

            prepare(affectationStructurelle);
            AffectationStructurelle savedAffectationStructurelle = affectationStructurelleDao.save(affectationStructurelle);

            result = savedAffectationStructurelle;
        }

        return result;
    }

    @Override
    public List<AffectationStructurelle> save(List<AffectationStructurelle> affectationStructurelles) {
        List<AffectationStructurelle> list = new ArrayList<>();
        for (AffectationStructurelle affectationStructurelle : affectationStructurelles) {
            list.add(save(affectationStructurelle));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(AffectationStructurelle affectationStructurelle) {
        if (affectationStructurelle.getCode() == null) return -1;

        AffectationStructurelle foundedAffectationStructurelle = findByCode(affectationStructurelle.getCode());
        if (foundedAffectationStructurelle == null) return -1;
        affectationStructurelleDao.delete(foundedAffectationStructurelle);
        return 1;
    }


    public List<AffectationStructurelle> findByCriteria(AffectationStructurelleVo affectationStructurelleVo) {

        String query = "SELECT o FROM AffectationStructurelle o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", affectationStructurelleVo.getId());
        query += SearchUtil.addConstraint("o", "code", "LIKE", affectationStructurelleVo.getCode());
        query += SearchUtil.addConstraint("o", "libelleCourt", "LIKE", affectationStructurelleVo.getLibelleCourt());
        query += SearchUtil.addConstraint("o", "libelleLong", "LIKE", affectationStructurelleVo.getLibelleLong());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<AffectationStructurelle> affectationStructurelles) {
        if (ListUtil.isNotEmpty(affectationStructurelles)) {
            affectationStructurelles.forEach(e -> affectationStructurelleDao.delete(e));
        }
    }

    @Override
    public void update(List<AffectationStructurelle> affectationStructurelles) {
        if (ListUtil.isNotEmpty(affectationStructurelles)) {
            affectationStructurelles.forEach(e -> affectationStructurelleDao.save(e));
        }
    }


}
