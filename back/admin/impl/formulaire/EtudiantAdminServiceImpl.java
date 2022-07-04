package com.ird.faa.service.admin.impl.formulaire;

import com.ird.faa.bean.formulaire.Etudiant;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.referentiel.Sexe;
import com.ird.faa.dao.formulaire.EtudiantDao;
import com.ird.faa.service.admin.facade.formulaire.EtudiantAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.SexeAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.EtudiantVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class EtudiantAdminServiceImpl extends AbstractServiceImpl<Etudiant> implements EtudiantAdminService {

    @Autowired
    private EtudiantDao etudiantDao;

    @Autowired
    private ArchivableService<Etudiant> archivableService;
    @Autowired
    private SexeAdminService sexeService;
    @Autowired
    private PaysAdminService paysService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Etudiant> findAll() {
        String query = "SELECT o FROM Etudiant o where 1=1 ";
        query += " AND o.archive != true";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<Etudiant> findBySexeCode(String code) {
        return etudiantDao.findBySexeCode(code);
    }

    @Override
    @Transactional
    public int deleteBySexeCode(String code) {
        return etudiantDao.deleteBySexeCode(code);
    }

    @Override
    public List<Etudiant> findBySexeId(Long id) {
        return etudiantDao.findBySexeId(id);
    }

    @Override
    @Transactional
    public int deleteBySexeId(Long id) {
        return etudiantDao.deleteBySexeId(id);
    }


    @Override
    public List<Etudiant> findByPaysCode(String code) {
        return etudiantDao.findByPaysCode(code);
    }

    @Override
    @Transactional
    public int deleteByPaysCode(String code) {
        return etudiantDao.deleteByPaysCode(code);
    }

    @Override
    public List<Etudiant> findByPaysId(Long id) {
        return etudiantDao.findByPaysId(id);
    }

    @Override
    @Transactional
    public int deleteByPaysId(Long id) {
        return etudiantDao.deleteByPaysId(id);
    }


    @Override
    public Etudiant findById(Long id) {
        if (id == null) return null;
        return etudiantDao.getOne(id);
    }

    @Override
    public Etudiant findByIdWithAssociatedList(Long id) {
        Etudiant etudiant = findById(id);
        return etudiant;
    }

    @Override
    public Etudiant archiver(Etudiant etudiant) {
        if (etudiant.getArchive() == null) {
            etudiant.setArchive(false);
        }
        etudiant.setArchive(true);
        etudiant.setDateArchivage(new Date());
        etudiantDao.save(etudiant);
        return etudiant;

    }

    @Override
    public Etudiant desarchiver(Etudiant etudiant) {
        if (etudiant.getArchive() == null) {
            etudiant.setArchive(false);
        }
        etudiant.setArchive(false);
        etudiant.setDateArchivage(null);
        etudiantDao.save(etudiant);
        return etudiant;
    }


    @Transactional
    public int deleteById(Long id) {
        if (etudiantDao.findById(id) == null) return 0;
        else {
            etudiantDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Etudiant update(Etudiant etudiant) {
        Etudiant foundedEtudiant = findById(etudiant.getId());
        if (foundedEtudiant == null) return null;
        else {
            archivableService.prepare(etudiant);
            return etudiantDao.save(etudiant);
        }
    }

    @Override
    public Etudiant save(Etudiant etudiant) {


        findSexe(etudiant);
        findPays(etudiant);

        Etudiant savedEtudiant = etudiantDao.save(etudiant);
        return savedEtudiant;
    }

    @Override
    public List<Etudiant> save(List<Etudiant> etudiants) {
        List<Etudiant> list = new ArrayList<Etudiant>();
        for (Etudiant etudiant : etudiants) {
            list.add(save(etudiant));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Etudiant etudiant) {
        if (etudiant.getId() == null) return -1;
        Etudiant foundedEtudiant = findById(etudiant.getId());
        if (foundedEtudiant == null) return -1;
        etudiantDao.delete(foundedEtudiant);
        return 1;
    }


    public List<Etudiant> findByCriteria(EtudiantVo etudiantVo) {

        String query = "SELECT o FROM Etudiant o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", etudiantVo.getId());
        query += SearchUtil.addConstraint("o", "nom", "LIKE", etudiantVo.getNom());
        query += SearchUtil.addConstraint("o", "prenom", "LIKE", etudiantVo.getPrenom());
        query += SearchUtil.addConstraint("o", "archive", "=", etudiantVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", etudiantVo.getDateArchivage());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", etudiantVo.getDateArchivageMin(),
                etudiantVo.getDateArchivageMax());
        if (etudiantVo.getSexeVo() != null) {
            query += SearchUtil.addConstraint("o", "sexe.id", "=", etudiantVo.getSexeVo().getId());
            query += SearchUtil.addConstraint("o", "sexe.code", "LIKE", etudiantVo.getSexeVo().getCode());
        }

        if (etudiantVo.getPaysVo() != null) {
            query += SearchUtil.addConstraint("o", "pays.id", "=", etudiantVo.getPaysVo().getId());
            query += SearchUtil.addConstraint("o", "pays.code", "LIKE", etudiantVo.getPaysVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findSexe(Etudiant etudiant) {
        Sexe loadedSexe = sexeService.findByIdOrCode(etudiant.getSexe());

        if (loadedSexe == null) {
            return;
        }
        etudiant.setSexe(loadedSexe);
    }

    private void findPays(Etudiant etudiant) {
        Pays loadedPays = paysService.findByIdOrCode(etudiant.getPays());

        if (loadedPays == null) {
            return;
        }
        etudiant.setPays(loadedPays);
    }

    @Override
    @Transactional
    public void delete(List<Etudiant> etudiants) {
        if (ListUtil.isNotEmpty(etudiants)) {
            etudiants.forEach(e -> etudiantDao.delete(e));
        }
    }

    @Override
    public void update(List<Etudiant> etudiants) {
        if (ListUtil.isNotEmpty(etudiants)) {
            etudiants.forEach(e -> etudiantDao.save(e));
        }
    }


    @Override
    public List<List<Etudiant>> getToBeSavedAndToBeDeleted(List<Etudiant> oldList, List<Etudiant> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
