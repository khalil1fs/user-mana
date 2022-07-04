package com.ird.faa.service.admin.impl.formulaire;

import com.ird.faa.bean.config.EtatCampagneChercheur;
import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.CampagneChercheur;
import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.dao.formulaire.CampagneChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.admin.facade.config.EtatCampagneChercheurAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneChercheurVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class CampagneChercheurAdminServiceImpl extends AbstractServiceImpl<CampagneChercheur> implements CampagneChercheurAdminService {

    @Autowired
    private CampagneChercheurDao campagneChercheurDao;

    @Autowired
    private EtatCampagneChercheurAdminService etatCampagneChercheurService;
    @Autowired
    private CampagneAdminService campagneService;
    @Autowired
    private ChercheurAdminService chercheurService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<CampagneChercheur> findAll() {
        return campagneChercheurDao.findAll();
    }

    @Override
    public List<CampagneChercheur> findByChercheurNumeroMatricule(String numeroMatricule) {
        return campagneChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
    }

    @Override
    @Transactional
    public int deleteByChercheurNumeroMatricule(String numeroMatricule) {
        return campagneChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
    }

    @Override
    public List<CampagneChercheur> findByChercheurId(Long id) {
        return campagneChercheurDao.findByChercheurId(id);
    }

    @Override
    @Transactional
    public int deleteByChercheurId(Long id) {
        return campagneChercheurDao.deleteByChercheurId(id);
    }


    @Override
    public List<CampagneChercheur> findByCampagneCode(String code) {
        return campagneChercheurDao.findByCampagneCode(code);
    }

    @Override
    @Transactional
    public int deleteByCampagneCode(String code) {
        return campagneChercheurDao.deleteByCampagneCode(code);
    }

    @Override
    public List<CampagneChercheur> findByCampagneId(Long id) {
        return campagneChercheurDao.findByCampagneId(id);
    }

    @Override
    @Transactional
    public int deleteByCampagneId(Long id) {
        return campagneChercheurDao.deleteByCampagneId(id);
    }


    @Override
    public List<CampagneChercheur> findByEtatCampagneChercheurCode(String code) {
        return campagneChercheurDao.findByEtatCampagneChercheurCode(code);
    }

    @Override
    @Transactional
    public int deleteByEtatCampagneChercheurCode(String code) {
        return campagneChercheurDao.deleteByEtatCampagneChercheurCode(code);
    }

    @Override
    public List<CampagneChercheur> findByEtatCampagneChercheurId(Long id) {
        return campagneChercheurDao.findByEtatCampagneChercheurId(id);
    }

    @Override
    @Transactional
    public int deleteByEtatCampagneChercheurId(Long id) {
        return campagneChercheurDao.deleteByEtatCampagneChercheurId(id);
    }


    @Override
    public CampagneChercheur findById(Long id) {
        if (id == null) return null;
        return campagneChercheurDao.getOne(id);
    }

    @Override
    public CampagneChercheur findByIdWithAssociatedList(Long id) {
        CampagneChercheur campagneChercheur = findById(id);
        return campagneChercheur;
    }


    @Transactional
    public int deleteById(Long id) {
        if (campagneChercheurDao.findById(id) == null) return 0;
        else {
            campagneChercheurDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public CampagneChercheur update(CampagneChercheur campagneChercheur) {
        CampagneChercheur foundedCampagneChercheur = findById(campagneChercheur.getId());
        if (foundedCampagneChercheur == null) return null;
        else {
            return campagneChercheurDao.save(campagneChercheur);
        }
    }

    @Override
    public CampagneChercheur save(CampagneChercheur campagneChercheur) {


        findChercheur(campagneChercheur);
        findCampagne(campagneChercheur);
        findEtatCampagneChercheur(campagneChercheur);

        CampagneChercheur savedCampagneChercheur = campagneChercheurDao.save(campagneChercheur);
        return savedCampagneChercheur;
    }

    @Override
    public List<CampagneChercheur> save(List<CampagneChercheur> campagneChercheurs) {
        List<CampagneChercheur> list = new ArrayList<CampagneChercheur>();
        for (CampagneChercheur campagneChercheur : campagneChercheurs) {
            list.add(save(campagneChercheur));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(CampagneChercheur campagneChercheur) {
        if (campagneChercheur.getId() == null) return -1;
        CampagneChercheur foundedCampagneChercheur = findById(campagneChercheur.getId());
        if (foundedCampagneChercheur == null) return -1;
        campagneChercheurDao.delete(foundedCampagneChercheur);
        return 1;
    }


    public List<CampagneChercheur> findByCriteria(CampagneChercheurVo campagneChercheurVo) {

        String query = "SELECT o FROM CampagneChercheur o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", campagneChercheurVo.getId());
        query += SearchUtil.addConstraint("o", "avancement", "=", campagneChercheurVo.getAvancement());
        query += SearchUtil.addConstraintMinMax("o", "avancement", campagneChercheurVo.getAvancementMin(), campagneChercheurVo.getAvancementMax());
        if (campagneChercheurVo.getChercheurVo() != null) {
            query += SearchUtil.addConstraint("o", "chercheur.id", "=", campagneChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint("o", "chercheur.numeroMatricule", "LIKE", campagneChercheurVo.getChercheurVo().getNumeroMatricule());
        }

        if (campagneChercheurVo.getCampagneVo() != null) {
            query += SearchUtil.addConstraint("o", "campagne.id", "=", campagneChercheurVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint("o", "campagne.code", "LIKE", campagneChercheurVo.getCampagneVo().getCode());
        }

        if (campagneChercheurVo.getEtatCampagneChercheurVo() != null) {
            query += SearchUtil.addConstraint("o", "etatCampagneChercheur.id", "=", campagneChercheurVo.getEtatCampagneChercheurVo().getId());
            query += SearchUtil.addConstraint("o", "etatCampagneChercheur.code", "LIKE", campagneChercheurVo.getEtatCampagneChercheurVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findChercheur(CampagneChercheur campagneChercheur) {
        Chercheur loadedChercheur = chercheurService.findByIdOrNumeroMatricule(campagneChercheur.getChercheur());

        if (loadedChercheur == null) {
            return;
        }
        campagneChercheur.setChercheur(loadedChercheur);
    }

    private void findCampagne(CampagneChercheur campagneChercheur) {
        Campagne loadedCampagne = campagneService.findByIdOrCode(campagneChercheur.getCampagne());

        if (loadedCampagne == null) {
            return;
        }
        campagneChercheur.setCampagne(loadedCampagne);
    }

    private void findEtatCampagneChercheur(CampagneChercheur campagneChercheur) {
        EtatCampagneChercheur loadedEtatCampagneChercheur = etatCampagneChercheurService.findByIdOrCode(campagneChercheur.getEtatCampagneChercheur());

        if (loadedEtatCampagneChercheur == null) {
            return;
        }
        campagneChercheur.setEtatCampagneChercheur(loadedEtatCampagneChercheur);
    }

    @Override
    @Transactional
    public void delete(List<CampagneChercheur> campagneChercheurs) {
        if (ListUtil.isNotEmpty(campagneChercheurs)) {
            campagneChercheurs.forEach(e -> campagneChercheurDao.delete(e));
        }
    }

    @Override
    public void update(List<CampagneChercheur> campagneChercheurs) {
        if (ListUtil.isNotEmpty(campagneChercheurs)) {
            campagneChercheurs.forEach(e -> campagneChercheurDao.save(e));
        }
    }


    @Override
    public List<List<CampagneChercheur>> getToBeSavedAndToBeDeleted(List<CampagneChercheur> oldList, List<CampagneChercheur> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
