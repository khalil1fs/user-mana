package com.ird.faa.service.admin.impl.referentiel;

import com.ird.faa.bean.referentiel.Grade;
import com.ird.faa.dao.referentiel.GradeDao;
import com.ird.faa.service.admin.facade.referentiel.GradeAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import com.ird.faa.ws.rest.provided.vo.referentiel.GradeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class GradeAdminServiceImpl extends AbstractServiceImpl<Grade> implements GradeAdminService {

    @Autowired
    private GradeDao gradeDao;


    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Grade> findAll() {
        return gradeDao.findAll();
    }

    @Override
    public Grade findByCode(String code) {
        if (code == null) return null;
        return gradeDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String code) {
        return gradeDao.deleteByCode(code);
    }

    @Override
    public Grade findByIdOrCode(Grade grade) {
        Grade resultat = null;
        if (grade == null || (grade.getCode() == null && grade.getId() == null))
            return resultat;
        else {
            if (grade.getId() != null) {
                resultat = gradeDao.findById(grade.getId()).get();
            } else if (StringUtil.isNotEmpty(grade.getCode())) {
                resultat = gradeDao.findByCode(grade.getCode());
            }
            return resultat;
        }
    }

    @Override
    public Grade findById(Long id) {
        if (id == null) return null;
        return gradeDao.getOne(id);
    }

    @Override
    public Grade findByIdWithAssociatedList(Long id) {
        Grade grade = findById(id);
        return grade;
    }


    @Transactional
    public int deleteById(Long id) {
        if (gradeDao.findById(id) == null) return 0;
        else {
            gradeDao.deleteById(id);
            return 1;
        }
    }


    @Override
    public Grade update(Grade grade) {
        Grade foundedGrade = findById(grade.getId());
        if (foundedGrade == null) return null;
        else {
            prepare(grade);
            return gradeDao.save(grade);
        }
    }

    @Override
    public Grade save(Grade grade) {
        Grade foundedGrade = findByCode(grade.getCode());
        if (foundedGrade != null) return null;

        prepare(grade);

        Grade savedGrade = gradeDao.save(grade);
        return savedGrade;
    }

    @Override
    public List<Grade> save(List<Grade> grades) {
        List<Grade> list = new ArrayList<Grade>();
        for (Grade grade : grades) {
            list.add(save(grade));
        }
        return list;
    }


    @Override
    @Transactional
    public int delete(Grade grade) {
        if (grade.getCode() == null) return -1;

        Grade foundedGrade = findByCode(grade.getCode());
        if (foundedGrade == null) return -1;
        gradeDao.delete(foundedGrade);
        return 1;
    }


    public List<Grade> findByCriteria(GradeVo gradeVo) {

        String query = "SELECT o FROM Grade o where 1=1 ";

        query += SearchUtil.addConstraint("o", "id", "=", gradeVo.getId());
        query += SearchUtil.addConstraint("o", "libelle", "LIKE", gradeVo.getLibelle());
        query += SearchUtil.addConstraint("o", "code", "LIKE", gradeVo.getCode());
        query += SearchUtil.addConstraint("o", "description", "LIKE", gradeVo.getDescription());
        return entityManager.createQuery(query).getResultList();
    }


    @Override
    @Transactional
    public void delete(List<Grade> grades) {
        if (ListUtil.isNotEmpty(grades)) {
            grades.forEach(e -> gradeDao.delete(e));
        }
    }

    @Override
    public void update(List<Grade> grades) {
        if (ListUtil.isNotEmpty(grades)) {
            grades.forEach(e -> gradeDao.save(e));
        }
    }


    @Override
    public List<List<Grade>> getToBeSavedAndToBeDeleted(List<Grade> oldList, List<Grade> newList) {
        return super.getToBeSavedAndToBeDeleted(oldList, newList);
    }

}
