package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.RoleDeveloppementDeSavoir;
import com.ird.faa.dao.referentiel.RoleDeveloppementDeSavoirDao;
import com.ird.faa.service.admin.facade.referentiel.RoleDeveloppementDeSavoirAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.RoleDeveloppementDeSavoirVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoleDeveloppementDeSavoirAdminServiceImpl extends AbstractServiceImpl<RoleDeveloppementDeSavoir> implements RoleDeveloppementDeSavoirAdminService {

    @Autowired
    private RoleDeveloppementDeSavoirDao roleDeveloppementDeSavoirDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<RoleDeveloppementDeSavoir> findAll() {
        return roleDeveloppementDeSavoirDao.findAll();
    }

    @Override
    public RoleDeveloppementDeSavoir findByCode(String code) {
        if (code == null) return null;
        return roleDeveloppementDeSavoirDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return roleDeveloppementDeSavoirDao.deleteByCode(code);
    }

    @Override
    public RoleDeveloppementDeSavoir findByIdOrCode(RoleDeveloppementDeSavoir roleDeveloppementDeSavoir) {
        RoleDeveloppementDeSavoir resultat = null;
        if (roleDeveloppementDeSavoir == null || (roleDeveloppementDeSavoir.getCode() == null && roleDeveloppementDeSavoir.getId() == null))
            return resultat;
        else {
            if (roleDeveloppementDeSavoir.getId() != null) {
                resultat = roleDeveloppementDeSavoirDao.findById(roleDeveloppementDeSavoir.getId()).get();
            } else if (StringUtil.isNotEmpty(roleDeveloppementDeSavoir.getCode())) {
                resultat = roleDeveloppementDeSavoirDao.findByCode(roleDeveloppementDeSavoir.getCode());
            }
            return resultat;
        }
    }

    @Override
    public RoleDeveloppementDeSavoir findById(Long id) {
        if (id == null) return null;
        return roleDeveloppementDeSavoirDao.getOne(id);
    }

    @Override
    public RoleDeveloppementDeSavoir findByIdWithAssociatedList(Long id) {
        RoleDeveloppementDeSavoir roleDeveloppementDeSavoir = findById(id);
        return roleDeveloppementDeSavoir;
    }


    @Transactional
    public int deleteById(Long id) {
        if (roleDeveloppementDeSavoirDao.findById(id) == null) return 0;
        else {
            roleDeveloppementDeSavoirDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public RoleDeveloppementDeSavoir update(RoleDeveloppementDeSavoir roleDeveloppementDeSavoir) {
        RoleDeveloppementDeSavoir foundedRoleDeveloppementDeSavoir = findById(roleDeveloppementDeSavoir.getId());
        if (foundedRoleDeveloppementDeSavoir == null) return null;
        else {
            prepare(roleDeveloppementDeSavoir);

            return roleDeveloppementDeSavoirDao.save(roleDeveloppementDeSavoir);
        }
    }

    @Override
    public RoleDeveloppementDeSavoir save(RoleDeveloppementDeSavoir roleDeveloppementDeSavoir) {
        RoleDeveloppementDeSavoir foundedRoleDeveloppementDeSavoir = findByCode(roleDeveloppementDeSavoir.getCode());
        if (foundedRoleDeveloppementDeSavoir != null) return null;


        prepare(roleDeveloppementDeSavoir);

        RoleDeveloppementDeSavoir savedRoleDeveloppementDeSavoir = roleDeveloppementDeSavoirDao.save(roleDeveloppementDeSavoir);
        return savedRoleDeveloppementDeSavoir;
    }

    @Override
    public List<RoleDeveloppementDeSavoir> save(List<RoleDeveloppementDeSavoir> roleDeveloppementDeSavoirs) {
        List<RoleDeveloppementDeSavoir> list = new ArrayList<RoleDeveloppementDeSavoir>();
        for (RoleDeveloppementDeSavoir roleDeveloppementDeSavoir : roleDeveloppementDeSavoirs) {
            list.add(save(roleDeveloppementDeSavoir));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(RoleDeveloppementDeSavoir roleDeveloppementDeSavoir) {
        if (roleDeveloppementDeSavoir.getCode() == null) return -1;

        RoleDeveloppementDeSavoir foundedRoleDeveloppementDeSavoir = findByCode(roleDeveloppementDeSavoir.getCode());
        if (foundedRoleDeveloppementDeSavoir == null) return -1;
        roleDeveloppementDeSavoirDao.delete(foundedRoleDeveloppementDeSavoir);
        return 1;
    }


    public List<RoleDeveloppementDeSavoir> findByCriteria(RoleDeveloppementDeSavoirVo roleDeveloppementDeSavoirVo) {

        String query = "SELECT o FROM RoleDeveloppementDeSavoir o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", roleDeveloppementDeSavoirVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", roleDeveloppementDeSavoirVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", roleDeveloppementDeSavoirVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<RoleDeveloppementDeSavoir> roleDeveloppementDeSavoirs) {
        if (ListUtil.isNotEmpty(roleDeveloppementDeSavoirs)) {
            roleDeveloppementDeSavoirs.forEach(e -> roleDeveloppementDeSavoirDao.delete(e));
        }
    }

    @Override
    public void update(List<RoleDeveloppementDeSavoir> roleDeveloppementDeSavoirs) {
        if (ListUtil.isNotEmpty(roleDeveloppementDeSavoirs)) {
            roleDeveloppementDeSavoirs.forEach(e -> roleDeveloppementDeSavoirDao.save(e));
        }
    }


    @Override
    public List<List<RoleDeveloppementDeSavoir>> getToBeSavedAndToBeDeleted(List<RoleDeveloppementDeSavoir> oldList, List<RoleDeveloppementDeSavoir> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
