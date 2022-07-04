package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Modalite;
import com.ird.faa.dao.referentiel.ModaliteDao;
import com.ird.faa.service.admin.facade.referentiel.ModaliteAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModaliteVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class ModaliteAdminServiceImpl extends AbstractServiceImpl<Modalite> implements ModaliteAdminService {

    @Autowired
    private ModaliteDao modaliteDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Modalite> findAll() {
        return modaliteDao.findAll();
    }

    @Override
    public Modalite findByCode(String code) {
        if (code == null) return null;
        return modaliteDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return modaliteDao.deleteByCode(code);
    }

    @Override
    public Modalite findByIdOrCode(Modalite modalite) {
        Modalite resultat = null;
        if (modalite == null || (modalite.getCode() == null && modalite.getId() == null))
            return resultat;
        else {
            if (modalite.getId() != null) {
                resultat = modaliteDao.findById(modalite.getId()).get();
            } else if (StringUtil.isNotEmpty(modalite.getCode())) {
                resultat = modaliteDao.findByCode(modalite.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Modalite findById(Long id) {
        if (id == null) return null;
        return modaliteDao.getOne(id);
    }

    @Override
    public Modalite findByIdWithAssociatedList(Long id) {
        Modalite modalite = findById(id);
        return modalite;
    }


    @Transactional
    public int deleteById(Long id) {
        if (modaliteDao.findById(id) == null) return 0;
        else {
            modaliteDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Modalite update(Modalite modalite) {
        Modalite foundedModalite = findById(modalite.getId());
        if (foundedModalite == null) return null;
        else {
            prepare(modalite);
            return modaliteDao.save(modalite);
        }
    }

    @Override
    public Modalite save(Modalite modalite) {
        Modalite foundedModalite = findByCode(modalite.getCode());
        if (foundedModalite != null) return null;

        prepare(modalite);

        Modalite savedModalite = modaliteDao.save(modalite);
        return savedModalite;
    }

    @Override
    public List<Modalite> save(List<Modalite> modalites) {
        List<Modalite> list = new ArrayList<Modalite>();
        for (Modalite modalite : modalites) {
            list.add(save(modalite));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Modalite modalite) {
        if (modalite.getCode() == null) return -1;

        Modalite foundedModalite = findByCode(modalite.getCode());
        if (foundedModalite == null) return -1;
        modaliteDao.delete(foundedModalite);
        return 1;
    }


    public List<Modalite> findByCriteria(ModaliteVo modaliteVo) {

        String query = "SELECT o FROM Modalite o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", modaliteVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", modaliteVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", modaliteVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<Modalite> modalites) {
        if (ListUtil.isNotEmpty(modalites)) {
            modalites.forEach(e -> modaliteDao.delete(e));
        }
    }

    @Override
    public void update(List<Modalite> modalites) {
        if (ListUtil.isNotEmpty(modalites)) {
            modalites.forEach(e -> modaliteDao.save(e));
        }
    }


    @Override
    public List<List<Modalite>> getToBeSavedAndToBeDeleted(List<Modalite> oldList, List<Modalite> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
