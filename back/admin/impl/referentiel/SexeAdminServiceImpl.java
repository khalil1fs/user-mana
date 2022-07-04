package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Sexe;
import com.ird.faa.dao.referentiel.SexeDao;
import com.ird.faa.service.admin.facade.referentiel.SexeAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.SexeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class SexeAdminServiceImpl extends AbstractServiceImpl<Sexe> implements SexeAdminService {

    @Autowired
    private SexeDao sexeDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Sexe> findAll() {
        return sexeDao.findAll();
    }

    @Override
    public Sexe findByCode(String code) {
        if (code == null) return null;
        return sexeDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return sexeDao.deleteByCode(code);
    }

    @Override
    public Sexe findByIdOrCode(Sexe sexe) {
        Sexe resultat = null;
        if (sexe == null || (sexe.getCode() == null && sexe.getId() == null))
            return resultat;
        else {
            if (sexe.getId() != null) {
                resultat = sexeDao.findById(sexe.getId()).get();
            } else if (StringUtil.isNotEmpty(sexe.getCode())) {
                resultat = sexeDao.findByCode(sexe.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Sexe findById(Long id) {
        if (id == null) return null;
        return sexeDao.getOne(id);
    }

    @Override
    public Sexe findByIdWithAssociatedList(Long id) {
        Sexe sexe = findById(id);
        return sexe;
    }


    @Transactional
    public int deleteById(Long id) {
        if (sexeDao.findById(id) == null) return 0;
        else {
            sexeDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Sexe update(Sexe sexe) {
        Sexe foundedSexe = findById(sexe.getId());
        if (foundedSexe == null) return null;
        else {
            prepare(sexe);

            return sexeDao.save(sexe);
        }
    }

    @Override
    public Sexe save(Sexe sexe) {
        Sexe foundedSexe = findByCode(sexe.getCode());
        if (foundedSexe != null) return null;

        prepare(sexe);


        Sexe savedSexe = sexeDao.save(sexe);
        return savedSexe;
    }

    @Override
    public List<Sexe> save(List<Sexe> sexes) {
        List<Sexe> list = new ArrayList<Sexe>();
        for (Sexe sexe : sexes) {
            list.add(save(sexe));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Sexe sexe) {
        if (sexe.getCode() == null) return -1;

        Sexe foundedSexe = findByCode(sexe.getCode());
        if (foundedSexe == null) return -1;
        sexeDao.delete(foundedSexe);
        return 1;
    }


    public List<Sexe> findByCriteria(SexeVo sexeVo) {

        String query = "SELECT o FROM Sexe o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", sexeVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", sexeVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", sexeVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<Sexe> sexes) {
        if (ListUtil.isNotEmpty(sexes)) {
            sexes.forEach(e -> sexeDao.delete(e));
        }
    }

    @Override
    public void update(List<Sexe> sexes) {
        if (ListUtil.isNotEmpty(sexes)) {
            sexes.forEach(e -> sexeDao.save(e));
        }
    }


    @Override
    public List<List<Sexe>> getToBeSavedAndToBeDeleted(List<Sexe> oldList, List<Sexe> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
