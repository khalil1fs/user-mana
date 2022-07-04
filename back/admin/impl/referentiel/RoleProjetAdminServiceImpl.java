package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.RoleProjet;
import com.ird.faa.dao.referentiel.RoleProjetDao;
import com.ird.faa.service.admin.facade.referentiel.RoleProjetAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.RoleProjetVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoleProjetAdminServiceImpl extends AbstractServiceImpl<RoleProjet> implements RoleProjetAdminService {

    @Autowired
    private RoleProjetDao roleProjetDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<RoleProjet> findAll() {
        return roleProjetDao.findAll();
    }

    @Override
    public RoleProjet findByCode(String code) {
        if (code == null) return null;
        return roleProjetDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return roleProjetDao.deleteByCode(code);
    }

    @Override
    public RoleProjet findByIdOrCode(RoleProjet roleProjet) {
        RoleProjet resultat = null;
        if (roleProjet == null || (roleProjet.getCode() == null && roleProjet.getId() == null))
            return resultat;
        else {
            if (roleProjet.getId() != null) {
                resultat = roleProjetDao.findById(roleProjet.getId()).get();
            } else if (StringUtil.isNotEmpty(roleProjet.getCode())) {
                resultat = roleProjetDao.findByCode(roleProjet.getCode());
            }
            return resultat;
        }
    }

    @Override
    public RoleProjet findById(Long id) {
        if (id == null) return null;
        return roleProjetDao.getOne(id);
    }

    @Override
    public RoleProjet findByIdWithAssociatedList(Long id) {
        RoleProjet roleProjet = findById(id);
        return roleProjet;
    }


    @Transactional
    public int deleteById(Long id) {
        if (roleProjetDao.findById(id) == null) return 0;
        else {
            roleProjetDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public RoleProjet update(RoleProjet roleProjet) {
        RoleProjet foundedRoleProjet = findById(roleProjet.getId());
        if (foundedRoleProjet == null) return null;
        else {
            prepare(roleProjet);
            return roleProjetDao.save(roleProjet);
        }
    }

    @Override
    public RoleProjet save(RoleProjet roleProjet) {
        RoleProjet foundedRoleProjet = findByCode(roleProjet.getCode());
        if (foundedRoleProjet != null) return null;


        RoleProjet savedRoleProjet = roleProjetDao.save(roleProjet);
        return savedRoleProjet;
    }

    @Override
    public List<RoleProjet> save(List<RoleProjet> roleProjets) {
        List<RoleProjet> list = new ArrayList<RoleProjet>();
        for (RoleProjet roleProjet : roleProjets) {
            list.add(save(roleProjet));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(RoleProjet roleProjet) {
        if (roleProjet.getCode() == null) return -1;

        RoleProjet foundedRoleProjet = findByCode(roleProjet.getCode());
        if (foundedRoleProjet == null) return -1;
        roleProjetDao.delete(foundedRoleProjet);
        return 1;
    }


    public List<RoleProjet> findByCriteria(RoleProjetVo roleProjetVo) {

        String query = "SELECT o FROM RoleProjet o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", roleProjetVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", roleProjetVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", roleProjetVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", roleProjetVo.getDescription());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<RoleProjet> roleProjets) {
        if (ListUtil.isNotEmpty(roleProjets)) {
            roleProjets.forEach(e -> roleProjetDao.delete(e));
        }
    }

    @Override
    public void update(List<RoleProjet> roleProjets) {
        if (ListUtil.isNotEmpty(roleProjets)) {
            roleProjets.forEach(e -> roleProjetDao.save(e));
        }
    }


    @Override
    public List<List<RoleProjet>> getToBeSavedAndToBeDeleted(List<RoleProjet> oldList, List<RoleProjet> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
