package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.EvaluationEncadrement;
import com.ird.faa.bean.referentiel.Langue;
import com.ird.faa.dao.formulaire.EvaluationEncadrementDao;
import com.ird.faa.service.admin.facade.referentiel.EvaluationEncadrementAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.EvaluationEncadrementVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class EvaluationEncadrementAdminServiceImpl extends AbstractServiceImpl<EvaluationEncadrement> implements EvaluationEncadrementAdminService {

    @Autowired
    private EvaluationEncadrementDao evaluationEncadrementDao;






    @Autowired
    private EntityManager entityManager;


    @Override
    public List<EvaluationEncadrement> findAll() {
        return evaluationEncadrementDao.findAll();
    }

    @Override
    public EvaluationEncadrement findByCode(String code) {
        if (code == null) return null;
        return evaluationEncadrementDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return evaluationEncadrementDao.deleteByCode(code);
    }

    @Override
    public EvaluationEncadrement findByIdOrCode(EvaluationEncadrement evaluationEncadrement) {
        EvaluationEncadrement resultat = null;
        if (evaluationEncadrement == null || (evaluationEncadrement.getCode() == null && evaluationEncadrement.getId() == null))
            return resultat;
        else {
            if (evaluationEncadrement.getId() != null) {
                resultat = evaluationEncadrementDao.findById(evaluationEncadrement.getId()).get();
            } else if (StringUtil.isNotEmpty(evaluationEncadrement.getCode())) {
                resultat = evaluationEncadrementDao.findByCode(evaluationEncadrement.getCode());
            }
            return resultat;
        }
    }

    @Override
    public EvaluationEncadrement findById(Long id) {
        if (id == null) return null;
        return evaluationEncadrementDao.getOne(id);
    }

    @Override
    public EvaluationEncadrement findByIdWithAssociatedList(Long id) {
        EvaluationEncadrement evaluationEncadrement = findById(id);
        return evaluationEncadrement;
    }


    @Transactional
    public int deleteById(Long id) {
        if (evaluationEncadrementDao.findById(id) == null) return 0;
        else {
            evaluationEncadrementDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public EvaluationEncadrement update(EvaluationEncadrement evaluationEncadrement) {
        EvaluationEncadrement foundedEvaluationEncadrement = findById(evaluationEncadrement.getId());
        if (foundedEvaluationEncadrement == null) return null;
        else {
            prepare(evaluationEncadrement);

            return evaluationEncadrementDao.save(evaluationEncadrement);
        }
    }

    @Override
    public EvaluationEncadrement save(EvaluationEncadrement evaluationEncadrement) {
        EvaluationEncadrement foundedEvaluationEncadrement = findByCode(evaluationEncadrement.getCode());
        if (foundedEvaluationEncadrement != null) return null;

        prepare(evaluationEncadrement);

        EvaluationEncadrement savedEvaluationEncadrement = evaluationEncadrementDao.save(evaluationEncadrement);
        return savedEvaluationEncadrement;
    }

    @Override
    public List<EvaluationEncadrement> save(List<EvaluationEncadrement> evaluationEncadrements) {
        List<EvaluationEncadrement> list = new ArrayList<EvaluationEncadrement>();
        for (EvaluationEncadrement evaluationEncadrement : evaluationEncadrements) {
            list.add(save(evaluationEncadrement));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(EvaluationEncadrement evaluationEncadrement) {
        if (evaluationEncadrement.getCode() == null) return -1;

        EvaluationEncadrement foundedEvaluationEncadrement = findByCode(evaluationEncadrement.getCode());
        if (foundedEvaluationEncadrement == null) return -1;
        evaluationEncadrementDao.delete(foundedEvaluationEncadrement);
        return 1;
    }


    public List<EvaluationEncadrement> findByCriteria(EvaluationEncadrementVo evaluationEncadrementVo) {

        String query = "SELECT o FROM EvaluationEncadrement o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", evaluationEncadrementVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", evaluationEncadrementVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", evaluationEncadrementVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<EvaluationEncadrement> evaluationEncadrements) {
        if (ListUtil.isNotEmpty(evaluationEncadrements)) {
            evaluationEncadrements.forEach(e -> evaluationEncadrementDao.delete(e));
        }
    }

    @Override
    public void update(List<EvaluationEncadrement> evaluationEncadrements) {
        if (ListUtil.isNotEmpty(evaluationEncadrements)) {
            evaluationEncadrements.forEach(e -> evaluationEncadrementDao.save(e));
        }
    }


    @Override
    public List<List<EvaluationEncadrement>> getToBeSavedAndToBeDeleted(List<EvaluationEncadrement> oldList, List<EvaluationEncadrement> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
