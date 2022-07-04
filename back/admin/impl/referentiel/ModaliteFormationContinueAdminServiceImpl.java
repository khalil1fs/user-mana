package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.ModaliteFormationContinue;
import com.ird.faa.dao.referentiel.ModaliteFormationContinueDao;
import com.ird.faa.service.admin.facade.referentiel.ModaliteFormationContinueAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModaliteFormationContinueVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class ModaliteFormationContinueAdminServiceImpl extends AbstractServiceImpl<ModaliteFormationContinue> implements ModaliteFormationContinueAdminService {

    @Autowired
    private ModaliteFormationContinueDao modaliteFormationContinueDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<ModaliteFormationContinue> findAll() {
        return modaliteFormationContinueDao.findAll();
    }

    @Override
    public ModaliteFormationContinue findByCode(String code) {
        if (code == null) return null;
        return modaliteFormationContinueDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return modaliteFormationContinueDao.deleteByCode(code);
    }

    @Override
    public ModaliteFormationContinue findByIdOrCode(ModaliteFormationContinue modaliteFormationContinue) {
        ModaliteFormationContinue resultat = null;
        if (modaliteFormationContinue == null || (modaliteFormationContinue.getCode() == null && modaliteFormationContinue.getId() == null))
            return resultat;
        else {
            if (modaliteFormationContinue.getId() != null) {
                resultat = modaliteFormationContinueDao.findById(modaliteFormationContinue.getId()).get();
            } else if (StringUtil.isNotEmpty(modaliteFormationContinue.getCode())) {
                resultat = modaliteFormationContinueDao.findByCode(modaliteFormationContinue.getCode());
            }
            return resultat;
        }
    }

    @Override
    public ModaliteFormationContinue findById(Long id) {
        if (id == null) return null;
        return modaliteFormationContinueDao.getOne(id);
    }

    @Override
    public ModaliteFormationContinue findByIdWithAssociatedList(Long id) {
        ModaliteFormationContinue modaliteFormationContinue = findById(id);
        return modaliteFormationContinue;
    }


    @Transactional
    public int deleteById(Long id) {
        if (modaliteFormationContinueDao.findById(id) == null) return 0;
        else {
            modaliteFormationContinueDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public ModaliteFormationContinue update(ModaliteFormationContinue modaliteFormationContinue) {
        ModaliteFormationContinue foundedModaliteFormationContinue = findById(modaliteFormationContinue.getId());
        if (foundedModaliteFormationContinue == null) return null;
        else {
            prepare(modaliteFormationContinue);

            return modaliteFormationContinueDao.save(modaliteFormationContinue);
        }
    }

    @Override
    public ModaliteFormationContinue save(ModaliteFormationContinue modaliteFormationContinue) {
        ModaliteFormationContinue foundedModaliteFormationContinue = findByCode(modaliteFormationContinue.getCode());
        if (foundedModaliteFormationContinue != null) return null;


        prepare(modaliteFormationContinue);

        ModaliteFormationContinue savedModaliteFormationContinue = modaliteFormationContinueDao.save(modaliteFormationContinue);
        return savedModaliteFormationContinue;
    }

    @Override
    public List<ModaliteFormationContinue> save(List<ModaliteFormationContinue> modaliteFormationContinues) {
        List<ModaliteFormationContinue> list = new ArrayList<ModaliteFormationContinue>();
        for (ModaliteFormationContinue modaliteFormationContinue : modaliteFormationContinues) {
            list.add(save(modaliteFormationContinue));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(ModaliteFormationContinue modaliteFormationContinue) {
        if (modaliteFormationContinue.getCode() == null) return -1;

        ModaliteFormationContinue foundedModaliteFormationContinue = findByCode(modaliteFormationContinue.getCode());
        if (foundedModaliteFormationContinue == null) return -1;
        modaliteFormationContinueDao.delete(foundedModaliteFormationContinue);
        return 1;
    }


    public List<ModaliteFormationContinue> findByCriteria(ModaliteFormationContinueVo modaliteFormationContinueVo) {

        String query = "SELECT o FROM ModaliteFormationContinue o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", modaliteFormationContinueVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", modaliteFormationContinueVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", modaliteFormationContinueVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<ModaliteFormationContinue> modaliteFormationContinues) {
        if (ListUtil.isNotEmpty(modaliteFormationContinues)) {
            modaliteFormationContinues.forEach(e -> modaliteFormationContinueDao.delete(e));
        }
    }

    @Override
    public void update(List<ModaliteFormationContinue> modaliteFormationContinues) {
        if (ListUtil.isNotEmpty(modaliteFormationContinues)) {
            modaliteFormationContinues.forEach(e -> modaliteFormationContinueDao.save(e));
        }
    }


    @Override
    public List<List<ModaliteFormationContinue>> getToBeSavedAndToBeDeleted(List<ModaliteFormationContinue> oldList, List<ModaliteFormationContinue> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
