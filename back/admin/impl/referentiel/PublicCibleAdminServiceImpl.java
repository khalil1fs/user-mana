package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.PublicCible;
import com.ird.faa.dao.referentiel.PublicCibleDao;
import com.ird.faa.service.admin.facade.referentiel.PublicCibleAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.PublicCibleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class PublicCibleAdminServiceImpl extends AbstractServiceImpl<PublicCible> implements PublicCibleAdminService {

    @Autowired
    private PublicCibleDao publicCibleDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<PublicCible> findAll() {
        return publicCibleDao.findAll();
    }

    @Override
    public PublicCible findByCode(String code) {
        if (code == null) return null;
        return publicCibleDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return publicCibleDao.deleteByCode(code);
    }

    @Override
    public PublicCible findByIdOrCode(PublicCible publicCible) {
        PublicCible resultat = null;
        if (publicCible == null || (publicCible.getCode() == null && publicCible.getId() == null))
            return resultat;
        else {
            if (publicCible.getId() != null) {
                resultat = publicCibleDao.findById(publicCible.getId()).get();
            } else if (StringUtil.isNotEmpty(publicCible.getCode())) {
                resultat = publicCibleDao.findByCode(publicCible.getCode());
            }
            return resultat;
        }
    }

    @Override
    public PublicCible findById(Long id) {
        if (id == null) return null;
        return publicCibleDao.getOne(id);
    }

    @Override
    public PublicCible findByIdWithAssociatedList(Long id) {
        PublicCible publicCible = findById(id);
        return publicCible;
    }


    @Transactional
    public int deleteById(Long id) {
        if (publicCibleDao.findById(id) == null) return 0;
        else {
            publicCibleDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public PublicCible update(PublicCible publicCible) {
        PublicCible foundedPublicCible = findById(publicCible.getId());
        if (foundedPublicCible == null) return null;
        else {
            prepare(publicCible);
            return publicCibleDao.save(publicCible);
        }
    }

    @Override
    public PublicCible save(PublicCible publicCible) {
        PublicCible foundedPublicCible = findByCode(publicCible.getCode());
        if (foundedPublicCible != null) return null;

        prepare(publicCible);
        PublicCible savedPublicCible = publicCibleDao.save(publicCible);
        return savedPublicCible;
    }

    @Override
    public List<PublicCible> save(List<PublicCible> publicCibles) {
        List<PublicCible> list = new ArrayList<PublicCible>();
        for (PublicCible publicCible : publicCibles) {
            list.add(save(publicCible));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(PublicCible publicCible) {
        if (publicCible.getCode() == null) return -1;

        PublicCible foundedPublicCible = findByCode(publicCible.getCode());
        if (foundedPublicCible == null) return -1;
        publicCibleDao.delete(foundedPublicCible);
        return 1;
    }


    public List<PublicCible> findByCriteria(PublicCibleVo publicCibleVo) {

        String query = "SELECT o FROM PublicCible o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", publicCibleVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", publicCibleVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", publicCibleVo.getCode());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<PublicCible> publicCibles) {
        if (ListUtil.isNotEmpty(publicCibles)) {
            publicCibles.forEach(e -> publicCibleDao.delete(e));
        }
    }

    @Override
    public void update(List<PublicCible> publicCibles) {
        if (ListUtil.isNotEmpty(publicCibles)) {
            publicCibles.forEach(e -> publicCibleDao.save(e));
        }
    }


    @Override
    public List<List<PublicCible>> getToBeSavedAndToBeDeleted(List<PublicCible> oldList, List<PublicCible> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
