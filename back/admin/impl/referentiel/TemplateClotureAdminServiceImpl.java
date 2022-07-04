package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TemplateCloture;
import com.ird.faa.dao.referentiel.TemplateClotureDao;
import com.ird.faa.service.admin.facade.referentiel.TemplateClotureAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TemplateClotureVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TemplateClotureAdminServiceImpl extends AbstractServiceImpl<TemplateCloture> implements TemplateClotureAdminService {

    @Autowired
    private TemplateClotureDao templateClotureDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TemplateCloture> findAll() {
        return templateClotureDao.findAll();
    }

    @Override
    public TemplateCloture findByCode(String code) {
        if (code == null) return null;
        return templateClotureDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return templateClotureDao.deleteByCode(code);
    }

    @Override
    public TemplateCloture findByIdOrCode(TemplateCloture templateCloture) {
        TemplateCloture resultat = null;
        if (templateCloture == null || (templateCloture.getCode() == null && templateCloture.getId() == null))
            return resultat;
        else {
            if (templateCloture.getId() != null) {
                resultat = templateClotureDao.findById(templateCloture.getId()).get();
            } else if (StringUtil.isNotEmpty(templateCloture.getCode())) {
                resultat = templateClotureDao.findByCode(templateCloture.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TemplateCloture findById(Long id) {
        if (id == null) return null;
        return templateClotureDao.getOne(id);
    }

    @Override
    public TemplateCloture findByIdWithAssociatedList(Long id) {
        TemplateCloture templateCloture = findById(id);
        return templateCloture;
    }


    @Transactional
    public int deleteById(Long id) {
        if (templateClotureDao.findById(id) == null) return 0;
        else {
            templateClotureDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TemplateCloture update(TemplateCloture templateCloture) {
        TemplateCloture foundedTemplateCloture = findById(templateCloture.getId());
        if (foundedTemplateCloture == null) return null;
        else {
            prepare(templateCloture);
            return templateClotureDao.save(templateCloture);
        }
    }

    @Override
    public TemplateCloture save(TemplateCloture templateCloture) {
        TemplateCloture foundedTemplateCloture = findByCode(templateCloture.getCode());
        if (foundedTemplateCloture != null) return null;


        prepare(templateCloture);

        TemplateCloture savedTemplateCloture = templateClotureDao.save(templateCloture);
        return savedTemplateCloture;
    }

    @Override
    public List<TemplateCloture> save(List<TemplateCloture> templateClotures) {
        List<TemplateCloture> list = new ArrayList<TemplateCloture>();
        for (TemplateCloture templateCloture : templateClotures) {
            list.add(save(templateCloture));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TemplateCloture templateCloture) {
        if (templateCloture.getCode() == null) return -1;

        TemplateCloture foundedTemplateCloture = findByCode(templateCloture.getCode());
        if (foundedTemplateCloture == null) return -1;
        templateClotureDao.delete(foundedTemplateCloture);
        return 1;
    }


    public List<TemplateCloture> findByCriteria(TemplateClotureVo templateClotureVo) {

        String query = "SELECT o FROM TemplateCloture o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", templateClotureVo.getId());
        query += SearchUtil.addConstraint("o", "code", "LIKE", templateClotureVo.getCode());
        query += SearchUtil.addConstraint("o", "objet", "LIKE", templateClotureVo.getObjet());
        query += SearchUtil.addConstraint("o", "message", "LIKE", templateClotureVo.getMessage());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TemplateCloture> templateClotures) {
        if (ListUtil.isNotEmpty(templateClotures)) {
            templateClotures.forEach(e -> templateClotureDao.delete(e));
        }
    }

    @Override
    public void update(List<TemplateCloture> templateClotures) {
        if (ListUtil.isNotEmpty(templateClotures)) {
            templateClotures.forEach(e -> templateClotureDao.save(e));
        }
    }


    @Override
    public List<List<TemplateCloture>> getToBeSavedAndToBeDeleted(List<TemplateCloture> oldList, List<TemplateCloture> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
