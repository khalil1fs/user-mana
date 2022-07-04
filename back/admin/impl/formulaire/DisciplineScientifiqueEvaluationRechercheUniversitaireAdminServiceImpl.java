package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaire;
        import com.ird.faa.bean.referentiel.DisciplineScientifique;
        import com.ird.faa.bean.formulaire.EvaluationRechercheUniversitaire;
import com.ird.faa.dao.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaireDao;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaireAdminService;
        import com.ird.faa.service.admin.facade.referentiel.DisciplineScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.formulaire.EvaluationRechercheUniversitaireAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaireVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DisciplineScientifiqueEvaluationRechercheUniversitaireAdminServiceImpl extends AbstractServiceImpl<DisciplineScientifiqueEvaluationRechercheUniversitaire> implements DisciplineScientifiqueEvaluationRechercheUniversitaireAdminService {

@Autowired
private DisciplineScientifiqueEvaluationRechercheUniversitaireDao disciplineScientifiqueEvaluationRechercheUniversitaireDao;

        @Autowired
        private DisciplineScientifiqueAdminService disciplineScientifiqueService ;
        @Autowired
        private EvaluationRechercheUniversitaireAdminService evaluationRechercheUniversitaireService ;


@Autowired
private EntityManager entityManager;


@Override
public List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findAll(){
return disciplineScientifiqueEvaluationRechercheUniversitaireDao.findAll();
}

        @Override
        public List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.findByDisciplineScientifiqueCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueCode(String code){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.deleteByDisciplineScientifiqueCode(code);
        }

        @Override
        public List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.findByDisciplineScientifiqueId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueId(Long id){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.deleteByDisciplineScientifiqueId(id);
        }


        @Override
        public List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireAnnee(Integer annee){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.findByEvaluationRechercheUniversitaireAnnee(annee);
        }

        @Override
        @Transactional
        public int deleteByEvaluationRechercheUniversitaireAnnee(Integer annee){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.deleteByEvaluationRechercheUniversitaireAnnee(annee);
        }

        @Override
        public List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireId(Long id){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.findByEvaluationRechercheUniversitaireId(id);
        }

        @Override
        @Transactional
        public int deleteByEvaluationRechercheUniversitaireId(Long id){
        return disciplineScientifiqueEvaluationRechercheUniversitaireDao.deleteByEvaluationRechercheUniversitaireId(id);
        }


@Override
public DisciplineScientifiqueEvaluationRechercheUniversitaire findById(Long id){
if(id==null) return null;
return disciplineScientifiqueEvaluationRechercheUniversitaireDao.getOne(id);
}

@Override
public DisciplineScientifiqueEvaluationRechercheUniversitaire findByIdWithAssociatedList(Long id){
DisciplineScientifiqueEvaluationRechercheUniversitaire disciplineScientifiqueEvaluationRechercheUniversitaire  = findById(id);
return disciplineScientifiqueEvaluationRechercheUniversitaire;
}


@Transactional
public int deleteById(Long id){
if(disciplineScientifiqueEvaluationRechercheUniversitaireDao.findById(id) == null) return 0;
else{
disciplineScientifiqueEvaluationRechercheUniversitaireDao.deleteById(id);
return 1;
}
}


@Override
public DisciplineScientifiqueEvaluationRechercheUniversitaire update(DisciplineScientifiqueEvaluationRechercheUniversitaire disciplineScientifiqueEvaluationRechercheUniversitaire){
DisciplineScientifiqueEvaluationRechercheUniversitaire foundedDisciplineScientifiqueEvaluationRechercheUniversitaire = findById(disciplineScientifiqueEvaluationRechercheUniversitaire.getId());
if(foundedDisciplineScientifiqueEvaluationRechercheUniversitaire==null) return null;
else{
return  disciplineScientifiqueEvaluationRechercheUniversitaireDao.save(disciplineScientifiqueEvaluationRechercheUniversitaire);
}
}

@Override
public DisciplineScientifiqueEvaluationRechercheUniversitaire save (DisciplineScientifiqueEvaluationRechercheUniversitaire disciplineScientifiqueEvaluationRechercheUniversitaire){


    findDisciplineScientifique(disciplineScientifiqueEvaluationRechercheUniversitaire);
    findEvaluationRechercheUniversitaire(disciplineScientifiqueEvaluationRechercheUniversitaire);

DisciplineScientifiqueEvaluationRechercheUniversitaire savedDisciplineScientifiqueEvaluationRechercheUniversitaire = disciplineScientifiqueEvaluationRechercheUniversitaireDao.save(disciplineScientifiqueEvaluationRechercheUniversitaire);
return savedDisciplineScientifiqueEvaluationRechercheUniversitaire;
}

@Override
public List<DisciplineScientifiqueEvaluationRechercheUniversitaire> save(List<DisciplineScientifiqueEvaluationRechercheUniversitaire> disciplineScientifiqueEvaluationRechercheUniversitaires){
List<DisciplineScientifiqueEvaluationRechercheUniversitaire> list = new ArrayList<DisciplineScientifiqueEvaluationRechercheUniversitaire>();
for(DisciplineScientifiqueEvaluationRechercheUniversitaire disciplineScientifiqueEvaluationRechercheUniversitaire: disciplineScientifiqueEvaluationRechercheUniversitaires){
list.add(save(disciplineScientifiqueEvaluationRechercheUniversitaire));
}
return list;
}



@Override
@Transactional
public int delete(DisciplineScientifiqueEvaluationRechercheUniversitaire disciplineScientifiqueEvaluationRechercheUniversitaire){
    if(disciplineScientifiqueEvaluationRechercheUniversitaire.getId()==null) return -1;
    DisciplineScientifiqueEvaluationRechercheUniversitaire foundedDisciplineScientifiqueEvaluationRechercheUniversitaire = findById(disciplineScientifiqueEvaluationRechercheUniversitaire.getId());
    if(foundedDisciplineScientifiqueEvaluationRechercheUniversitaire==null) return -1;
disciplineScientifiqueEvaluationRechercheUniversitaireDao.delete(foundedDisciplineScientifiqueEvaluationRechercheUniversitaire);
return 1;
}


public List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByCriteria(DisciplineScientifiqueEvaluationRechercheUniversitaireVo disciplineScientifiqueEvaluationRechercheUniversitaireVo){

String query = "SELECT o FROM DisciplineScientifiqueEvaluationRechercheUniversitaire o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",disciplineScientifiqueEvaluationRechercheUniversitaireVo.getId());
    if(disciplineScientifiqueEvaluationRechercheUniversitaireVo.getDisciplineScientifiqueVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifique.id","=",disciplineScientifiqueEvaluationRechercheUniversitaireVo.getDisciplineScientifiqueVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifique.code","LIKE",disciplineScientifiqueEvaluationRechercheUniversitaireVo.getDisciplineScientifiqueVo().getCode());
    }

    if(disciplineScientifiqueEvaluationRechercheUniversitaireVo.getEvaluationRechercheUniversitaireVo()!=null){
        query += SearchUtil.addConstraint( "o", "evaluationRechercheUniversitaire.id","=",disciplineScientifiqueEvaluationRechercheUniversitaireVo.getEvaluationRechercheUniversitaireVo().getId());
            query += SearchUtil.addConstraint( "o", "evaluationRechercheUniversitaire.annee","=",disciplineScientifiqueEvaluationRechercheUniversitaireVo.getEvaluationRechercheUniversitaireVo().getAnnee());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findDisciplineScientifique(DisciplineScientifiqueEvaluationRechercheUniversitaire disciplineScientifiqueEvaluationRechercheUniversitaire){
        DisciplineScientifique loadedDisciplineScientifique =disciplineScientifiqueService.findByIdOrCode(disciplineScientifiqueEvaluationRechercheUniversitaire.getDisciplineScientifique());

    if(loadedDisciplineScientifique==null ) {
        return;
    }
    disciplineScientifiqueEvaluationRechercheUniversitaire.setDisciplineScientifique(loadedDisciplineScientifique);
    }
    private void findEvaluationRechercheUniversitaire(DisciplineScientifiqueEvaluationRechercheUniversitaire disciplineScientifiqueEvaluationRechercheUniversitaire){
        EvaluationRechercheUniversitaire loadedEvaluationRechercheUniversitaire =evaluationRechercheUniversitaireService.findByIdOrAnnee(disciplineScientifiqueEvaluationRechercheUniversitaire.getEvaluationRechercheUniversitaire());

    if(loadedEvaluationRechercheUniversitaire==null ) {
        return;
    }
    disciplineScientifiqueEvaluationRechercheUniversitaire.setEvaluationRechercheUniversitaire(loadedEvaluationRechercheUniversitaire);
    }

@Override
@Transactional
public void delete(List<DisciplineScientifiqueEvaluationRechercheUniversitaire> disciplineScientifiqueEvaluationRechercheUniversitaires){
        if(ListUtil.isNotEmpty(disciplineScientifiqueEvaluationRechercheUniversitaires)){
        disciplineScientifiqueEvaluationRechercheUniversitaires.forEach(e->disciplineScientifiqueEvaluationRechercheUniversitaireDao.delete(e));
        }
}
@Override
public void update(List<DisciplineScientifiqueEvaluationRechercheUniversitaire> disciplineScientifiqueEvaluationRechercheUniversitaires){
if(ListUtil.isNotEmpty(disciplineScientifiqueEvaluationRechercheUniversitaires)){
disciplineScientifiqueEvaluationRechercheUniversitaires.forEach(e->disciplineScientifiqueEvaluationRechercheUniversitaireDao.save(e));
}
}



@Override
public List<List<DisciplineScientifiqueEvaluationRechercheUniversitaire>>  getToBeSavedAndToBeDeleted(List<DisciplineScientifiqueEvaluationRechercheUniversitaire> oldList,List<DisciplineScientifiqueEvaluationRechercheUniversitaire> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
