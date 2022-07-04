package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CampagneRelanceChercheur;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.CampagneRelance;
import com.ird.faa.dao.formulaire.CampagneRelanceChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.CampagneRelanceChercheurAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneRelanceAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneRelanceChercheurVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CampagneRelanceChercheurAdminServiceImpl extends AbstractServiceImpl<CampagneRelanceChercheur> implements CampagneRelanceChercheurAdminService {

@Autowired
private CampagneRelanceChercheurDao campagneRelanceChercheurDao;

        @Autowired
        private CampagneRelanceAdminService campagneRelanceService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CampagneRelanceChercheur> findAll(){
return campagneRelanceChercheurDao.findAll();
}

        @Override
        public List<CampagneRelanceChercheur> findByChercheurNumeroMatricule(String numeroMatricule){
        return campagneRelanceChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return campagneRelanceChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<CampagneRelanceChercheur> findByChercheurId(Long id){
        return campagneRelanceChercheurDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return campagneRelanceChercheurDao.deleteByChercheurId(id);
        }

        @Override
        public List<CampagneRelanceChercheur> findByCampagneRelanceId(Long id){
        	
        	List<CampagneRelanceChercheur> campagnesRelances =campagneRelanceChercheurDao.findByCampagneRelanceId(id);
        	
        	return campagneRelanceChercheurDao.findByCampagneRelanceId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneRelanceId(Long id){
        return campagneRelanceChercheurDao.deleteByCampagneRelanceId(id);
        }


@Override
public CampagneRelanceChercheur findById(Long id){
if(id==null) return null;
return campagneRelanceChercheurDao.getOne(id);
}

@Override
public CampagneRelanceChercheur findByIdWithAssociatedList(Long id){
CampagneRelanceChercheur campagneRelanceChercheur  = findById(id);
return campagneRelanceChercheur;
}


@Transactional
public int deleteById(Long id){
if(campagneRelanceChercheurDao.findById(id) == null) return 0;
else{
campagneRelanceChercheurDao.deleteById(id);
return 1;
}
}


@Override
public CampagneRelanceChercheur update(CampagneRelanceChercheur campagneRelanceChercheur){
CampagneRelanceChercheur foundedCampagneRelanceChercheur = findById(campagneRelanceChercheur.getId());
if(foundedCampagneRelanceChercheur==null) return null;
else{
return  campagneRelanceChercheurDao.save(campagneRelanceChercheur);
}
}

@Override
public CampagneRelanceChercheur save (CampagneRelanceChercheur campagneRelanceChercheur){


    findChercheur(campagneRelanceChercheur);
    findCampagneRelance(campagneRelanceChercheur);

CampagneRelanceChercheur savedCampagneRelanceChercheur = campagneRelanceChercheurDao.save(campagneRelanceChercheur);
return savedCampagneRelanceChercheur;
}

@Override
public List<CampagneRelanceChercheur> save(List<CampagneRelanceChercheur> campagneRelanceChercheurs){
List<CampagneRelanceChercheur> list = new ArrayList<CampagneRelanceChercheur>();
for(CampagneRelanceChercheur campagneRelanceChercheur: campagneRelanceChercheurs){
list.add(save(campagneRelanceChercheur));
}
return list;
}



@Override
@Transactional
public int delete(CampagneRelanceChercheur campagneRelanceChercheur){
    if(campagneRelanceChercheur.getId()==null) return -1;
    CampagneRelanceChercheur foundedCampagneRelanceChercheur = findById(campagneRelanceChercheur.getId());
    if(foundedCampagneRelanceChercheur==null) return -1;
campagneRelanceChercheurDao.delete(foundedCampagneRelanceChercheur);
return 1;
}


public List<CampagneRelanceChercheur> findByCriteria(CampagneRelanceChercheurVo campagneRelanceChercheurVo){

String query = "SELECT o FROM CampagneRelanceChercheur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",campagneRelanceChercheurVo.getId());
            query += SearchUtil.addConstraint( "o", "objet","LIKE",campagneRelanceChercheurVo.getObjet());
            query += SearchUtil.addConstraint( "o", "message","LIKE",campagneRelanceChercheurVo.getMessage());
            query += SearchUtil.addConstraint( "o", "envoye","=",campagneRelanceChercheurVo.getEnvoye());
        query += SearchUtil.addConstraintDate( "o", "dateEnvoi","=",campagneRelanceChercheurVo.getDateEnvoi());
            query += SearchUtil.addConstraintMinMaxDate("o","dateEnvoi",campagneRelanceChercheurVo.getDateEnvoiMin(),campagneRelanceChercheurVo.getDateEnvoiMax());
    if(campagneRelanceChercheurVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",campagneRelanceChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",campagneRelanceChercheurVo.getChercheurVo().getNumeroMatricule());
    }

    if(campagneRelanceChercheurVo.getCampagneRelanceVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagneRelance.id","=",campagneRelanceChercheurVo.getCampagneRelanceVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findChercheur(CampagneRelanceChercheur campagneRelanceChercheur){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(campagneRelanceChercheur.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    campagneRelanceChercheur.setChercheur(loadedChercheur);
    }
    private void findCampagneRelance(CampagneRelanceChercheur campagneRelanceChercheur){
        CampagneRelance loadedCampagneRelance = null;
        if(campagneRelanceChercheur.getCampagneRelance() != null && campagneRelanceChercheur.getCampagneRelance().getId() !=null)
        loadedCampagneRelance =campagneRelanceService.findById(campagneRelanceChercheur.getCampagneRelance().getId());

    if(loadedCampagneRelance==null ) {
        return;
    }
    campagneRelanceChercheur.setCampagneRelance(loadedCampagneRelance);
    }

@Override
@Transactional
public void delete(List<CampagneRelanceChercheur> campagneRelanceChercheurs){
        if(ListUtil.isNotEmpty(campagneRelanceChercheurs)){
        campagneRelanceChercheurs.forEach(e->campagneRelanceChercheurDao.delete(e));
        }
}
@Override
public void update(List<CampagneRelanceChercheur> campagneRelanceChercheurs){
if(ListUtil.isNotEmpty(campagneRelanceChercheurs)){
campagneRelanceChercheurs.forEach(e->campagneRelanceChercheurDao.save(e));
}
}



@Override
public List<List<CampagneRelanceChercheur>>  getToBeSavedAndToBeDeleted(List<CampagneRelanceChercheur> oldList,List<CampagneRelanceChercheur> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
