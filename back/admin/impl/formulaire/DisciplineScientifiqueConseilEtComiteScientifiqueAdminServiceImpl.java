package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueConseilEtComiteScientifique;
        import com.ird.faa.bean.referentiel.DisciplineScientifique;
        import com.ird.faa.bean.formulaire.ConseilEtComiteScientifique;
import com.ird.faa.dao.formulaire.DisciplineScientifiqueConseilEtComiteScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueConseilEtComiteScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ConseilEtComiteScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueConseilEtComiteScientifiqueVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DisciplineScientifiqueConseilEtComiteScientifiqueAdminServiceImpl extends AbstractServiceImpl<DisciplineScientifiqueConseilEtComiteScientifique> implements DisciplineScientifiqueConseilEtComiteScientifiqueAdminService {

@Autowired
private DisciplineScientifiqueConseilEtComiteScientifiqueDao disciplineScientifiqueConseilEtComiteScientifiqueDao;

        @Autowired
        private ConseilEtComiteScientifiqueAdminService conseilEtComiteScientifiqueService ;
        @Autowired
        private DisciplineScientifiqueAdminService disciplineScientifiqueService ;


@Autowired
private EntityManager entityManager;


@Override
public List<DisciplineScientifiqueConseilEtComiteScientifique> findAll(){
return disciplineScientifiqueConseilEtComiteScientifiqueDao.findAll();
}

        @Override
        public List<DisciplineScientifiqueConseilEtComiteScientifique> findByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.findByDisciplineScientifiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.deleteByDisciplineScientifiqueCode(code);
        }

        @Override
        public List<DisciplineScientifiqueConseilEtComiteScientifique> findByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.findByDisciplineScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.deleteByDisciplineScientifiqueId(id);
        }


        @Override
        public List<DisciplineScientifiqueConseilEtComiteScientifique> findByConseilEtComiteScientifiqueAnnee(Integer annee){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.findByConseilEtComiteScientifiqueAnnee(annee);
        }

        @Override
        @Transactional
        public int deleteByConseilEtComiteScientifiqueAnnee(Integer annee){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.deleteByConseilEtComiteScientifiqueAnnee(annee);
        }

        @Override
        public List<DisciplineScientifiqueConseilEtComiteScientifique> findByConseilEtComiteScientifiqueId(Long id){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.findByConseilEtComiteScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByConseilEtComiteScientifiqueId(Long id){
        return disciplineScientifiqueConseilEtComiteScientifiqueDao.deleteByConseilEtComiteScientifiqueId(id);
        }


@Override
public DisciplineScientifiqueConseilEtComiteScientifique findById(Long id){
if(id==null) return null;
return disciplineScientifiqueConseilEtComiteScientifiqueDao.getOne(id);
}

@Override
public DisciplineScientifiqueConseilEtComiteScientifique findByIdWithAssociatedList(Long id){
DisciplineScientifiqueConseilEtComiteScientifique disciplineScientifiqueConseilEtComiteScientifique  = findById(id);
return disciplineScientifiqueConseilEtComiteScientifique;
}


@Transactional
public int deleteById(Long id){
if(disciplineScientifiqueConseilEtComiteScientifiqueDao.findById(id) == null) return 0;
else{
disciplineScientifiqueConseilEtComiteScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public DisciplineScientifiqueConseilEtComiteScientifique update(DisciplineScientifiqueConseilEtComiteScientifique disciplineScientifiqueConseilEtComiteScientifique){
DisciplineScientifiqueConseilEtComiteScientifique foundedDisciplineScientifiqueConseilEtComiteScientifique = findById(disciplineScientifiqueConseilEtComiteScientifique.getId());
if(foundedDisciplineScientifiqueConseilEtComiteScientifique==null) return null;
else{
return  disciplineScientifiqueConseilEtComiteScientifiqueDao.save(disciplineScientifiqueConseilEtComiteScientifique);
}
}

@Override
public DisciplineScientifiqueConseilEtComiteScientifique save (DisciplineScientifiqueConseilEtComiteScientifique disciplineScientifiqueConseilEtComiteScientifique){


    findDisciplineScientifique(disciplineScientifiqueConseilEtComiteScientifique);
    findConseilEtComiteScientifique(disciplineScientifiqueConseilEtComiteScientifique);

DisciplineScientifiqueConseilEtComiteScientifique savedDisciplineScientifiqueConseilEtComiteScientifique = disciplineScientifiqueConseilEtComiteScientifiqueDao.save(disciplineScientifiqueConseilEtComiteScientifique);
return savedDisciplineScientifiqueConseilEtComiteScientifique;
}

@Override
public List<DisciplineScientifiqueConseilEtComiteScientifique> save(List<DisciplineScientifiqueConseilEtComiteScientifique> disciplineScientifiqueConseilEtComiteScientifiques){
List<DisciplineScientifiqueConseilEtComiteScientifique> list = new ArrayList<DisciplineScientifiqueConseilEtComiteScientifique>();
for(DisciplineScientifiqueConseilEtComiteScientifique disciplineScientifiqueConseilEtComiteScientifique: disciplineScientifiqueConseilEtComiteScientifiques){
list.add(save(disciplineScientifiqueConseilEtComiteScientifique));
}
return list;
}



@Override
@Transactional
public int delete(DisciplineScientifiqueConseilEtComiteScientifique disciplineScientifiqueConseilEtComiteScientifique){
    if(disciplineScientifiqueConseilEtComiteScientifique.getId()==null) return -1;
    DisciplineScientifiqueConseilEtComiteScientifique foundedDisciplineScientifiqueConseilEtComiteScientifique = findById(disciplineScientifiqueConseilEtComiteScientifique.getId());
    if(foundedDisciplineScientifiqueConseilEtComiteScientifique==null) return -1;
disciplineScientifiqueConseilEtComiteScientifiqueDao.delete(foundedDisciplineScientifiqueConseilEtComiteScientifique);
return 1;
}


public List<DisciplineScientifiqueConseilEtComiteScientifique> findByCriteria(DisciplineScientifiqueConseilEtComiteScientifiqueVo disciplineScientifiqueConseilEtComiteScientifiqueVo){

String query = "SELECT o FROM DisciplineScientifiqueConseilEtComiteScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",disciplineScientifiqueConseilEtComiteScientifiqueVo.getId());
    if(disciplineScientifiqueConseilEtComiteScientifiqueVo.getDisciplineScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifique.id","=",disciplineScientifiqueConseilEtComiteScientifiqueVo.getDisciplineScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifique.code","LIKE",disciplineScientifiqueConseilEtComiteScientifiqueVo.getDisciplineScientifiqueVo().getCode());
    }

    if(disciplineScientifiqueConseilEtComiteScientifiqueVo.getConseilEtComiteScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "conseilEtComiteScientifique.id","=",disciplineScientifiqueConseilEtComiteScientifiqueVo.getConseilEtComiteScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "conseilEtComiteScientifique.annee","=",disciplineScientifiqueConseilEtComiteScientifiqueVo.getConseilEtComiteScientifiqueVo().getAnnee());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findDisciplineScientifique(DisciplineScientifiqueConseilEtComiteScientifique disciplineScientifiqueConseilEtComiteScientifique){
        DisciplineScientifique loadedDisciplineScientifique =disciplineScientifiqueService.findByIdOrCode(disciplineScientifiqueConseilEtComiteScientifique.getDisciplineScientifique());

    if(loadedDisciplineScientifique==null ) {
        return;
    }
    disciplineScientifiqueConseilEtComiteScientifique.setDisciplineScientifique(loadedDisciplineScientifique);
    }
    private void findConseilEtComiteScientifique(DisciplineScientifiqueConseilEtComiteScientifique disciplineScientifiqueConseilEtComiteScientifique){
        ConseilEtComiteScientifique loadedConseilEtComiteScientifique =conseilEtComiteScientifiqueService.findByIdOrAnnee(disciplineScientifiqueConseilEtComiteScientifique.getConseilEtComiteScientifique());

    if(loadedConseilEtComiteScientifique==null ) {
        return;
    }
    disciplineScientifiqueConseilEtComiteScientifique.setConseilEtComiteScientifique(loadedConseilEtComiteScientifique);
    }

@Override
@Transactional
public void delete(List<DisciplineScientifiqueConseilEtComiteScientifique> disciplineScientifiqueConseilEtComiteScientifiques){
        if(ListUtil.isNotEmpty(disciplineScientifiqueConseilEtComiteScientifiques)){
        disciplineScientifiqueConseilEtComiteScientifiques.forEach(e->disciplineScientifiqueConseilEtComiteScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<DisciplineScientifiqueConseilEtComiteScientifique> disciplineScientifiqueConseilEtComiteScientifiques){
if(ListUtil.isNotEmpty(disciplineScientifiqueConseilEtComiteScientifiques)){
disciplineScientifiqueConseilEtComiteScientifiques.forEach(e->disciplineScientifiqueConseilEtComiteScientifiqueDao.save(e));
}
}



@Override
public List<List<DisciplineScientifiqueConseilEtComiteScientifique>>  getToBeSavedAndToBeDeleted(List<DisciplineScientifiqueConseilEtComiteScientifique> oldList,List<DisciplineScientifiqueConseilEtComiteScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
