package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.ModaliteEtude;
import com.ird.faa.dao.referentiel.ModaliteEtudeDao;
import com.ird.faa.service.admin.facade.referentiel.ModaliteEtudeAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModaliteEtudeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class ModaliteEtudeAdminServiceImpl extends AbstractServiceImpl<ModaliteEtude> implements ModaliteEtudeAdminService {

    @Autowired
    private ModaliteEtudeDao modaliteEtudeDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<ModaliteEtude> findAll() {
        return modaliteEtudeDao.findAll();
    }

    @Override
    public ModaliteEtude findByCode(String code) {
        if (code == null) return null;
        return modaliteEtudeDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return modaliteEtudeDao.deleteByCode(code);
    }

    @Override
    public ModaliteEtude findByIdOrCode(ModaliteEtude modaliteEtude) {
        ModaliteEtude resultat = null;
        if (modaliteEtude == null || (modaliteEtude.getCode() == null && modaliteEtude.getId() == null))
            return resultat;
        else {
            if (modaliteEtude.getId() != null) {
                resultat = modaliteEtudeDao.findById(modaliteEtude.getId()).get();
            } else if (StringUtil.isNotEmpty(modaliteEtude.getCode())) {
                resultat = modaliteEtudeDao.findByCode(modaliteEtude.getCode());
            }
            return resultat;
        }
    }

    @Override
    public ModaliteEtude findById(Long id) {
        if (id == null) return null;
        return modaliteEtudeDao.getOne(id);
    }

    @Override
    public ModaliteEtude findByIdWithAssociatedList(Long id) {
        ModaliteEtude modaliteEtude = findById(id);
        return modaliteEtude;
    }


    @Transactional
    public int deleteById(Long id) {
        if (modaliteEtudeDao.findById(id) == null) return 0;
        else {
            modaliteEtudeDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public ModaliteEtude update(ModaliteEtude modaliteEtude) {
        ModaliteEtude foundedModaliteEtude = findById(modaliteEtude.getId());
        if (foundedModaliteEtude == null) return null;
        else {
            prepare(modaliteEtude);

            return modaliteEtudeDao.save(modaliteEtude);
        }
    }

    @Override
    public ModaliteEtude save(ModaliteEtude modaliteEtude) {
        ModaliteEtude foundedModaliteEtude = findByCode(modaliteEtude.getCode());
        if (foundedModaliteEtude != null) return null;


        prepare(modaliteEtude);

        ModaliteEtude savedModaliteEtude = modaliteEtudeDao.save(modaliteEtude);
        return savedModaliteEtude;
    }

    @Override
    public List<ModaliteEtude> save(List<ModaliteEtude> modaliteEtudes) {
        List<ModaliteEtude> list = new ArrayList<ModaliteEtude>();
        for (ModaliteEtude modaliteEtude : modaliteEtudes) {
            list.add(save(modaliteEtude));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(ModaliteEtude modaliteEtude) {
        if (modaliteEtude.getCode() == null) return -1;

        ModaliteEtude foundedModaliteEtude = findByCode(modaliteEtude.getCode());
        if (foundedModaliteEtude == null) return -1;
        modaliteEtudeDao.delete(foundedModaliteEtude);
        return 1;
    }


    public List<ModaliteEtude> findByCriteria(ModaliteEtudeVo modaliteEtudeVo) {

        String query = "SELECT o FROM ModaliteEtude o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", modaliteEtudeVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", modaliteEtudeVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", modaliteEtudeVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", modaliteEtudeVo.getDescription());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<ModaliteEtude> modaliteEtudes) {
        if (ListUtil.isNotEmpty(modaliteEtudes)) {
            modaliteEtudes.forEach(e -> modaliteEtudeDao.delete(e));
        }
    }

    @Override
    public void update(List<ModaliteEtude> modaliteEtudes) {
        if (ListUtil.isNotEmpty(modaliteEtudes)) {
            modaliteEtudes.forEach(e -> modaliteEtudeDao.save(e));
        }
    }


    @Override
    public List<List<ModaliteEtude>> getToBeSavedAndToBeDeleted(List<ModaliteEtude> oldList, List<ModaliteEtude> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
