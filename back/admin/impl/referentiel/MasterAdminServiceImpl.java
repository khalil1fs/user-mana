package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Master;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.dao.formulaire.MasterDao;
import com.ird.faa.service.admin.facade.referentiel.MasterAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.MasterVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class MasterAdminServiceImpl extends AbstractServiceImpl<Master> implements MasterAdminService {

    @Autowired
    private MasterDao masterDao;

    @Autowired
    private PaysAdminService paysService;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Master> findAll() {
        return masterDao.findAll();
    }

    @Override
    public List<Master> findByPaysCode(String code) {
        return masterDao.findByPaysCode(code);
    }

    @Override
    @Transactional
    public int deleteByPaysCode(String code) {
        return masterDao.deleteByPaysCode(code);
    }

    @Override
    public List<Master> findByPaysId(Long id) {
        return masterDao.findByPaysId(id);
    }

    @Override
    @Transactional
    public int deleteByPaysId(Long id) {
        return masterDao.deleteByPaysId(id);
    }

    @Override
    public Master findByCode(String code) {
        if (code == null) return null;
        return masterDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return masterDao.deleteByCode(code);
    }

    @Override
    public Master findByIdOrCode(Master master) {
        Master resultat = null;
        if (master == null || (master.getCode() == null && master.getId() == null))
            return resultat;
        else {
            if (master.getId() != null) {
                resultat = masterDao.findById(master.getId()).get();
            } else if (StringUtil.isNotEmpty(master.getCode())) {
                resultat = masterDao.findByCode(master.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Master findById(Long id) {
        if (id == null) return null;
        return masterDao.getOne(id);
    }

    @Override
    public Master findByIdWithAssociatedList(Long id) {
        Master master = findById(id);
        return master;
    }


    @Transactional
    public int deleteById(Long id) {
        if (masterDao.findById(id) == null) return 0;
        else {
            masterDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Master update(Master master) {
        Master foundedMaster = findById(master.getId());
        if (foundedMaster == null) return null;
        else {
            prepare(master);
            return masterDao.save(master);
        }
    }

    @Override
    public Master save(Master master) {
        Master foundedMaster = findByCode(master.getCode());
        if (foundedMaster != null) return null;


        findPays(master);
        prepare(master);
        Master savedMaster = masterDao.save(master);
        return savedMaster;
    }

    @Override
    public List<Master> save(List<Master> masters) {
        List<Master> list = new ArrayList<Master>();
        for (Master master : masters) {
            list.add(save(master));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Master master) {
        if (master.getCode() == null) return -1;

        Master foundedMaster = findByCode(master.getCode());
        if (foundedMaster == null) return -1;
        masterDao.delete(foundedMaster);
        return 1;
    }


    public List<Master> findByCriteria(MasterVo masterVo) {

        String query = "SELECT o FROM Master o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", masterVo.getId());
        query += SearchUtil.addConstraint("o", "intitule", "LIKE", masterVo.getIntitule());
        query += SearchUtil.addConstraint("o", "code", "LIKE", masterVo.getCode());
        query += SearchUtil.addConstraint("o", "international", "=", masterVo.getInternational());
        if (masterVo.getPaysVo() != null) {
            query += SearchUtil.addConstraint("o", "pays.id", "=", masterVo.getPaysVo().getId());
            query += SearchUtil.addConstraint("o", "pays.code", "LIKE", masterVo.getPaysVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();
    }

    private void findPays(Master master) {
        Pays loadedPays = paysService.findByIdOrCode(master.getPays());

        if (loadedPays == null) {
            return;
        }
        master.setPays(loadedPays);
    }

    @Override
    @Transactional
    public void delete(List<Master> masters) {
        if (ListUtil.isNotEmpty(masters)) {
            masters.forEach(e -> masterDao.delete(e));
        }
    }

    @Override
    public void update(List<Master> masters) {
        if (ListUtil.isNotEmpty(masters)) {
            masters.forEach(e -> masterDao.save(e));
        }
    }


    @Override
    public List<List<Master>> getToBeSavedAndToBeDeleted(List<Master> oldList, List<Master> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
