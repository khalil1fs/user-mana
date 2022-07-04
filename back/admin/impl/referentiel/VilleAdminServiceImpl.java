package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.referentiel.Ville;
import com.ird.faa.dao.referentiel.VilleDao;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.VilleAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.VilleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class VilleAdminServiceImpl extends AbstractServiceImpl<Ville> implements VilleAdminService {

    @Autowired
    private VilleDao villeDao;

    @Autowired
    private PaysAdminService paysService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Ville> findAll() {
        return villeDao.findAll();
    }

    @Override
    public List<Ville> findByPaysCode(String code) {
        return villeDao.findByPaysCode(code);
    }

    @Override
    @Transactional
    public int deleteByPaysCode(String code) {
        return villeDao.deleteByPaysCode(code);
    }

    @Override
    public List<Ville> findByPaysId(Long id) {
        return villeDao.findByPaysId(id);
    }

    @Override
    @Transactional
    public int deleteByPaysId(Long id) {
        return villeDao.deleteByPaysId(id);
    }

    @Override
    public Ville findByCode(String code) {
        if (code == null) return null;
        return villeDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return villeDao.deleteByCode(code);
    }

    @Override
    public Ville findByIdOrCode(Ville ville) {
        Ville resultat = null;
        if (ville == null || (ville.getCode() == null && ville.getId() == null))
            return resultat;
        else {
            if (ville.getId() != null) {
                resultat = villeDao.findById(ville.getId()).get();
            } else if (StringUtil.isNotEmpty(ville.getCode())) {
                resultat = villeDao.findByCode(ville.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Ville findById(Long id) {
        if (id == null) return null;
        return villeDao.getOne(id);
    }

    @Override
    public Ville findByIdWithAssociatedList(Long id) {
        Ville ville = findById(id);
        return ville;
    }


    @Transactional
    public int deleteById(Long id) {
        if (villeDao.findById(id) == null) return 0;
        else {
            villeDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Ville update(Ville ville) {
        Ville foundedVille = findById(ville.getId());
        if (foundedVille == null) return null;
        else {
            prepare(ville);

            return villeDao.save(ville);
        }
    }

    @Override
    public Ville save(Ville ville) {
        Ville foundedVille = findByCode(ville.getCode());
        if (foundedVille != null) return null;

        prepare(ville);

        findPays(ville);

        Ville savedVille = villeDao.save(ville);
        return savedVille;
    }

    @Override
    public List<Ville> save(List<Ville> villes) {
        List<Ville> list = new ArrayList<Ville>();
        for (Ville ville : villes) {
            list.add(save(ville));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Ville ville) {
        if (ville.getCode() == null) return -1;

        Ville foundedVille = findByCode(ville.getCode());
        if (foundedVille == null) return -1;
        villeDao.delete(foundedVille);
        return 1;
    }


    public List<Ville> findByCriteria(VilleVo villeVo) {

        String query = "SELECT o FROM Ville o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", villeVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", villeVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", villeVo.getCode());
        if (villeVo.getPaysVo() != null) {
            query += SearchUtil.addConstraint("o", "pays.id", "=", villeVo.getPaysVo().getId());
            query += SearchUtil.addConstraint("o", "pays.code", "LIKE", villeVo.getPaysVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findPays(Ville ville) {
        Pays loadedPays = paysService.findByIdOrCode(ville.getPays());

        if (loadedPays == null) {
            return;
        }
        ville.setPays(loadedPays);
    }

    @Override
    @Transactional
    public void delete(List<Ville> villes) {
        if (ListUtil.isNotEmpty(villes)) {
            villes.forEach(e -> villeDao.delete(e));
        }
    }

    @Override
    public void update(List<Ville> villes) {
        if (ListUtil.isNotEmpty(villes)) {
            villes.forEach(e -> villeDao.save(e));
        }
    }


    @Override
    public List<List<Ville>> getToBeSavedAndToBeDeleted(List<Ville> oldList, List<Ville> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
