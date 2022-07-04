package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEncadrementDoctorant;
import com.ird.faa.bean.formulaire.EncadrementDoctorant;
import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.dao.formulaire.DisciplineScientifiqueEncadrementDoctorantDao;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueEncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementDoctorantAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueEncadrementDoctorantVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DisciplineScientifiqueEncadrementDoctorantAdminServiceImpl extends AbstractServiceImpl<DisciplineScientifiqueEncadrementDoctorant> implements DisciplineScientifiqueEncadrementDoctorantAdminService {

@Autowired
private DisciplineScientifiqueEncadrementDoctorantDao disciplineScientifiqueEncadrementDoctorantDao;

        @Autowired
        private DisciplineScientifiqueAdminService disciplineScientifiqueService ;
        @Autowired
        private EncadrementDoctorantAdminService encadrementDoctorantService ;


@Autowired
private EntityManager entityManager;


@Override
public List<DisciplineScientifiqueEncadrementDoctorant> findAll(){
return disciplineScientifiqueEncadrementDoctorantDao.findAll();
}
        @Override
        public List<DisciplineScientifiqueEncadrementDoctorant> findByEncadrementDoctorantId(Long id){
        return disciplineScientifiqueEncadrementDoctorantDao.findByEncadrementDoctorantId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementDoctorantId(Long id){
        return disciplineScientifiqueEncadrementDoctorantDao.deleteByEncadrementDoctorantId(id);
        }


        @Override
        public List<DisciplineScientifiqueEncadrementDoctorant> findByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueEncadrementDoctorantDao.findByDisciplineScientifiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueEncadrementDoctorantDao.deleteByDisciplineScientifiqueCode(code);
        }

        @Override
        public List<DisciplineScientifiqueEncadrementDoctorant> findByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueEncadrementDoctorantDao.findByDisciplineScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueEncadrementDoctorantDao.deleteByDisciplineScientifiqueId(id);
        }


@Override
public DisciplineScientifiqueEncadrementDoctorant findById(Long id){
if(id==null) return null;
return disciplineScientifiqueEncadrementDoctorantDao.getOne(id);
}

@Override
public DisciplineScientifiqueEncadrementDoctorant findByIdWithAssociatedList(Long id){
DisciplineScientifiqueEncadrementDoctorant disciplineScientifiqueEncadrementDoctorant  = findById(id);
return disciplineScientifiqueEncadrementDoctorant;
}


@Transactional
public int deleteById(Long id){
if(disciplineScientifiqueEncadrementDoctorantDao.findById(id) == null) return 0;
else{
disciplineScientifiqueEncadrementDoctorantDao.deleteById(id);
return 1;
}
}


@Override
public DisciplineScientifiqueEncadrementDoctorant update(DisciplineScientifiqueEncadrementDoctorant disciplineScientifiqueEncadrementDoctorant){
DisciplineScientifiqueEncadrementDoctorant foundedDisciplineScientifiqueEncadrementDoctorant = findById(disciplineScientifiqueEncadrementDoctorant.getId());
if(foundedDisciplineScientifiqueEncadrementDoctorant==null) return null;
else{
return  disciplineScientifiqueEncadrementDoctorantDao.save(disciplineScientifiqueEncadrementDoctorant);
}
}

@Override
public DisciplineScientifiqueEncadrementDoctorant save (DisciplineScientifiqueEncadrementDoctorant disciplineScientifiqueEncadrementDoctorant){


    findEncadrementDoctorant(disciplineScientifiqueEncadrementDoctorant);
    findDisciplineScientifique(disciplineScientifiqueEncadrementDoctorant);

DisciplineScientifiqueEncadrementDoctorant savedDisciplineScientifiqueEncadrementDoctorant = disciplineScientifiqueEncadrementDoctorantDao.save(disciplineScientifiqueEncadrementDoctorant);
return savedDisciplineScientifiqueEncadrementDoctorant;
}

@Override
public List<DisciplineScientifiqueEncadrementDoctorant> save(List<DisciplineScientifiqueEncadrementDoctorant> disciplineScientifiqueEncadrementDoctorants){
List<DisciplineScientifiqueEncadrementDoctorant> list = new ArrayList<DisciplineScientifiqueEncadrementDoctorant>();
for(DisciplineScientifiqueEncadrementDoctorant disciplineScientifiqueEncadrementDoctorant: disciplineScientifiqueEncadrementDoctorants){
list.add(save(disciplineScientifiqueEncadrementDoctorant));
}
return list;
}



@Override
@Transactional
public int delete(DisciplineScientifiqueEncadrementDoctorant disciplineScientifiqueEncadrementDoctorant){
    if(disciplineScientifiqueEncadrementDoctorant.getId()==null) return -1;
    DisciplineScientifiqueEncadrementDoctorant foundedDisciplineScientifiqueEncadrementDoctorant = findById(disciplineScientifiqueEncadrementDoctorant.getId());
    if(foundedDisciplineScientifiqueEncadrementDoctorant==null) return -1;
disciplineScientifiqueEncadrementDoctorantDao.delete(foundedDisciplineScientifiqueEncadrementDoctorant);
return 1;
}


public List<DisciplineScientifiqueEncadrementDoctorant> findByCriteria(DisciplineScientifiqueEncadrementDoctorantVo disciplineScientifiqueEncadrementDoctorantVo){

String query = "SELECT o FROM DisciplineScientifiqueEncadrementDoctorant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",disciplineScientifiqueEncadrementDoctorantVo.getId());
    if(disciplineScientifiqueEncadrementDoctorantVo.getEncadrementDoctorantVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrementDoctorant.id","=",disciplineScientifiqueEncadrementDoctorantVo.getEncadrementDoctorantVo().getId());
    }

    if(disciplineScientifiqueEncadrementDoctorantVo.getDisciplineScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifique.id","=",disciplineScientifiqueEncadrementDoctorantVo.getDisciplineScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifique.code","LIKE",disciplineScientifiqueEncadrementDoctorantVo.getDisciplineScientifiqueVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEncadrementDoctorant(DisciplineScientifiqueEncadrementDoctorant disciplineScientifiqueEncadrementDoctorant){
        EncadrementDoctorant loadedEncadrementDoctorant = null;
        if(disciplineScientifiqueEncadrementDoctorant.getEncadrementDoctorant() != null && disciplineScientifiqueEncadrementDoctorant.getEncadrementDoctorant().getId() !=null)
        loadedEncadrementDoctorant =encadrementDoctorantService.findById(disciplineScientifiqueEncadrementDoctorant.getEncadrementDoctorant().getId());

    if(loadedEncadrementDoctorant==null ) {
        return;
    }
    disciplineScientifiqueEncadrementDoctorant.setEncadrementDoctorant(loadedEncadrementDoctorant);
    }
    private void findDisciplineScientifique(DisciplineScientifiqueEncadrementDoctorant disciplineScientifiqueEncadrementDoctorant){
        DisciplineScientifique loadedDisciplineScientifique =disciplineScientifiqueService.findByIdOrCode(disciplineScientifiqueEncadrementDoctorant.getDisciplineScientifique());

    if(loadedDisciplineScientifique==null ) {
        return;
    }
    disciplineScientifiqueEncadrementDoctorant.setDisciplineScientifique(loadedDisciplineScientifique);
    }

@Override
@Transactional
public void delete(List<DisciplineScientifiqueEncadrementDoctorant> disciplineScientifiqueEncadrementDoctorants){
        if(ListUtil.isNotEmpty(disciplineScientifiqueEncadrementDoctorants)){
        disciplineScientifiqueEncadrementDoctorants.forEach(e->disciplineScientifiqueEncadrementDoctorantDao.delete(e));
        }
}
@Override
public void update(List<DisciplineScientifiqueEncadrementDoctorant> disciplineScientifiqueEncadrementDoctorants){
if(ListUtil.isNotEmpty(disciplineScientifiqueEncadrementDoctorants)){
disciplineScientifiqueEncadrementDoctorants.forEach(e->disciplineScientifiqueEncadrementDoctorantDao.save(e));
}
}



@Override
public List<List<DisciplineScientifiqueEncadrementDoctorant>>  getToBeSavedAndToBeDeleted(List<DisciplineScientifiqueEncadrementDoctorant> oldList,List<DisciplineScientifiqueEncadrementDoctorant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
