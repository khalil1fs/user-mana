package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Partenaire;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.referentiel.PartenaireDao;
import com.ird.faa.service.admin.facade.referentiel.PartenaireAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.PartenaireVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class PartenaireAdminServiceImpl extends AbstractServiceImpl<Partenaire> implements PartenaireAdminService {

    @Autowired
    private PartenaireDao partenaireDao;

    @Autowired
    private ArchivableService<Partenaire> archivableService;
    @Autowired
    private PaysAdminService paysService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Partenaire> findAll() {
        return partenaireDao.findAll();
    }

    @Override
    public List<Partenaire> findByPaysPartenaireCode(String code) {
        return partenaireDao.findByPaysPartenaireCode(code);
    }

    @Override
    @Transactional
    public int deleteByPaysPartenaireCode(String code) {
        return partenaireDao.deleteByPaysPartenaireCode(code);
    }

    @Override
    public List<Partenaire> findByPaysPartenaireId(Long id) {
        return partenaireDao.findByPaysPartenaireId(id);
    }

    @Override
    @Transactional
    public int deleteByPaysPartenaireId(Long id) {
        return partenaireDao.deleteByPaysPartenaireId(id);
    }

    @Override
    public Partenaire findBySigleOfficel(String sigleOfficel) {
        if (sigleOfficel == null) return null;
        return partenaireDao.findBySigleOfficel(sigleOfficel);
    }

    @Override
    @Transactional
    public int deleteBySigleOfficel(String sigleOfficel) {
        return partenaireDao.deleteBySigleOfficel(sigleOfficel);
    }

    @Override
    public Partenaire findByIdOrSigleOfficel(Partenaire partenaire) {
        Partenaire resultat = null;
        if (partenaire != null) {
            if (StringUtil.isNotEmpty(partenaire.getId())) {
                resultat = partenaireDao.getOne(partenaire.getId());
            } else if (StringUtil.isNotEmpty(partenaire.getSigleOfficel())) {
                resultat = partenaireDao.findBySigleOfficel(partenaire.getSigleOfficel());
            }
        }
        return resultat;
    }

    @Override
    public Partenaire findById(Long id) {
        if (id == null) return null;
        return partenaireDao.getOne(id);
    }

    @Override
    public Partenaire findByIdWithAssociatedList(Long id) {
        return findById(id);
    }


    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (partenaireDao.findById(id).isPresent()) {
            partenaireDao.deleteById(id);
            res = 1;
        }
        return res;
    }


    @Override
    public Partenaire update(Partenaire partenaire) {
        Partenaire foundedPartenaire = findById(partenaire.getId());
        if (foundedPartenaire == null) return null;
        else {
            archivableService.prepare(partenaire);
            return partenaireDao.save(partenaire);
        }
    }

    @Override
    public Partenaire save(Partenaire partenaire) {
        prepare(partenaire);

        Partenaire result = null;
        Partenaire foundedPartenaire = findBySigleOfficel(partenaire.getSigleOfficel());
        if (foundedPartenaire == null) {


            findPays(partenaire);

            Partenaire savedPartenaire = partenaireDao.save(partenaire);

            result = savedPartenaire;
        }

        return result;
    }

    @Override
    public List<Partenaire> save(List<Partenaire> partenaires) {
        List<Partenaire> list = new ArrayList<>();
        for (Partenaire partenaire : partenaires) {
            list.add(save(partenaire));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Partenaire partenaire) {
        if (partenaire.getSigleOfficel() == null) return -1;

        Partenaire foundedPartenaire = findBySigleOfficel(partenaire.getSigleOfficel());
        if (foundedPartenaire == null) return -1;
        partenaireDao.delete(foundedPartenaire);
        return 1;
    }


    public List<Partenaire> findByCriteria(PartenaireVo partenaireVo) {

        String query = "SELECT o FROM Partenaire o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", partenaireVo.getId());
        query += SearchUtil.addConstraint("o", "sigleOfficel", "LIKE", partenaireVo.getSigleOfficel());
        query += SearchUtil.addConstraint("o", "nomOfficel", "LIKE", partenaireVo.getNomOfficel());
        query += SearchUtil.addConstraint("o", "adresse", "LIKE", partenaireVo.getAdresse());
        query += SearchUtil.addConstraint("o", "typePartenaire", "LIKE", partenaireVo.getTypePartenaire());
        query += SearchUtil.addConstraint("o", "idGraphQl", "LIKE", partenaireVo.getIdGraphQl());
        query += SearchUtil.addConstraint("o", "archive", "=", partenaireVo.getArchive());
        query += SearchUtil.addConstraintDate("o", "dateArchivage", "=", partenaireVo.getDateArchivage());
        query += SearchUtil.addConstraintDate("o", "dateCreation", "=", partenaireVo.getDateCreation());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", partenaireVo.getDateArchivageMin(), partenaireVo.getDateArchivageMax());
        query += SearchUtil.addConstraintMinMaxDate("o", "dateCreation", partenaireVo.getDateCreationMin(), partenaireVo.getDateCreationMax());
        if (partenaireVo.getPays() != null) {
            query += SearchUtil.addConstraint("o", "paysPartenaire.id", "=", partenaireVo.getPays().getId());
            query += SearchUtil.addConstraint("o", "paysPartenaire.code", "LIKE", partenaireVo.getPays().getCode());
        }

        query += " ORDER BY o.sigleOfficel";
        return entityManager.createQuery(query).getResultList();
    }

    private void findPays(Partenaire partenaire) {
        Pays loadedPays = paysService.findByIdOrCode(partenaire.getPaysPartenaire());

        if (loadedPays == null) {
            return;
        }
        partenaire.setPaysPartenaire(loadedPays);
    }

    @Override
    @Transactional
    public void delete(List<Partenaire> partenaires) {
        if (ListUtil.isNotEmpty(partenaires)) {
            partenaires.forEach(e -> partenaireDao.delete(e));
        }
    }

    @Override
    public void update(List<Partenaire> partenaires) {
        if (ListUtil.isNotEmpty(partenaires)) {
            partenaires.forEach(e -> partenaireDao.save(e));
        }
    }


}
