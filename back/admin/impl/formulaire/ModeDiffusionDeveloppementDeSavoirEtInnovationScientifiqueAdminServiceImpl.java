package com.ird.faa.service.admin.impl.formulaire;

import com.ird.faa.bean.formulaire.DeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.formulaire.ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique;
import com.ird.faa.bean.referentiel.ModeDiffusion;
import com.ird.faa.dao.formulaire.ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.DeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueAdminService;
import com.ird.faa.service.admin.facade.referentiel.ModeDiffusionAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueAdminServiceImpl extends AbstractServiceImpl<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> implements ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueAdminService {

    @Autowired
    private ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao;

    @Autowired
    private ModeDiffusionAdminService modeDiffusionService;
    @Autowired
    private DeveloppementDeSavoirEtInnovationScientifiqueAdminService developpementDeSavoirEtInnovationScientifiqueService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findAll() {
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.findAll();
    }

    @Override
    public List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findByModeDiffusionCode(String code) {
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.findByModeDiffusionCode(code);
    }

    @Override
    @Transactional
    public int deleteByModeDiffusionCode(String code) {
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteByModeDiffusionCode(code);
    }

    @Override
    public List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findByModeDiffusionId(Long id) {
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.findByModeDiffusionId(id);
    }

    @Override
    @Transactional
    public int deleteByModeDiffusionId(Long id) {
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteByModeDiffusionId(id);
    }

    @Override
    public List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id) {
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.findByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
    }

    @Override
    @Transactional
    public int deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(Long id) {
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteByDeveloppementDeSavoirEtInnovationScientifiqueId(id);
    }


    @Override
    public ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique findById(Long id) {
        if (id == null) return null;
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.getOne(id);
    }

    @Override
    public ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique findByIdWithAssociatedList(Long id) {
        ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique modeDiffusionDeveloppementDeSavoirEtInnovationScientifique = findById(id);
        return modeDiffusionDeveloppementDeSavoirEtInnovationScientifique;
    }


    @Transactional
    public int deleteById(Long id) {
        if (modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.findById(id) == null) return 0;
        else {
            modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique update(ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique modeDiffusionDeveloppementDeSavoirEtInnovationScientifique) {
        ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique foundedModeDiffusionDeveloppementDeSavoirEtInnovationScientifique = findById(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.getId());
        if (foundedModeDiffusionDeveloppementDeSavoirEtInnovationScientifique == null) return null;
        else {
            return modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.save(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique);
        }
    }

    @Override
    public ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique save(ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique modeDiffusionDeveloppementDeSavoirEtInnovationScientifique) {


        findModeDiffusion(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique);
        findDeveloppementDeSavoirEtInnovationScientifique(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique);

        ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique savedModeDiffusionDeveloppementDeSavoirEtInnovationScientifique = modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.save(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique);
        return savedModeDiffusionDeveloppementDeSavoirEtInnovationScientifique;
    }

    @Override
    public List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> save(List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques) {
        List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> list = new ArrayList<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique>();
        for (ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique modeDiffusionDeveloppementDeSavoirEtInnovationScientifique : modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques) {
            list.add(save(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique modeDiffusionDeveloppementDeSavoirEtInnovationScientifique) {
        if (modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.getId() == null) return -1;
        ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique foundedModeDiffusionDeveloppementDeSavoirEtInnovationScientifique = findById(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.getId());
        if (foundedModeDiffusionDeveloppementDeSavoirEtInnovationScientifique == null) return -1;
        modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.delete(foundedModeDiffusionDeveloppementDeSavoirEtInnovationScientifique);
        return 1;
    }


    public List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> findByCriteria(ModeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo) {

        String query = "SELECT o FROM ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo.getId());
        if (modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo.getModeDiffusionVo() != null) {
            query += SearchUtil.addConstraint("o", "modeDiffusion.id", "=", modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo.getModeDiffusionVo().getId());
            query += SearchUtil.addConstraint("o", "modeDiffusion.code", "LIKE", modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo.getModeDiffusionVo().getCode());
        }

        if (modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo.getDeveloppementDeSavoirEtInnovationScientifiqueVo() != null) {
            query += SearchUtil.addConstraint("o", "developpementDeSavoirEtInnovationScientifique.id", "=", modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueVo.getDeveloppementDeSavoirEtInnovationScientifiqueVo().getId());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findModeDiffusion(ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique modeDiffusionDeveloppementDeSavoirEtInnovationScientifique) {
        ModeDiffusion loadedModeDiffusion = modeDiffusionService.findByIdOrCode(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.getModeDiffusion());

        if (loadedModeDiffusion == null) {
            return;
        }
        modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.setModeDiffusion(loadedModeDiffusion);
    }

    private void findDeveloppementDeSavoirEtInnovationScientifique(ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique modeDiffusionDeveloppementDeSavoirEtInnovationScientifique) {
        DeveloppementDeSavoirEtInnovationScientifique loadedDeveloppementDeSavoirEtInnovationScientifique = null;
        if (modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.getDeveloppementDeSavoirEtInnovationScientifique() != null && modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.getDeveloppementDeSavoirEtInnovationScientifique().getId() != null)
            loadedDeveloppementDeSavoirEtInnovationScientifique = developpementDeSavoirEtInnovationScientifiqueService.findById(modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.getDeveloppementDeSavoirEtInnovationScientifique().getId());

        if (loadedDeveloppementDeSavoirEtInnovationScientifique == null) {
            return;
        }
        modeDiffusionDeveloppementDeSavoirEtInnovationScientifique.setDeveloppementDeSavoirEtInnovationScientifique(loadedDeveloppementDeSavoirEtInnovationScientifique);
    }

    @Override
    @Transactional
    public void delete(List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques) {
        if (ListUtil.isNotEmpty(modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques)) {
            modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques.forEach(e -> modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.delete(e));
        }
    }

    @Override
    public void update(List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques) {
        if (ListUtil.isNotEmpty(modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques)) {
            modeDiffusionDeveloppementDeSavoirEtInnovationScientifiques.forEach(e -> modeDiffusionDeveloppementDeSavoirEtInnovationScientifiqueDao.save(e));
        }
    }


    @Override
    public List<List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique>> getToBeSavedAndToBeDeleted(List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> oldList, List<ModeDiffusionDeveloppementDeSavoirEtInnovationScientifique> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
