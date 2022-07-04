package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.StatusProjet;
import com.ird.faa.dao.referentiel.StatusProjetDao;
import com.ird.faa.service.admin.facade.referentiel.StatusProjetAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.StatusProjetVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatusProjetAdminServiceImpl extends AbstractServiceImpl<StatusProjet> implements StatusProjetAdminService {

    @Autowired
    private StatusProjetDao statusProjetDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<StatusProjet> findAll() {
        return statusProjetDao.findAll();
    }

    @Override
    public StatusProjet findByCode(String code) {
        if (code == null) return null;
        return statusProjetDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return statusProjetDao.deleteByCode(code);
    }

    @Override
    public StatusProjet findByIdOrCode(StatusProjet statusProjet) {
        StatusProjet resultat = null;
        if (statusProjet == null || (statusProjet.getCode() == null && statusProjet.getId() == null))
            return resultat;
        else {
            if (statusProjet.getId() != null) {
                resultat = statusProjetDao.findById(statusProjet.getId()).get();
            } else if (StringUtil.isNotEmpty(statusProjet.getCode())) {
                resultat = statusProjetDao.findByCode(statusProjet.getCode());
            }
            return resultat;
        }
    }

    @Override
    public StatusProjet findById(Long id) {
        if (id == null) return null;
        return statusProjetDao.getOne(id);
    }

    @Override
    public StatusProjet findByIdWithAssociatedList(Long id) {
        StatusProjet statusProjet = findById(id);
        return statusProjet;
    }


    @Transactional
    public int deleteById(Long id) {
        if (statusProjetDao.findById(id) == null) return 0;
        else {
            statusProjetDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public StatusProjet update(StatusProjet statusProjet) {
        StatusProjet foundedStatusProjet = findById(statusProjet.getId());
        if (foundedStatusProjet == null) return null;
        else {
            prepare(statusProjet);
            return statusProjetDao.save(statusProjet);
        }
    }

    @Override
    public StatusProjet save(StatusProjet statusProjet) {
        StatusProjet foundedStatusProjet = findByCode(statusProjet.getCode());
        if (foundedStatusProjet != null) return null;

        prepare(statusProjet);

        StatusProjet savedStatusProjet = statusProjetDao.save(statusProjet);
        return savedStatusProjet;
    }

    @Override
    public List<StatusProjet> save(List<StatusProjet> statusProjets) {
        List<StatusProjet> list = new ArrayList<StatusProjet>();
        for (StatusProjet statusProjet : statusProjets) {
            list.add(save(statusProjet));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(StatusProjet statusProjet) {
        if (statusProjet.getCode() == null) return -1;

        StatusProjet foundedStatusProjet = findByCode(statusProjet.getCode());
        if (foundedStatusProjet == null) return -1;
        statusProjetDao.delete(foundedStatusProjet);
        return 1;
    }


    public List<StatusProjet> findByCriteria(StatusProjetVo statusProjetVo) {

        String query = "SELECT o FROM StatusProjet o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", statusProjetVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", statusProjetVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", statusProjetVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<StatusProjet> statusProjets) {
        if (ListUtil.isNotEmpty(statusProjets)) {
            statusProjets.forEach(e -> statusProjetDao.delete(e));
        }
    }

    @Override
    public void update(List<StatusProjet> statusProjets) {
        if (ListUtil.isNotEmpty(statusProjets)) {
            statusProjets.forEach(e -> statusProjetDao.save(e));
        }
    }


    @Override
    public List<List<StatusProjet>> getToBeSavedAndToBeDeleted(List<StatusProjet> oldList, List<StatusProjet> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
