package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEncadrementEtudiant;
import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.bean.formulaire.EncadrementEtudiant;
import com.ird.faa.dao.formulaire.DisciplineScientifiqueEncadrementEtudiantDao;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueEncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueEncadrementEtudiantVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DisciplineScientifiqueEncadrementEtudiantAdminServiceImpl extends AbstractServiceImpl<DisciplineScientifiqueEncadrementEtudiant> implements DisciplineScientifiqueEncadrementEtudiantAdminService {

@Autowired
private DisciplineScientifiqueEncadrementEtudiantDao disciplineScientifiqueEncadrementEtudiantDao;

        @Autowired
        private EncadrementEtudiantAdminService encadrementEtudiantService ;
        @Autowired
        private DisciplineScientifiqueAdminService disciplineScientifiqueService ;


@Autowired
private EntityManager entityManager;


@Override
public List<DisciplineScientifiqueEncadrementEtudiant> findAll(){
return disciplineScientifiqueEncadrementEtudiantDao.findAll();
}

        @Override
        public List<DisciplineScientifiqueEncadrementEtudiant> findByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueEncadrementEtudiantDao.findByDisciplineScientifiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueEncadrementEtudiantDao.deleteByDisciplineScientifiqueCode(code);
        }

        @Override
        public List<DisciplineScientifiqueEncadrementEtudiant> findByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueEncadrementEtudiantDao.findByDisciplineScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueEncadrementEtudiantDao.deleteByDisciplineScientifiqueId(id);
        }

        @Override
        public List<DisciplineScientifiqueEncadrementEtudiant> findByEncadrementEtudiantId(Long id){
        return disciplineScientifiqueEncadrementEtudiantDao.findByEncadrementEtudiantId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementEtudiantId(Long id){
        return disciplineScientifiqueEncadrementEtudiantDao.deleteByEncadrementEtudiantId(id);
        }


@Override
public DisciplineScientifiqueEncadrementEtudiant findById(Long id){
if(id==null) return null;
return disciplineScientifiqueEncadrementEtudiantDao.getOne(id);
}

@Override
public DisciplineScientifiqueEncadrementEtudiant findByIdWithAssociatedList(Long id){
DisciplineScientifiqueEncadrementEtudiant disciplineScientifiqueEncadrementEtudiant  = findById(id);
return disciplineScientifiqueEncadrementEtudiant;
}


@Transactional
public int deleteById(Long id){
if(disciplineScientifiqueEncadrementEtudiantDao.findById(id) == null) return 0;
else{
disciplineScientifiqueEncadrementEtudiantDao.deleteById(id);
return 1;
}
}


@Override
public DisciplineScientifiqueEncadrementEtudiant update(DisciplineScientifiqueEncadrementEtudiant disciplineScientifiqueEncadrementEtudiant){
DisciplineScientifiqueEncadrementEtudiant foundedDisciplineScientifiqueEncadrementEtudiant = findById(disciplineScientifiqueEncadrementEtudiant.getId());
if(foundedDisciplineScientifiqueEncadrementEtudiant==null) return null;
else{
return  disciplineScientifiqueEncadrementEtudiantDao.save(disciplineScientifiqueEncadrementEtudiant);
}
}

@Override
public DisciplineScientifiqueEncadrementEtudiant save (DisciplineScientifiqueEncadrementEtudiant disciplineScientifiqueEncadrementEtudiant){


    findDisciplineScientifique(disciplineScientifiqueEncadrementEtudiant);
    findEncadrementEtudiant(disciplineScientifiqueEncadrementEtudiant);

DisciplineScientifiqueEncadrementEtudiant savedDisciplineScientifiqueEncadrementEtudiant = disciplineScientifiqueEncadrementEtudiantDao.save(disciplineScientifiqueEncadrementEtudiant);
return savedDisciplineScientifiqueEncadrementEtudiant;
}

@Override
public List<DisciplineScientifiqueEncadrementEtudiant> save(List<DisciplineScientifiqueEncadrementEtudiant> disciplineScientifiqueEncadrementEtudiants){
List<DisciplineScientifiqueEncadrementEtudiant> list = new ArrayList<DisciplineScientifiqueEncadrementEtudiant>();
for(DisciplineScientifiqueEncadrementEtudiant disciplineScientifiqueEncadrementEtudiant: disciplineScientifiqueEncadrementEtudiants){
list.add(save(disciplineScientifiqueEncadrementEtudiant));
}
return list;
}



@Override
@Transactional
public int delete(DisciplineScientifiqueEncadrementEtudiant disciplineScientifiqueEncadrementEtudiant){
    if(disciplineScientifiqueEncadrementEtudiant.getId()==null) return -1;
    DisciplineScientifiqueEncadrementEtudiant foundedDisciplineScientifiqueEncadrementEtudiant = findById(disciplineScientifiqueEncadrementEtudiant.getId());
    if(foundedDisciplineScientifiqueEncadrementEtudiant==null) return -1;
disciplineScientifiqueEncadrementEtudiantDao.delete(foundedDisciplineScientifiqueEncadrementEtudiant);
return 1;
}


public List<DisciplineScientifiqueEncadrementEtudiant> findByCriteria(DisciplineScientifiqueEncadrementEtudiantVo disciplineScientifiqueEncadrementEtudiantVo){

String query = "SELECT o FROM DisciplineScientifiqueEncadrementEtudiant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",disciplineScientifiqueEncadrementEtudiantVo.getId());
    if(disciplineScientifiqueEncadrementEtudiantVo.getDisciplineScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifique.id","=",disciplineScientifiqueEncadrementEtudiantVo.getDisciplineScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifique.code","LIKE",disciplineScientifiqueEncadrementEtudiantVo.getDisciplineScientifiqueVo().getCode());
    }

    if(disciplineScientifiqueEncadrementEtudiantVo.getEncadrementEtudiantVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrementEtudiant.id","=",disciplineScientifiqueEncadrementEtudiantVo.getEncadrementEtudiantVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findDisciplineScientifique(DisciplineScientifiqueEncadrementEtudiant disciplineScientifiqueEncadrementEtudiant){
        DisciplineScientifique loadedDisciplineScientifique =disciplineScientifiqueService.findByIdOrCode(disciplineScientifiqueEncadrementEtudiant.getDisciplineScientifique());

    if(loadedDisciplineScientifique==null ) {
        return;
    }
    disciplineScientifiqueEncadrementEtudiant.setDisciplineScientifique(loadedDisciplineScientifique);
    }
    private void findEncadrementEtudiant(DisciplineScientifiqueEncadrementEtudiant disciplineScientifiqueEncadrementEtudiant){
        EncadrementEtudiant loadedEncadrementEtudiant = null;
        if(disciplineScientifiqueEncadrementEtudiant.getEncadrementEtudiant() != null && disciplineScientifiqueEncadrementEtudiant.getEncadrementEtudiant().getId() !=null)
        loadedEncadrementEtudiant =encadrementEtudiantService.findById(disciplineScientifiqueEncadrementEtudiant.getEncadrementEtudiant().getId());

    if(loadedEncadrementEtudiant==null ) {
        return;
    }
    disciplineScientifiqueEncadrementEtudiant.setEncadrementEtudiant(loadedEncadrementEtudiant);
    }

@Override
@Transactional
public void delete(List<DisciplineScientifiqueEncadrementEtudiant> disciplineScientifiqueEncadrementEtudiants){
        if(ListUtil.isNotEmpty(disciplineScientifiqueEncadrementEtudiants)){
        disciplineScientifiqueEncadrementEtudiants.forEach(e->disciplineScientifiqueEncadrementEtudiantDao.delete(e));
        }
}
@Override
public void update(List<DisciplineScientifiqueEncadrementEtudiant> disciplineScientifiqueEncadrementEtudiants){
if(ListUtil.isNotEmpty(disciplineScientifiqueEncadrementEtudiants)){
disciplineScientifiqueEncadrementEtudiants.forEach(e->disciplineScientifiqueEncadrementEtudiantDao.save(e));
}
}



@Override
public List<List<DisciplineScientifiqueEncadrementEtudiant>>  getToBeSavedAndToBeDeleted(List<DisciplineScientifiqueEncadrementEtudiant> oldList,List<DisciplineScientifiqueEncadrementEtudiant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
