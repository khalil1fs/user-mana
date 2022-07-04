package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Continent;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.referentiel.PaysDao;
import com.ird.faa.service.admin.facade.referentiel.ContinentAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.PaysVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaysAdminServiceImpl extends AbstractServiceImpl<Pays> implements PaysAdminService {

    @Autowired
    private PaysDao paysDao;

    @Autowired
    private ContinentAdminService continentService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Pays> findAll() {
        return paysDao.findAll();
    }

    @Override
    public List<Pays> findByContinentCode(String code) {
        return paysDao.findByContinentCode(code);
    }

    @Override
    @Transactional
    public int deleteByContinentCode(String code) {
        return paysDao.deleteByContinentCode(code);
    }

    @Override
    public List<Pays> findByContinentId(Long id) {
        return paysDao.findByContinentId(id);
    }

    @Override
    @Transactional
    public int deleteByContinentId(Long id) {
        return paysDao.deleteByContinentId(id);
    }

    @Override
    public Pays findByCode(String code) {
        if (code == null) return null;
        return paysDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return paysDao.deleteByCode(code);
    }

    @Override
    public Pays findByIdOrCode(Pays pays) {
        Pays resultat = null;
        if (pays == null || (pays.getCode() == null && pays.getId() == null))
            return resultat;
        else {
            if (pays.getId() != null) {
                resultat = paysDao.findById(pays.getId()).get();
            } else if (StringUtil.isNotEmpty(pays.getCode())) {
                resultat = paysDao.findByCode(pays.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Pays findById(Long id) {
        if (id == null) return null;
        return paysDao.getOne(id);
    }

    @Override
    public Pays findByIdWithAssociatedList(Long id) {
        Pays pays = findById(id);
        return pays;
    }


    @Transactional
    public int deleteById(Long id) {
        if (paysDao.findById(id) == null) return 0;
        else {
            paysDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Pays update(Pays pays) {
        Pays foundedPays = findById(pays.getId());
        if (foundedPays == null) return null;
        else {
            prepare(pays);
            return paysDao.save(pays);
        }
    }

    @Override
    public Pays save(Pays pays) {
        Pays foundedPays = findByCode(pays.getCode());
        if (foundedPays != null) return null;


        findContinent(pays);
        prepare(pays);

        Pays savedPays = paysDao.save(pays);
        return savedPays;
    }

    @Override
    public List<Pays> save(List<Pays> payss) {
        List<Pays> list = new ArrayList<Pays>();
        for (Pays pays : payss) {
            list.add(save(pays));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Pays pays) {
        if (pays.getCode() == null) return -1;

        Pays foundedPays = findByCode(pays.getCode());
        if (foundedPays == null) return -1;
        paysDao.delete(foundedPays);
        return 1;
    }


    public List<Pays> findByCriteria(PaysVo paysVo) {

        String query = "SELECT o FROM Pays o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", paysVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", paysVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", paysVo.getCode());
        if (paysVo.getContinentVo() != null) {
            query += SearchUtil.addConstraint("o", "continent.id", "=", paysVo.getContinentVo().getId());
            query += SearchUtil.addConstraint("o", "continent.code", "LIKE", paysVo.getContinentVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findContinent(Pays pays) {
        Continent loadedContinent = continentService.findByIdOrCode(pays.getContinent());

        if (loadedContinent == null && pays.getContinent() != null) {
            loadedContinent = continentService.save(pays.getContinent());
        }

        pays.setContinent(loadedContinent);
    }

    @Override
    @Transactional
    public void delete(List<Pays> payss) {
        if (ListUtil.isNotEmpty(payss)) {
            payss.forEach(e -> paysDao.delete(e));
        }
    }

    @Override
    public void update(List<Pays> payss) {
        if (ListUtil.isNotEmpty(payss)) {
            payss.forEach(e -> paysDao.save(e));
        }
    }


    @Override
    public List<List<Pays>> getToBeSavedAndToBeDeleted(List<Pays> oldList, List<Pays> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
