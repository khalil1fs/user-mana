package com.ird.faa.service.admin.impl.formulaire;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.formulaire.DepartementScientifique;
import com.ird.faa.bean.formulaire.DepartementScientifiqueChercheur;
import com.ird.faa.dao.formulaire.DepartementScientifiqueChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.DepartementScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.DepartementScientifiqueChercheurAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.DepartementScientifiqueChercheurVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class DepartementScientifiqueChercheurAdminServiceImpl extends
        AbstractServiceImpl<DepartementScientifiqueChercheur> implements DepartementScientifiqueChercheurAdminService {

    @Autowired
    private DepartementScientifiqueChercheurDao departementScientifiqueChercheurDao;

    @Autowired
    private DepartementScientifiqueAdminService departementScientifiqueService;
    @Autowired
    private ChercheurAdminService chercheurService;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<DepartementScientifiqueChercheur> findAll() {
        return departementScientifiqueChercheurDao.findAll();
    }

    @Override
    public List<DepartementScientifiqueChercheur> findByChercheurNumeroMatricule(String numeroMatricule) {
        return departementScientifiqueChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
    }

    @Override
    @Transactional
    public int deleteByChercheurNumeroMatricule(String numeroMatricule) {
        return departementScientifiqueChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
    }

    @Override
    public List<DepartementScientifiqueChercheur> findByChercheurId(Long id) {
        return departementScientifiqueChercheurDao.findByChercheurId(id);
    }

    @Override
    @Transactional
    public int deleteByChercheurId(Long id) {
        return departementScientifiqueChercheurDao.deleteByChercheurId(id);
    }

    @Override
    public List<DepartementScientifiqueChercheur> findByDepartementScientifiqueCode(String code) {
        return departementScientifiqueChercheurDao.findByDepartementScientifiqueCode(code);
    }

    @Override
    @Transactional
    public int deleteByDepartementScientifiqueCode(String code) {
        return departementScientifiqueChercheurDao.deleteByDepartementScientifiqueCode(code);
    }

    @Override
    public List<DepartementScientifiqueChercheur> findByDepartementScientifiqueId(Long id) {
        return departementScientifiqueChercheurDao.findByDepartementScientifiqueId(id);
    }

    @Override
    @Transactional
    public int deleteByDepartementScientifiqueId(Long id) {
        return departementScientifiqueChercheurDao.deleteByDepartementScientifiqueId(id);
    }

    @Override
    public DepartementScientifiqueChercheur findById(Long id) {
        if (id == null)
            return null;
        return departementScientifiqueChercheurDao.getOne(id);
    }

    @Override
    public DepartementScientifiqueChercheur findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (departementScientifiqueChercheurDao.findById(id).isPresent()) {
            departementScientifiqueChercheurDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public DepartementScientifiqueChercheur update(DepartementScientifiqueChercheur departementScientifiqueChercheur) {
        DepartementScientifiqueChercheur foundedDepartementScientifiqueChercheur = findById(
                departementScientifiqueChercheur.getId());
        if (foundedDepartementScientifiqueChercheur == null)
            return null;
        else {
            return departementScientifiqueChercheurDao.save(departementScientifiqueChercheur);
        }
    }

    @Override
    public DepartementScientifiqueChercheur save(DepartementScientifiqueChercheur departementScientifiqueChercheur) {

        findChercheur(departementScientifiqueChercheur);
        findDepartementScientifique(departementScientifiqueChercheur);

        return departementScientifiqueChercheurDao.save(departementScientifiqueChercheur);

    }

    @Override
    public List<DepartementScientifiqueChercheur> save(
            List<DepartementScientifiqueChercheur> departementScientifiqueChercheurs) {
        List<DepartementScientifiqueChercheur> list = new ArrayList<>();
        for (DepartementScientifiqueChercheur departementScientifiqueChercheur : departementScientifiqueChercheurs) {
            list.add(save(departementScientifiqueChercheur));
        }
        return list;
    }

    @Override
    @Transactional
    public int delete(DepartementScientifiqueChercheur departementScientifiqueChercheur) {
        if (departementScientifiqueChercheur.getId() == null)
            return -1;
        DepartementScientifiqueChercheur foundedDepartementScientifiqueChercheur = findById(
                departementScientifiqueChercheur.getId());
        if (foundedDepartementScientifiqueChercheur == null)
            return -1;
        departementScientifiqueChercheurDao.delete(foundedDepartementScientifiqueChercheur);
        return 1;
    }

    public List<DepartementScientifiqueChercheur> findByCriteria(
            DepartementScientifiqueChercheurVo departementScientifiqueChercheurVo) {

        String query = "SELECT o FROM DepartementScientifiqueChercheur o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", departementScientifiqueChercheurVo.getId());
        if (departementScientifiqueChercheurVo.getChercheurVo() != null) {
            query += SearchUtil.addConstraint("o", "chercheur.id", "=",
                    departementScientifiqueChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint("o", "chercheur.numeroMatricule", "LIKE",
                    departementScientifiqueChercheurVo.getChercheurVo().getNumeroMatricule());
        }

        if (departementScientifiqueChercheurVo.getDepartementScientifiqueVo() != null) {
            query += SearchUtil.addConstraint("o", "departementScientifique.id", "=",
                    departementScientifiqueChercheurVo.getDepartementScientifiqueVo().getId());
            query += SearchUtil.addConstraint("o", "departementScientifique.code", "LIKE",
                    departementScientifiqueChercheurVo.getDepartementScientifiqueVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findChercheur(DepartementScientifiqueChercheur departementScientifiqueChercheur) {
        Chercheur loadedChercheur = chercheurService
                .findByIdOrNumeroMatricule(departementScientifiqueChercheur.getChercheur());

        if (loadedChercheur == null) {
            return;
        }
        departementScientifiqueChercheur.setChercheur(loadedChercheur);
    }

    private void findDepartementScientifique(DepartementScientifiqueChercheur departementScientifiqueChercheur) {
        DepartementScientifique loadedDepartementScientifique = departementScientifiqueService
                .findByIdOrCode(departementScientifiqueChercheur.getDepartementScientifique());

        if (loadedDepartementScientifique == null) {
            return;
        }
        departementScientifiqueChercheur.setDepartementScientifique(loadedDepartementScientifique);
    }

    @Override
    @Transactional
    public void delete(List<DepartementScientifiqueChercheur> departementScientifiqueChercheurs) {
        if (ListUtil.isNotEmpty(departementScientifiqueChercheurs)) {
            departementScientifiqueChercheurs.forEach(e -> departementScientifiqueChercheurDao.delete(e));
        }
    }

    @Override
    public void update(List<DepartementScientifiqueChercheur> departementScientifiqueChercheurs) {
        if (ListUtil.isNotEmpty(departementScientifiqueChercheurs)) {
            departementScientifiqueChercheurs.forEach(e -> departementScientifiqueChercheurDao.save(e));
        }
    }

}
