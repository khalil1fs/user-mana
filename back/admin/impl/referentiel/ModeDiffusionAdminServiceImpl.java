package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.ModeDiffusion;
import com.ird.faa.bean.referentiel.TypeSavoir;
import com.ird.faa.dao.referentiel.ModeDiffusionDao;
import com.ird.faa.service.admin.facade.referentiel.ModeDiffusionAdminService;
import com.ird.faa.service.admin.facade.referentiel.TypeSavoirAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModeDiffusionVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class ModeDiffusionAdminServiceImpl extends AbstractServiceImpl<ModeDiffusion> implements ModeDiffusionAdminService {

    @Autowired
    private ModeDiffusionDao modeDiffusionDao;

    @Autowired
    private TypeSavoirAdminService typeSavoirService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<ModeDiffusion> findAll() {
        return modeDiffusionDao.findAll();
    }

    @Override
    public List<ModeDiffusion> findByTypeSavoirCode(String code) {
        return modeDiffusionDao.findByTypeSavoirCode(code);
    }

    @Override
    @Transactional
    public int deleteByTypeSavoirCode(String code) {
        return modeDiffusionDao.deleteByTypeSavoirCode(code);
    }

    @Override
    public List<ModeDiffusion> findByTypeSavoirId(Long id) {
        return modeDiffusionDao.findByTypeSavoirId(id);
    }

    @Override
    @Transactional
    public int deleteByTypeSavoirId(Long id) {
        return modeDiffusionDao.deleteByTypeSavoirId(id);
    }

    @Override
    public ModeDiffusion findByCode(String code) {
        if (code == null) return null;
        return modeDiffusionDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return modeDiffusionDao.deleteByCode(code);
    }

    @Override
    public ModeDiffusion findByIdOrCode(ModeDiffusion modeDiffusion) {
        ModeDiffusion resultat = null;
        if (modeDiffusion == null || (modeDiffusion.getCode() == null && modeDiffusion.getId() == null))
            return resultat;
        else {
            if (modeDiffusion.getId() != null) {
                resultat = modeDiffusionDao.findById(modeDiffusion.getId()).get();
            } else if (StringUtil.isNotEmpty(modeDiffusion.getCode())) {
                resultat = modeDiffusionDao.findByCode(modeDiffusion.getCode());
            }
            return resultat;
        }
    }

    @Override
    public ModeDiffusion findById(Long id) {
        if (id == null) return null;
        return modeDiffusionDao.getOne(id);
    }

    @Override
    public ModeDiffusion findByIdWithAssociatedList(Long id) {
        ModeDiffusion modeDiffusion = findById(id);
        return modeDiffusion;
    }


    @Transactional
    public int deleteById(Long id) {
        if (modeDiffusionDao.findById(id) == null) return 0;
        else {
            modeDiffusionDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public ModeDiffusion update(ModeDiffusion modeDiffusion) {
        ModeDiffusion foundedModeDiffusion = findById(modeDiffusion.getId());
        if (foundedModeDiffusion == null) return null;
        else {
            prepare(modeDiffusion);
            return modeDiffusionDao.save(modeDiffusion);
        }
    }

    @Override
    public ModeDiffusion save(ModeDiffusion modeDiffusion) {
        ModeDiffusion foundedModeDiffusion = findByCode(modeDiffusion.getCode());
        if (foundedModeDiffusion != null) return null;


        findTypeSavoir(modeDiffusion);
        prepare(modeDiffusion);

        ModeDiffusion savedModeDiffusion = modeDiffusionDao.save(modeDiffusion);
        return savedModeDiffusion;
    }

    @Override
    public List<ModeDiffusion> save(List<ModeDiffusion> modeDiffusions) {
        List<ModeDiffusion> list = new ArrayList<ModeDiffusion>();
        for (ModeDiffusion modeDiffusion : modeDiffusions) {
            list.add(save(modeDiffusion));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(ModeDiffusion modeDiffusion) {
        if (modeDiffusion.getCode() == null) return -1;

        ModeDiffusion foundedModeDiffusion = findByCode(modeDiffusion.getCode());
        if (foundedModeDiffusion == null) return -1;
        modeDiffusionDao.delete(foundedModeDiffusion);
        return 1;
    }


    public List<ModeDiffusion> findByCriteria(ModeDiffusionVo modeDiffusionVo) {

        String query = "SELECT o FROM ModeDiffusion o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", modeDiffusionVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", modeDiffusionVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", modeDiffusionVo.getCode());
        if (modeDiffusionVo.getTypeSavoirVo() != null) {
            query += SearchUtil.addConstraint("o", "typeSavoir.id", "=", modeDiffusionVo.getTypeSavoirVo().getId());
            query += SearchUtil.addConstraint("o", "typeSavoir.code", "LIKE", modeDiffusionVo.getTypeSavoirVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findTypeSavoir(ModeDiffusion modeDiffusion) {
        TypeSavoir loadedTypeSavoir = typeSavoirService.findByIdOrCode(modeDiffusion.getTypeSavoir());

        if (loadedTypeSavoir == null) {
            return;
        }
        modeDiffusion.setTypeSavoir(loadedTypeSavoir);
    }

    @Override
    @Transactional
    public void delete(List<ModeDiffusion> modeDiffusions) {
        if (ListUtil.isNotEmpty(modeDiffusions)) {
            modeDiffusions.forEach(e -> modeDiffusionDao.delete(e));
        }
    }

    @Override
    public void update(List<ModeDiffusion> modeDiffusions) {
        if (ListUtil.isNotEmpty(modeDiffusions)) {
            modeDiffusions.forEach(e -> modeDiffusionDao.save(e));
        }
    }


    @Override
    public List<List<ModeDiffusion>> getToBeSavedAndToBeDeleted(List<ModeDiffusion> oldList, List<ModeDiffusion> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
