package com.ird.faa.service.admin.impl.formulaire;

import com.ird.faa.bean.formulaire.RencontreGrandPubliqueJeunePublique;
import com.ird.faa.bean.formulaire.StructureOganisatrice;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.dao.formulaire.StructureOganisatriceDao;
import com.ird.faa.service.admin.facade.formulaire.StructureOganisatriceAdminService;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
import com.ird.faa.service.chercheur.facade.formulaire.RencontreGrandPubliqueJeunePubliqueChercheurService;
import com.ird.faa.service.chercheur.facade.referentiel.EtablissementChercheurService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.StructureOganisatriceVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class StructureOganisatriceAdminServiceImpl extends AbstractServiceImpl<StructureOganisatrice>
        implements StructureOganisatriceAdminService {

    @Autowired
    private StructureOganisatriceDao structureOganisatriceDao;

    @Autowired
    private RencontreGrandPubliqueJeunePubliqueChercheurService rencontreGrandPubliqueJeunePubliqueService;
    @Autowired
    private EtablissementAdminService etablissementService;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<StructureOganisatrice> findAll() {
        return structureOganisatriceDao.findAll();
    }

    @Override
    public List<StructureOganisatrice> findByRencontreGrandPubliqueJeunePubliqueId(Long id) {
        return structureOganisatriceDao.findByRencontreGrandPubliqueJeunePubliqueId(id);
    }

    @Override
    @Transactional
    public int deleteByRencontreGrandPubliqueJeunePubliqueId(Long id) {
        return structureOganisatriceDao.deleteByRencontreGrandPubliqueJeunePubliqueId(id);
    }

    @Override
    public List<StructureOganisatrice> findByEtablissementCode(String code) {
        return structureOganisatriceDao.findByEtablissementCode(code);
    }

    @Override
    @Transactional
    public int deleteByEtablissementCode(String code) {
        return structureOganisatriceDao.deleteByEtablissementCode(code);
    }

    @Override
    public List<StructureOganisatrice> findByEtablissementId(Long id) {
        return structureOganisatriceDao.findByEtablissementId(id);
    }

    @Override
    @Transactional
    public int deleteByEtablissementId(Long id) {
        return structureOganisatriceDao.deleteByEtablissementId(id);
    }

    @Override
    public StructureOganisatrice findById(Long id) {
        if (id == null)
            return null;
        return structureOganisatriceDao.getOne(id);
    }

    @Override
    public StructureOganisatrice findByIdWithAssociatedList(Long id) {
        StructureOganisatrice structureOganisatrice = findById(id);
        return structureOganisatrice;
    }

    @Transactional
    public int deleteById(Long id) {
        if (structureOganisatriceDao.findById(id) == null)
            return 0;
        else {
            structureOganisatriceDao.deleteById(id);
            return 1;
        }
    }

    @Override
    public StructureOganisatrice update(StructureOganisatrice structureOganisatrice) {
        StructureOganisatrice foundedStructureOganisatrice = findById(structureOganisatrice.getId());
        if (foundedStructureOganisatrice == null)
            return null;
        else {
            return structureOganisatriceDao.save(structureOganisatrice);
        }
    }

    @Override
    public StructureOganisatrice save(StructureOganisatrice structureOganisatrice) {

        findRencontreGrandPubliqueJeunePublique(structureOganisatrice);
        findEtablissement(structureOganisatrice);

        StructureOganisatrice savedStructureOganisatrice = structureOganisatriceDao.save(structureOganisatrice);
        return savedStructureOganisatrice;
    }

    @Override
    public List<StructureOganisatrice> save(List<StructureOganisatrice> structureOganisatrices) {
        List<StructureOganisatrice> list = new ArrayList<StructureOganisatrice>();
        for (StructureOganisatrice structureOganisatrice : structureOganisatrices) {
            list.add(save(structureOganisatrice));
        }
        return list;
    }

    @Override
    @Transactional
    public int delete(StructureOganisatrice structureOganisatrice) {
        if (structureOganisatrice.getId() == null)
            return -1;
        StructureOganisatrice foundedStructureOganisatrice = findById(structureOganisatrice.getId());
        if (foundedStructureOganisatrice == null)
            return -1;
        structureOganisatriceDao.delete(foundedStructureOganisatrice);
        return 1;
    }

    public List<StructureOganisatrice> findByCriteria(StructureOganisatriceVo structureOganisatriceVo) {

        String query = "SELECT o FROM StructureOganisatrice o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", structureOganisatriceVo.getId());
        if (structureOganisatriceVo.getRencontreGrandPubliqueJeunePubliqueVo() != null) {
            query += SearchUtil.addConstraint("o", "rencontreGrandPubliqueJeunePublique.id", "=",
                    structureOganisatriceVo.getRencontreGrandPubliqueJeunePubliqueVo().getId());
        }

        if (structureOganisatriceVo.getEtablissementVo() != null) {
            query += SearchUtil.addConstraint("o", "etablissement.id", "=",
                    structureOganisatriceVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint("o", "etablissement.code", "LIKE",
                    structureOganisatriceVo.getEtablissementVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findRencontreGrandPubliqueJeunePublique(StructureOganisatrice structureOganisatrice) {
        RencontreGrandPubliqueJeunePublique loadedRencontreGrandPubliqueJeunePublique = null;
        if (structureOganisatrice.getRencontreGrandPubliqueJeunePublique() != null
                && structureOganisatrice.getRencontreGrandPubliqueJeunePublique().getId() != null)
            loadedRencontreGrandPubliqueJeunePublique = rencontreGrandPubliqueJeunePubliqueService
                    .findById(structureOganisatrice.getRencontreGrandPubliqueJeunePublique().getId());

        if (loadedRencontreGrandPubliqueJeunePublique == null) {
            return;
        }
        structureOganisatrice.setRencontreGrandPubliqueJeunePublique(loadedRencontreGrandPubliqueJeunePublique);
    }

    private void findEtablissement(StructureOganisatrice structureOganisatrice) {
        Etablissement loadedEtablissement = etablissementService
                .findByIdOrCode(structureOganisatrice.getEtablissement());

        if (loadedEtablissement == null) {
            return;
        }
        structureOganisatrice.setEtablissement(loadedEtablissement);
    }

    @Override
    @Transactional
    public void delete(List<StructureOganisatrice> structureOganisatrices) {
        if (ListUtil.isNotEmpty(structureOganisatrices)) {
            structureOganisatrices.forEach(e -> structureOganisatriceDao.delete(e));
        }
    }

    @Override
    public void update(List<StructureOganisatrice> structureOganisatrices) {
        if (ListUtil.isNotEmpty(structureOganisatrices)) {
            structureOganisatrices.forEach(e -> {
                if (e.getId() != null) {
                    update(e);
                } else {
                    save(e);
                }
            });
        }
    }

    @Override
    public List<List<StructureOganisatrice>> getToBeSavedAndToBeDeleted(List<StructureOganisatrice> oldList,
                                                                        List<StructureOganisatrice> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
