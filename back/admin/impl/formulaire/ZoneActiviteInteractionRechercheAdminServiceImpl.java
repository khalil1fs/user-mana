package com.ird.faa.service.admin.impl.formulaire;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.formulaire.ZoneActiviteInteractionRecherche;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.referentiel.ZoneGeographique;
import com.ird.faa.dao.formulaire.ZoneActiviteInteractionRechercheDao;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.ZoneActiviteInteractionRechercheAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.ZoneGeographiqueAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.ZoneActiviteInteractionRechercheVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class ZoneActiviteInteractionRechercheAdminServiceImpl extends
        AbstractServiceImpl<ZoneActiviteInteractionRecherche> implements ZoneActiviteInteractionRechercheAdminService {

    @Autowired
    private ZoneActiviteInteractionRechercheDao zoneActiviteInteractionRechercheDao;

    @Autowired
    private ZoneGeographiqueAdminService zoneGeographiqueService;
    @Autowired
    private PaysAdminService paysService;
    @Autowired
    private ChercheurAdminService chercheurService;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<ZoneActiviteInteractionRecherche> findAll() {
        return zoneActiviteInteractionRechercheDao.findAll();
    }

    @Override
    public List<ZoneActiviteInteractionRecherche> findByPaysCode(String code) {
        return zoneActiviteInteractionRechercheDao.findByPaysCode(code);
    }

    @Override
    @Transactional
    public int deleteByPaysCode(String code) {
        return zoneActiviteInteractionRechercheDao.deleteByPaysCode(code);
    }

    @Override
    public List<ZoneActiviteInteractionRecherche> findByPaysId(Long id) {
        return zoneActiviteInteractionRechercheDao.findByPaysId(id);
    }

    @Override
    @Transactional
    public int deleteByPaysId(Long id) {
        return zoneActiviteInteractionRechercheDao.deleteByPaysId(id);
    }

    @Override
    public List<ZoneActiviteInteractionRecherche> findByZoneGeographiqueCode(String code) {
        return zoneActiviteInteractionRechercheDao.findByZoneGeographiqueCode(code);
    }

    @Override
    @Transactional
    public int deleteByZoneGeographiqueCode(String code) {
        return zoneActiviteInteractionRechercheDao.deleteByZoneGeographiqueCode(code);
    }

    @Override
    public List<ZoneActiviteInteractionRecherche> findByZoneGeographiqueId(Long id) {
        return zoneActiviteInteractionRechercheDao.findByZoneGeographiqueId(id);
    }

    @Override
    @Transactional
    public int deleteByZoneGeographiqueId(Long id) {
        return zoneActiviteInteractionRechercheDao.deleteByZoneGeographiqueId(id);
    }

    @Override
    public List<ZoneActiviteInteractionRecherche> findByChercheurNumeroMatricule(String numeroMatricule) {
        return zoneActiviteInteractionRechercheDao.findByChercheurNumeroMatricule(numeroMatricule);
    }

    @Override
    @Transactional
    public int deleteByChercheurNumeroMatricule(String numeroMatricule) {
        return zoneActiviteInteractionRechercheDao.deleteByChercheurNumeroMatricule(numeroMatricule);
    }

    @Override
    public List<ZoneActiviteInteractionRecherche> findByChercheurId(Long id) {
        return zoneActiviteInteractionRechercheDao.findByChercheurId(id);
    }

    @Override
    @Transactional
    public int deleteByChercheurId(Long id) {
        return zoneActiviteInteractionRechercheDao.deleteByChercheurId(id);
    }

    @Override
    public ZoneActiviteInteractionRecherche findById(Long id) {
        if (id == null)
            return null;
        return zoneActiviteInteractionRechercheDao.getOne(id);
    }

    @Override
    public ZoneActiviteInteractionRecherche findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (zoneActiviteInteractionRechercheDao.findById(id).isPresent()) {
            zoneActiviteInteractionRechercheDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public ZoneActiviteInteractionRecherche update(ZoneActiviteInteractionRecherche zoneActiviteInteractionRecherche) {
        ZoneActiviteInteractionRecherche foundedZoneActiviteInteractionRecherche = findById(
                zoneActiviteInteractionRecherche.getId());
        if (foundedZoneActiviteInteractionRecherche == null)
            return null;
        else {
            return zoneActiviteInteractionRechercheDao.save(zoneActiviteInteractionRecherche);
        }
    }

    @Override
    public ZoneActiviteInteractionRecherche save(ZoneActiviteInteractionRecherche zoneActiviteInteractionRecherche) {

        findPays(zoneActiviteInteractionRecherche);
        findZoneGeographique(zoneActiviteInteractionRecherche);
        findChercheur(zoneActiviteInteractionRecherche);

        return zoneActiviteInteractionRechercheDao.save(zoneActiviteInteractionRecherche);

    }

    @Override
    public List<ZoneActiviteInteractionRecherche> save(
            List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherches) {
        List<ZoneActiviteInteractionRecherche> list = new ArrayList<>();
        for (ZoneActiviteInteractionRecherche zoneActiviteInteractionRecherche : zoneActiviteInteractionRecherches) {
            list.add(save(zoneActiviteInteractionRecherche));
        }
        return list;
    }

    @Override
    @Transactional
    public int delete(ZoneActiviteInteractionRecherche zoneActiviteInteractionRecherche) {
        if (zoneActiviteInteractionRecherche.getId() == null)
            return -1;
        ZoneActiviteInteractionRecherche foundedZoneActiviteInteractionRecherche = findById(
                zoneActiviteInteractionRecherche.getId());
        if (foundedZoneActiviteInteractionRecherche == null)
            return -1;
        zoneActiviteInteractionRechercheDao.delete(foundedZoneActiviteInteractionRecherche);
        return 1;
    }

    public List<ZoneActiviteInteractionRecherche> findByCriteria(
            ZoneActiviteInteractionRechercheVo zoneActiviteInteractionRechercheVo) {

        String query = "SELECT o FROM ZoneActiviteInteractionRecherche o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", zoneActiviteInteractionRechercheVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", zoneActiviteInteractionRechercheVo.getLibelle());
        if (zoneActiviteInteractionRechercheVo.getPaysVo() != null) {
            query += SearchUtil.addConstraint("o", "pays.id", "=",
                    zoneActiviteInteractionRechercheVo.getPaysVo().getId());
            query += SearchUtil.addConstraint("o", "pays.code", "LIKE",
                    zoneActiviteInteractionRechercheVo.getPaysVo().getCode());
        }

        if (zoneActiviteInteractionRechercheVo.getZoneGeographiqueVo() != null) {
            query += SearchUtil.addConstraint("o", "zoneGeographique.id", "=",
                    zoneActiviteInteractionRechercheVo.getZoneGeographiqueVo().getId());
            query += SearchUtil.addConstraint("o", "zoneGeographique.code", "LIKE",
                    zoneActiviteInteractionRechercheVo.getZoneGeographiqueVo().getCode());
        }

        if (zoneActiviteInteractionRechercheVo.getChercheurVo() != null) {
            query += SearchUtil.addConstraint("o", "chercheur.id", "=",
                    zoneActiviteInteractionRechercheVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint("o", "chercheur.numeroMatricule", "LIKE",
                    zoneActiviteInteractionRechercheVo.getChercheurVo().getNumeroMatricule());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findPays(ZoneActiviteInteractionRecherche zoneActiviteInteractionRecherche) {
        Pays loadedPays = paysService.findByIdOrCode(zoneActiviteInteractionRecherche.getPays());

        if (loadedPays == null) {
            return;
        }
        zoneActiviteInteractionRecherche.setPays(loadedPays);
    }

    private void findZoneGeographique(ZoneActiviteInteractionRecherche zoneActiviteInteractionRecherche) {
        ZoneGeographique loadedZoneGeographique = zoneGeographiqueService
                .findByIdOrCode(zoneActiviteInteractionRecherche.getZoneGeographique());

        if (loadedZoneGeographique == null) {
            return;
        }
        zoneActiviteInteractionRecherche.setZoneGeographique(loadedZoneGeographique);
    }

    private void findChercheur(ZoneActiviteInteractionRecherche zoneActiviteInteractionRecherche) {
        Chercheur loadedChercheur = chercheurService
                .findByIdOrNumeroMatricule(zoneActiviteInteractionRecherche.getChercheur());

        if (loadedChercheur == null) {
            return;
        }
        zoneActiviteInteractionRecherche.setChercheur(loadedChercheur);
    }

    @Override
    @Transactional
    public void delete(List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherches) {
        if (ListUtil.isNotEmpty(zoneActiviteInteractionRecherches)) {
            zoneActiviteInteractionRecherches.forEach(e -> zoneActiviteInteractionRechercheDao.delete(e));
        }
    }

    @Override
    public void update(List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherches) {
        if (ListUtil.isNotEmpty(zoneActiviteInteractionRecherches)) {
            zoneActiviteInteractionRecherches.forEach(e -> zoneActiviteInteractionRechercheDao.save(e));
        }
    }

}
