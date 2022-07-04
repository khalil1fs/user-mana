package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.Reclamation;
        import com.ird.faa.bean.config.EtatReclamation;
        import com.ird.faa.bean.referentiel.TypeReclamation;
        import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.dao.formulaire.ReclamationDao;
import com.ird.faa.service.admin.facade.formulaire.ReclamationAdminService;
        import com.ird.faa.service.admin.facade.referentiel.TypeReclamationAdminService;
        import com.ird.faa.service.admin.facade.config.EtatReclamationAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ReclamationVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ReclamationAdminServiceImpl extends AbstractServiceImpl<Reclamation> implements ReclamationAdminService {

@Autowired
private ReclamationDao reclamationDao;

        @Autowired
        private TypeReclamationAdminService typeReclamationService ;
        @Autowired
        private EtatReclamationAdminService etatReclamationService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<Reclamation> findAll(){
return reclamationDao.findAll();
}

        @Override
        public List<Reclamation> findByEtatReclamationCode(String code){
        return reclamationDao.findByEtatReclamationCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatReclamationCode(String code){
        return reclamationDao.deleteByEtatReclamationCode(code);
        }

        @Override
        public List<Reclamation> findByEtatReclamationId(Long id){
        return reclamationDao.findByEtatReclamationId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatReclamationId(Long id){
        return reclamationDao.deleteByEtatReclamationId(id);
        }


        @Override
        public List<Reclamation> findByTypeReclamationCode(String code){
        return reclamationDao.findByTypeReclamationCode(code);
        }

        @Override
        @Transactional
        public int deleteByTypeReclamationCode(String code){
        return reclamationDao.deleteByTypeReclamationCode(code);
        }

        @Override
        public List<Reclamation> findByTypeReclamationId(Long id){
        return reclamationDao.findByTypeReclamationId(id);
        }

        @Override
        @Transactional
        public int deleteByTypeReclamationId(Long id){
        return reclamationDao.deleteByTypeReclamationId(id);
        }


        @Override
        public List<Reclamation> findByChercheurNumeroMatricule(String numeroMatricule){
        return reclamationDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return reclamationDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<Reclamation> findByChercheurId(Long id){
        return reclamationDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return reclamationDao.deleteByChercheurId(id);
        }


@Override
public Reclamation findById(Long id){
if(id==null) return null;
return reclamationDao.getOne(id);
}

@Override
public Reclamation findByIdWithAssociatedList(Long id){
Reclamation reclamation  = findById(id);
return reclamation;
}


@Transactional
public int deleteById(Long id){
if(reclamationDao.findById(id) == null) return 0;
else{
reclamationDao.deleteById(id);
return 1;
}
}


@Override
public Reclamation update(Reclamation reclamation){
Reclamation foundedReclamation = findById(reclamation.getId());
if(foundedReclamation==null) return null;
else{
return  reclamationDao.save(reclamation);
}
}

@Override
public Reclamation save (Reclamation reclamation){


    findEtatReclamation(reclamation);
    findTypeReclamation(reclamation);
    findChercheur(reclamation);

Reclamation savedReclamation = reclamationDao.save(reclamation);
return savedReclamation;
}

@Override
public List<Reclamation> save(List<Reclamation> reclamations){
List<Reclamation> list = new ArrayList<Reclamation>();
for(Reclamation reclamation: reclamations){
list.add(save(reclamation));
}
return list;
}



@Override
@Transactional
public int delete(Reclamation reclamation){
    if(reclamation.getId()==null) return -1;
    Reclamation foundedReclamation = findById(reclamation.getId());
    if(foundedReclamation==null) return -1;
reclamationDao.delete(foundedReclamation);
return 1;
}


public List<Reclamation> findByCriteria(ReclamationVo reclamationVo){

String query = "SELECT o FROM Reclamation o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",reclamationVo.getId());
            query += SearchUtil.addConstraint( "o", "objet","LIKE",reclamationVo.getObjet());
            query += SearchUtil.addConstraint( "o", "message","LIKE",reclamationVo.getMessage());
        query += SearchUtil.addConstraintDate( "o", "dateReclamation","=",reclamationVo.getDateReclamation());
        query += SearchUtil.addConstraintDate( "o", "dateTraitement","=",reclamationVo.getDateTraitement());
            query += SearchUtil.addConstraintMinMaxDate("o","dateReclamation",reclamationVo.getDateReclamationMin(),reclamationVo.getDateReclamationMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateTraitement",reclamationVo.getDateTraitementMin(),reclamationVo.getDateTraitementMax());
    if(reclamationVo.getEtatReclamationVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatReclamation.id","=",reclamationVo.getEtatReclamationVo().getId());
            query += SearchUtil.addConstraint( "o", "etatReclamation.code","LIKE",reclamationVo.getEtatReclamationVo().getCode());
    }

    if(reclamationVo.getTypeReclamationVo()!=null){
        query += SearchUtil.addConstraint( "o", "typeReclamation.id","=",reclamationVo.getTypeReclamationVo().getId());
            query += SearchUtil.addConstraint( "o", "typeReclamation.code","LIKE",reclamationVo.getTypeReclamationVo().getCode());
    }

    if(reclamationVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",reclamationVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",reclamationVo.getChercheurVo().getNumeroMatricule());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEtatReclamation(Reclamation reclamation){
        EtatReclamation loadedEtatReclamation =etatReclamationService.findByIdOrCode(reclamation.getEtatReclamation());

    if(loadedEtatReclamation==null ) {
        return;
    }
    reclamation.setEtatReclamation(loadedEtatReclamation);
    }
    private void findTypeReclamation(Reclamation reclamation){
        TypeReclamation loadedTypeReclamation =typeReclamationService.findByIdOrCode(reclamation.getTypeReclamation());

    if(loadedTypeReclamation==null ) {
        return;
    }
    reclamation.setTypeReclamation(loadedTypeReclamation);
    }
    private void findChercheur(Reclamation reclamation){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(reclamation.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    reclamation.setChercheur(loadedChercheur);
    }

@Override
@Transactional
public void delete(List<Reclamation> reclamations){
        if(ListUtil.isNotEmpty(reclamations)){
        reclamations.forEach(e->reclamationDao.delete(e));
        }
}
@Override
public void update(List<Reclamation> reclamations){
if(ListUtil.isNotEmpty(reclamations)){
reclamations.forEach(e->reclamationDao.save(e));
}
}



@Override
public List<List<Reclamation>>  getToBeSavedAndToBeDeleted(List<Reclamation> oldList,List<Reclamation> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
