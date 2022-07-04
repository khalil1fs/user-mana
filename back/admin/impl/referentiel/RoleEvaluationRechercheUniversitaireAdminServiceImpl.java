package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.RoleEvaluationRechercheUniversitaire;
import com.ird.faa.dao.referentiel.RoleEvaluationRechercheUniversitaireDao;
import com.ird.faa.service.admin.facade.referentiel.RoleEvaluationRechercheUniversitaireAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.RoleEvaluationRechercheUniversitaireVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoleEvaluationRechercheUniversitaireAdminServiceImpl extends AbstractServiceImpl<RoleEvaluationRechercheUniversitaire> implements RoleEvaluationRechercheUniversitaireAdminService {

    @Autowired
    private RoleEvaluationRechercheUniversitaireDao roleEvaluationRechercheUniversitaireDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<RoleEvaluationRechercheUniversitaire> findAll() {
        return roleEvaluationRechercheUniversitaireDao.findAll();
    }

    @Override
    public RoleEvaluationRechercheUniversitaire findByCode(String code) {
        if (code == null) return null;
        return roleEvaluationRechercheUniversitaireDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return roleEvaluationRechercheUniversitaireDao.deleteByCode(code);
    }

    @Override
    public RoleEvaluationRechercheUniversitaire findByIdOrCode(RoleEvaluationRechercheUniversitaire roleEvaluationRechercheUniversitaire) {
        RoleEvaluationRechercheUniversitaire resultat = null;
        if (roleEvaluationRechercheUniversitaire == null || (roleEvaluationRechercheUniversitaire.getCode() == null && roleEvaluationRechercheUniversitaire.getId() == null))
            return resultat;
        else {
            if (roleEvaluationRechercheUniversitaire.getId() != null) {
                resultat = roleEvaluationRechercheUniversitaireDao.findById(roleEvaluationRechercheUniversitaire.getId()).get();
            } else if (StringUtil.isNotEmpty(roleEvaluationRechercheUniversitaire.getCode())) {
                resultat = roleEvaluationRechercheUniversitaireDao.findByCode(roleEvaluationRechercheUniversitaire.getCode());
            }
            return resultat;
        }
    }

    @Override
    public RoleEvaluationRechercheUniversitaire findById(Long id) {
        if (id == null) return null;
        return roleEvaluationRechercheUniversitaireDao.getOne(id);
    }

    @Override
    public RoleEvaluationRechercheUniversitaire findByIdWithAssociatedList(Long id) {
        RoleEvaluationRechercheUniversitaire roleEvaluationRechercheUniversitaire = findById(id);
        return roleEvaluationRechercheUniversitaire;
    }


    @Transactional
    public int deleteById(Long id) {
        if (roleEvaluationRechercheUniversitaireDao.findById(id) == null) return 0;
        else {
            roleEvaluationRechercheUniversitaireDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public RoleEvaluationRechercheUniversitaire update(RoleEvaluationRechercheUniversitaire roleEvaluationRechercheUniversitaire) {
        RoleEvaluationRechercheUniversitaire foundedRoleEvaluationRechercheUniversitaire = findById(roleEvaluationRechercheUniversitaire.getId());
        if (foundedRoleEvaluationRechercheUniversitaire == null) return null;
        else {
            prepare(roleEvaluationRechercheUniversitaire);
            return roleEvaluationRechercheUniversitaireDao.save(roleEvaluationRechercheUniversitaire);
        }
    }

    @Override
    public RoleEvaluationRechercheUniversitaire save(RoleEvaluationRechercheUniversitaire roleEvaluationRechercheUniversitaire) {
        RoleEvaluationRechercheUniversitaire foundedRoleEvaluationRechercheUniversitaire = findByCode(roleEvaluationRechercheUniversitaire.getCode());
        if (foundedRoleEvaluationRechercheUniversitaire != null) return null;

        prepare(roleEvaluationRechercheUniversitaire);

        RoleEvaluationRechercheUniversitaire savedRoleEvaluationRechercheUniversitaire = roleEvaluationRechercheUniversitaireDao.save(roleEvaluationRechercheUniversitaire);
        return savedRoleEvaluationRechercheUniversitaire;
    }

    @Override
    public List<RoleEvaluationRechercheUniversitaire> save(List<RoleEvaluationRechercheUniversitaire> roleEvaluationRechercheUniversitaires) {
        List<RoleEvaluationRechercheUniversitaire> list = new ArrayList<RoleEvaluationRechercheUniversitaire>();
        for (RoleEvaluationRechercheUniversitaire roleEvaluationRechercheUniversitaire : roleEvaluationRechercheUniversitaires) {
            list.add(save(roleEvaluationRechercheUniversitaire));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(RoleEvaluationRechercheUniversitaire roleEvaluationRechercheUniversitaire) {
        if (roleEvaluationRechercheUniversitaire.getCode() == null) return -1;

        RoleEvaluationRechercheUniversitaire foundedRoleEvaluationRechercheUniversitaire = findByCode(roleEvaluationRechercheUniversitaire.getCode());
        if (foundedRoleEvaluationRechercheUniversitaire == null) return -1;
        roleEvaluationRechercheUniversitaireDao.delete(foundedRoleEvaluationRechercheUniversitaire);
        return 1;
    }


    public List<RoleEvaluationRechercheUniversitaire> findByCriteria(RoleEvaluationRechercheUniversitaireVo roleEvaluationRechercheUniversitaireVo) {

        String query = "SELECT o FROM RoleEvaluationRechercheUniversitaire o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", roleEvaluationRechercheUniversitaireVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", roleEvaluationRechercheUniversitaireVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", roleEvaluationRechercheUniversitaireVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", roleEvaluationRechercheUniversitaireVo.getDescription());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<RoleEvaluationRechercheUniversitaire> roleEvaluationRechercheUniversitaires) {
        if (ListUtil.isNotEmpty(roleEvaluationRechercheUniversitaires)) {
            roleEvaluationRechercheUniversitaires.forEach(e -> roleEvaluationRechercheUniversitaireDao.delete(e));
        }
    }

    @Override
    public void update(List<RoleEvaluationRechercheUniversitaire> roleEvaluationRechercheUniversitaires) {
        if (ListUtil.isNotEmpty(roleEvaluationRechercheUniversitaires)) {
            roleEvaluationRechercheUniversitaires.forEach(e -> roleEvaluationRechercheUniversitaireDao.save(e));
        }
    }


    @Override
    public List<List<RoleEvaluationRechercheUniversitaire>> getToBeSavedAndToBeDeleted(List<RoleEvaluationRechercheUniversitaire> oldList, List<RoleEvaluationRechercheUniversitaire> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
