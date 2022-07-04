package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.TemplateOuverture;
import com.ird.faa.dao.referentiel.TemplateOuvertureDao;
import com.ird.faa.service.admin.facade.referentiel.TemplateOuvertureAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TemplateOuvertureVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class TemplateOuvertureAdminServiceImpl extends AbstractServiceImpl<TemplateOuverture> implements TemplateOuvertureAdminService {

    @Autowired
    private TemplateOuvertureDao templateOuvertureDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<TemplateOuverture> findAll() {
        return templateOuvertureDao.findAll();
    }

    @Override
    public TemplateOuverture findByCode(String code) {
        if (code == null) return null;
        return templateOuvertureDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return templateOuvertureDao.deleteByCode(code);
    }

    @Override
    public TemplateOuverture findByIdOrCode(TemplateOuverture templateOuverture) {
        TemplateOuverture resultat = null;
        if (templateOuverture == null || (templateOuverture.getCode() == null && templateOuverture.getId() == null))
            return resultat;
        else {
            if (templateOuverture.getId() != null) {
                resultat = templateOuvertureDao.findById(templateOuverture.getId()).get();
            } else if (StringUtil.isNotEmpty(templateOuverture.getCode())) {
                resultat = templateOuvertureDao.findByCode(templateOuverture.getCode());
            }
            return resultat;
        }
    }

    @Override
    public TemplateOuverture findById(Long id) {
        if (id == null) return null;
        return templateOuvertureDao.getOne(id);
    }

    @Override
    public TemplateOuverture findByIdWithAssociatedList(Long id) {
        TemplateOuverture templateOuverture = findById(id);
        return templateOuverture;
    }


    @Transactional
    public int deleteById(Long id) {
        if (templateOuvertureDao.findById(id) == null) return 0;
        else {
            templateOuvertureDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public TemplateOuverture update(TemplateOuverture templateOuverture) {
        TemplateOuverture foundedTemplateOuverture = findById(templateOuverture.getId());
        if (foundedTemplateOuverture == null) return null;
        else {
            prepare(templateOuverture);

            return templateOuvertureDao.save(templateOuverture);
        }
    }

    @Override
    public TemplateOuverture save(TemplateOuverture templateOuverture) {
        TemplateOuverture foundedTemplateOuverture = findByCode(templateOuverture.getCode());
        if (foundedTemplateOuverture != null) return null;

        prepare(templateOuverture);


        TemplateOuverture savedTemplateOuverture = templateOuvertureDao.save(templateOuverture);
        return savedTemplateOuverture;
    }

    @Override
    public List<TemplateOuverture> save(List<TemplateOuverture> templateOuvertures) {
        List<TemplateOuverture> list = new ArrayList<TemplateOuverture>();
        for (TemplateOuverture templateOuverture : templateOuvertures) {
            list.add(save(templateOuverture));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(TemplateOuverture templateOuverture) {
        if (templateOuverture.getCode() == null) return -1;

        TemplateOuverture foundedTemplateOuverture = findByCode(templateOuverture.getCode());
        if (foundedTemplateOuverture == null) return -1;
        templateOuvertureDao.delete(foundedTemplateOuverture);
        return 1;
    }


    public List<TemplateOuverture> findByCriteria(TemplateOuvertureVo templateOuvertureVo) {

        String query = "SELECT o FROM TemplateOuverture o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", templateOuvertureVo.getId());
        query += SearchUtil.addConstraint("o", "code", "LIKE", templateOuvertureVo.getCode());
        query += SearchUtil.addConstraint("o", "objet", "LIKE", templateOuvertureVo.getObjet());
        query += SearchUtil.addConstraint("o", "message", "LIKE", templateOuvertureVo.getMessage());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<TemplateOuverture> templateOuvertures) {
        if (ListUtil.isNotEmpty(templateOuvertures)) {
            templateOuvertures.forEach(e -> templateOuvertureDao.delete(e));
        }
    }

    @Override
    public void update(List<TemplateOuverture> templateOuvertures) {
        if (ListUtil.isNotEmpty(templateOuvertures)) {
            templateOuvertures.forEach(e -> templateOuvertureDao.save(e));
        }
    }


    @Override
    public List<List<TemplateOuverture>> getToBeSavedAndToBeDeleted(List<TemplateOuverture> oldList, List<TemplateOuverture> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
