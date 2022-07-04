package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.EntiteAdministrative;
import com.ird.faa.bean.referentiel.Langue;
import com.ird.faa.bean.referentiel.TypeEntiteAdministrative;
import com.ird.faa.dao.referentiel.EntiteAdministrativeDao;
import com.ird.faa.service.admin.facade.referentiel.EntiteAdministrativeAdminService;
import com.ird.faa.service.admin.facade.referentiel.TypeEntiteAdministrativeAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.EntiteAdministrativeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class EntiteAdministrativeAdminServiceImpl extends AbstractServiceImpl<EntiteAdministrative> implements EntiteAdministrativeAdminService {

    @Autowired
    private EntiteAdministrativeDao entiteAdministrativeDao;

    @Autowired
    private TypeEntiteAdministrativeAdminService typeEntiteAdministrativeService;



  


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<EntiteAdministrative> findAll() {
        return entiteAdministrativeDao.findAll();
    }

    @Override
    public List<EntiteAdministrative> findByTypeEntiteAdministrativeCode(String code) {
        return entiteAdministrativeDao.findByTypeEntiteAdministrativeCode(code);
    }

    @Override
    @Transactional
    public int deleteByTypeEntiteAdministrativeCode(String code) {
        return entiteAdministrativeDao.deleteByTypeEntiteAdministrativeCode(code);
    }

    @Override
    public List<EntiteAdministrative> findByTypeEntiteAdministrativeId(Long id) {
        return entiteAdministrativeDao.findByTypeEntiteAdministrativeId(id);
    }

    @Override
    @Transactional
    public int deleteByTypeEntiteAdministrativeId(Long id) {
        return entiteAdministrativeDao.deleteByTypeEntiteAdministrativeId(id);
    }

    @Override
    public EntiteAdministrative findByCode(String code) {
        if (code == null) return null;
        return entiteAdministrativeDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return entiteAdministrativeDao.deleteByCode(code);
    }

    @Override
    public EntiteAdministrative findByIdOrCode(EntiteAdministrative entiteAdministrative) {
        EntiteAdministrative resultat = null;
        if (entiteAdministrative == null || (entiteAdministrative.getCode() == null && entiteAdministrative.getId() == null))
            return resultat;
        else {
            if (entiteAdministrative.getId() != null) {
                resultat = entiteAdministrativeDao.findById(entiteAdministrative.getId()).get();
            } else if (StringUtil.isNotEmpty(entiteAdministrative.getCode())) {
                resultat = entiteAdministrativeDao.findByCode(entiteAdministrative.getCode());
            }
            return resultat;
        }
    }

    @Override
    public EntiteAdministrative findById(Long id) {
        if (id == null) return null;
        return entiteAdministrativeDao.getOne(id);
    }

    @Override
    public EntiteAdministrative findByIdWithAssociatedList(Long id) {
        EntiteAdministrative entiteAdministrative = findById(id);
        return entiteAdministrative;
    }


    @Transactional
    public int deleteById(Long id) {
        if (entiteAdministrativeDao.findById(id) == null) return 0;
        else {
            entiteAdministrativeDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public EntiteAdministrative update(EntiteAdministrative entiteAdministrative) {
        EntiteAdministrative foundedEntiteAdministrative = findById(entiteAdministrative.getId());
        if (foundedEntiteAdministrative == null) return null;
        else {
            prepare(entiteAdministrative);

            return entiteAdministrativeDao.save(entiteAdministrative);
        }
    }

    @Override
    public EntiteAdministrative save(EntiteAdministrative entiteAdministrative) {
        EntiteAdministrative foundedEntiteAdministrative = findByCode(entiteAdministrative.getCode());
        if (foundedEntiteAdministrative != null) return null;


        findTypeEntiteAdministrative(entiteAdministrative);
        prepare(entiteAdministrative);

        EntiteAdministrative savedEntiteAdministrative = entiteAdministrativeDao.save(entiteAdministrative);
        return savedEntiteAdministrative;
    }

    @Override
    public List<EntiteAdministrative> save(List<EntiteAdministrative> entiteAdministratives) {
        List<EntiteAdministrative> list = new ArrayList<EntiteAdministrative>();
        for (EntiteAdministrative entiteAdministrative : entiteAdministratives) {
            list.add(save(entiteAdministrative));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(EntiteAdministrative entiteAdministrative) {
        if (entiteAdministrative.getCode() == null) return -1;

        EntiteAdministrative foundedEntiteAdministrative = findByCode(entiteAdministrative.getCode());
        if (foundedEntiteAdministrative == null) return -1;
        entiteAdministrativeDao.delete(foundedEntiteAdministrative);
        return 1;
    }


    public List<EntiteAdministrative> findByCriteria(EntiteAdministrativeVo entiteAdministrativeVo) {

        String query = "SELECT o FROM EntiteAdministrative o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", entiteAdministrativeVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", entiteAdministrativeVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", entiteAdministrativeVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", entiteAdministrativeVo.getDescription());
        if (entiteAdministrativeVo.getTypeEntiteAdministrativeVo() != null) {
            query += SearchUtil.addConstraint("o", "typeEntiteAdministrative.id", "=", entiteAdministrativeVo.getTypeEntiteAdministrativeVo().getId());
            query += SearchUtil.addConstraint("o", "typeEntiteAdministrative.code", "LIKE", entiteAdministrativeVo.getTypeEntiteAdministrativeVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findTypeEntiteAdministrative(EntiteAdministrative entiteAdministrative) {
        TypeEntiteAdministrative loadedTypeEntiteAdministrative = typeEntiteAdministrativeService.findByIdOrCode(entiteAdministrative.getTypeEntiteAdministrative());

        if (loadedTypeEntiteAdministrative == null) {
            return;
        }
        entiteAdministrative.setTypeEntiteAdministrative(loadedTypeEntiteAdministrative);
    }

    @Override
    @Transactional
    public void delete(List<EntiteAdministrative> entiteAdministratives) {
        if (ListUtil.isNotEmpty(entiteAdministratives)) {
            entiteAdministratives.forEach(e -> entiteAdministrativeDao.delete(e));
        }
    }

    @Override
    public void update(List<EntiteAdministrative> entiteAdministratives) {
        if (ListUtil.isNotEmpty(entiteAdministratives)) {
            entiteAdministratives.forEach(e -> entiteAdministrativeDao.save(e));
        }
    }


    @Override
    public List<List<EntiteAdministrative>> getToBeSavedAndToBeDeleted(List<EntiteAdministrative> oldList, List<EntiteAdministrative> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
