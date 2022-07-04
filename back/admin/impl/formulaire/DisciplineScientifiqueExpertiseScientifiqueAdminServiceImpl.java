package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueExpertiseScientifique;
        import com.ird.faa.bean.referentiel.DisciplineScientifique;
        import com.ird.faa.bean.formulaire.ExpertiseScientifique;
import com.ird.faa.dao.formulaire.DisciplineScientifiqueExpertiseScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueExpertiseScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ExpertiseScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueExpertiseScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DisciplineScientifiqueExpertiseScientifiqueAdminServiceImpl extends AbstractServiceImpl<DisciplineScientifiqueExpertiseScientifique> implements DisciplineScientifiqueExpertiseScientifiqueAdminService {

@Autowired
private DisciplineScientifiqueExpertiseScientifiqueDao disciplineScientifiqueExpertiseScientifiqueDao;

        @Autowired
        private ExpertiseScientifiqueAdminService expertiseScientifiqueService ;
        @Autowired
        private DisciplineScientifiqueAdminService disciplineScientifiqueService ;


@Autowired
private EntityManager entityManager;


@Override
public List<DisciplineScientifiqueExpertiseScientifique> findAll(){
return disciplineScientifiqueExpertiseScientifiqueDao.findAll();
}

        @Override
        public List<DisciplineScientifiqueExpertiseScientifique> findByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueExpertiseScientifiqueDao.findByDisciplineScientifiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueExpertiseScientifiqueDao.deleteByDisciplineScientifiqueCode(code);
        }

        @Override
        public List<DisciplineScientifiqueExpertiseScientifique> findByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueExpertiseScientifiqueDao.findByDisciplineScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueExpertiseScientifiqueDao.deleteByDisciplineScientifiqueId(id);
        }


        @Override
        public List<DisciplineScientifiqueExpertiseScientifique> findByExpertiseScientifiqueAnnee(Integer annee){
        return disciplineScientifiqueExpertiseScientifiqueDao.findByExpertiseScientifiqueAnnee(annee);
        }

        @Override
        @Transactional
        public int deleteByExpertiseScientifiqueAnnee(Integer annee){
        return disciplineScientifiqueExpertiseScientifiqueDao.deleteByExpertiseScientifiqueAnnee(annee);
        }

        @Override
        public List<DisciplineScientifiqueExpertiseScientifique> findByExpertiseScientifiqueId(Long id){
        return disciplineScientifiqueExpertiseScientifiqueDao.findByExpertiseScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByExpertiseScientifiqueId(Long id){
        return disciplineScientifiqueExpertiseScientifiqueDao.deleteByExpertiseScientifiqueId(id);
        }


@Override
public DisciplineScientifiqueExpertiseScientifique findById(Long id){
if(id==null) return null;
return disciplineScientifiqueExpertiseScientifiqueDao.getOne(id);
}

@Override
public DisciplineScientifiqueExpertiseScientifique findByIdWithAssociatedList(Long id){
DisciplineScientifiqueExpertiseScientifique disciplineScientifiqueExpertiseScientifique  = findById(id);
return disciplineScientifiqueExpertiseScientifique;
}


@Transactional
public int deleteById(Long id){
if(disciplineScientifiqueExpertiseScientifiqueDao.findById(id) == null) return 0;
else{
disciplineScientifiqueExpertiseScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public DisciplineScientifiqueExpertiseScientifique update(DisciplineScientifiqueExpertiseScientifique disciplineScientifiqueExpertiseScientifique){
DisciplineScientifiqueExpertiseScientifique foundedDisciplineScientifiqueExpertiseScientifique = findById(disciplineScientifiqueExpertiseScientifique.getId());
if(foundedDisciplineScientifiqueExpertiseScientifique==null) return null;
else{
return  disciplineScientifiqueExpertiseScientifiqueDao.save(disciplineScientifiqueExpertiseScientifique);
}
}

@Override
public DisciplineScientifiqueExpertiseScientifique save (DisciplineScientifiqueExpertiseScientifique disciplineScientifiqueExpertiseScientifique){


    findDisciplineScientifique(disciplineScientifiqueExpertiseScientifique);
    findExpertiseScientifique(disciplineScientifiqueExpertiseScientifique);

DisciplineScientifiqueExpertiseScientifique savedDisciplineScientifiqueExpertiseScientifique = disciplineScientifiqueExpertiseScientifiqueDao.save(disciplineScientifiqueExpertiseScientifique);
return savedDisciplineScientifiqueExpertiseScientifique;
}

@Override
public List<DisciplineScientifiqueExpertiseScientifique> save(List<DisciplineScientifiqueExpertiseScientifique> disciplineScientifiqueExpertiseScientifiques){
List<DisciplineScientifiqueExpertiseScientifique> list = new ArrayList<DisciplineScientifiqueExpertiseScientifique>();
for(DisciplineScientifiqueExpertiseScientifique disciplineScientifiqueExpertiseScientifique: disciplineScientifiqueExpertiseScientifiques){
list.add(save(disciplineScientifiqueExpertiseScientifique));
}
return list;
}



@Override
@Transactional
public int delete(DisciplineScientifiqueExpertiseScientifique disciplineScientifiqueExpertiseScientifique){
    if(disciplineScientifiqueExpertiseScientifique.getId()==null) return -1;
    DisciplineScientifiqueExpertiseScientifique foundedDisciplineScientifiqueExpertiseScientifique = findById(disciplineScientifiqueExpertiseScientifique.getId());
    if(foundedDisciplineScientifiqueExpertiseScientifique==null) return -1;
disciplineScientifiqueExpertiseScientifiqueDao.delete(foundedDisciplineScientifiqueExpertiseScientifique);
return 1;
}


public List<DisciplineScientifiqueExpertiseScientifique> findByCriteria(DisciplineScientifiqueExpertiseScientifiqueVo disciplineScientifiqueExpertiseScientifiqueVo){

String query = "SELECT o FROM DisciplineScientifiqueExpertiseScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",disciplineScientifiqueExpertiseScientifiqueVo.getId());
    if(disciplineScientifiqueExpertiseScientifiqueVo.getDisciplineScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifique.id","=",disciplineScientifiqueExpertiseScientifiqueVo.getDisciplineScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifique.code","LIKE",disciplineScientifiqueExpertiseScientifiqueVo.getDisciplineScientifiqueVo().getCode());
    }

    if(disciplineScientifiqueExpertiseScientifiqueVo.getExpertiseScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "expertiseScientifique.id","=",disciplineScientifiqueExpertiseScientifiqueVo.getExpertiseScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "expertiseScientifique.annee","=",disciplineScientifiqueExpertiseScientifiqueVo.getExpertiseScientifiqueVo().getAnnee());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findDisciplineScientifique(DisciplineScientifiqueExpertiseScientifique disciplineScientifiqueExpertiseScientifique){
        DisciplineScientifique loadedDisciplineScientifique =disciplineScientifiqueService.findByIdOrCode(disciplineScientifiqueExpertiseScientifique.getDisciplineScientifique());

    if(loadedDisciplineScientifique==null ) {
        return;
    }
    disciplineScientifiqueExpertiseScientifique.setDisciplineScientifique(loadedDisciplineScientifique);
    }
    private void findExpertiseScientifique(DisciplineScientifiqueExpertiseScientifique disciplineScientifiqueExpertiseScientifique){
        ExpertiseScientifique loadedExpertiseScientifique =expertiseScientifiqueService.findByIdOrAnnee(disciplineScientifiqueExpertiseScientifique.getExpertiseScientifique());

    if(loadedExpertiseScientifique==null ) {
        return;
    }
    disciplineScientifiqueExpertiseScientifique.setExpertiseScientifique(loadedExpertiseScientifique);
    }

@Override
@Transactional
public void delete(List<DisciplineScientifiqueExpertiseScientifique> disciplineScientifiqueExpertiseScientifiques){
        if(ListUtil.isNotEmpty(disciplineScientifiqueExpertiseScientifiques)){
        disciplineScientifiqueExpertiseScientifiques.forEach(e->disciplineScientifiqueExpertiseScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<DisciplineScientifiqueExpertiseScientifique> disciplineScientifiqueExpertiseScientifiques){
if(ListUtil.isNotEmpty(disciplineScientifiqueExpertiseScientifiques)){
disciplineScientifiqueExpertiseScientifiques.forEach(e->disciplineScientifiqueExpertiseScientifiqueDao.save(e));
}
}



@Override
public List<List<DisciplineScientifiqueExpertiseScientifique>>  getToBeSavedAndToBeDeleted(List<DisciplineScientifiqueExpertiseScientifique> oldList,List<DisciplineScientifiqueExpertiseScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
