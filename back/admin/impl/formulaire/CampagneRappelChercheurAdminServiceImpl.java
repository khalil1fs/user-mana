package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CampagneRappelChercheur;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.CampagneRappel;
import com.ird.faa.dao.formulaire.CampagneRappelChercheurDao;
import com.ird.faa.service.admin.facade.formulaire.CampagneRappelChercheurAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneRappelAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneRappelChercheurVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CampagneRappelChercheurAdminServiceImpl extends AbstractServiceImpl<CampagneRappelChercheur> implements CampagneRappelChercheurAdminService {

@Autowired
private CampagneRappelChercheurDao campagneRappelChercheurDao;

        @Autowired
        private CampagneRappelAdminService campagneRappelService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CampagneRappelChercheur> findAll(){
return campagneRappelChercheurDao.findAll();
}

        @Override
        public List<CampagneRappelChercheur> findByChercheurNumeroMatricule(String numeroMatricule){
        return campagneRappelChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return campagneRappelChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<CampagneRappelChercheur> findByChercheurId(Long id){
        return campagneRappelChercheurDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return campagneRappelChercheurDao.deleteByChercheurId(id);
        }

        @Override
        public List<CampagneRappelChercheur> findByCampagneRappelId(Long id){
        return campagneRappelChercheurDao.findByCampagneRappelId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneRappelId(Long id){
        return campagneRappelChercheurDao.deleteByCampagneRappelId(id);
        }


@Override
public CampagneRappelChercheur findById(Long id){
if(id==null) return null;
return campagneRappelChercheurDao.getOne(id);
}

@Override
public CampagneRappelChercheur findByIdWithAssociatedList(Long id){
CampagneRappelChercheur campagneRappelChercheur  = findById(id);
return campagneRappelChercheur;
}


@Transactional
public int deleteById(Long id){
if(campagneRappelChercheurDao.findById(id) == null) return 0;
else{
campagneRappelChercheurDao.deleteById(id);
return 1;
}
}


@Override
public CampagneRappelChercheur update(CampagneRappelChercheur campagneRappelChercheur){
CampagneRappelChercheur foundedCampagneRappelChercheur = findById(campagneRappelChercheur.getId());
if(foundedCampagneRappelChercheur==null) return null;
else{
return  campagneRappelChercheurDao.save(campagneRappelChercheur);
}
}

@Override
public CampagneRappelChercheur save (CampagneRappelChercheur campagneRappelChercheur){


    findChercheur(campagneRappelChercheur);
    findCampagneRappel(campagneRappelChercheur);

CampagneRappelChercheur savedCampagneRappelChercheur = campagneRappelChercheurDao.save(campagneRappelChercheur);
return savedCampagneRappelChercheur;
}

@Override
public List<CampagneRappelChercheur> save(List<CampagneRappelChercheur> campagneRappelChercheurs){
List<CampagneRappelChercheur> list = new ArrayList<CampagneRappelChercheur>();
for(CampagneRappelChercheur campagneRappelChercheur: campagneRappelChercheurs){
list.add(save(campagneRappelChercheur));
}
return list;
}



@Override
@Transactional
public int delete(CampagneRappelChercheur campagneRappelChercheur){
    if(campagneRappelChercheur.getId()==null) return -1;
    CampagneRappelChercheur foundedCampagneRappelChercheur = findById(campagneRappelChercheur.getId());
    if(foundedCampagneRappelChercheur==null) return -1;
campagneRappelChercheurDao.delete(foundedCampagneRappelChercheur);
return 1;
}


public List<CampagneRappelChercheur> findByCriteria(CampagneRappelChercheurVo campagneRappelChercheurVo){

String query = "SELECT o FROM CampagneRappelChercheur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",campagneRappelChercheurVo.getId());
            query += SearchUtil.addConstraint( "o", "objet","LIKE",campagneRappelChercheurVo.getObjet());
            query += SearchUtil.addConstraint( "o", "message","LIKE",campagneRappelChercheurVo.getMessage());
            query += SearchUtil.addConstraint( "o", "envoye","=",campagneRappelChercheurVo.getEnvoye());
        query += SearchUtil.addConstraintDate( "o", "dateEnvoi","=",campagneRappelChercheurVo.getDateEnvoi());
            query += SearchUtil.addConstraintMinMaxDate("o","dateEnvoi",campagneRappelChercheurVo.getDateEnvoiMin(),campagneRappelChercheurVo.getDateEnvoiMax());
    if(campagneRappelChercheurVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",campagneRappelChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",campagneRappelChercheurVo.getChercheurVo().getNumeroMatricule());
    }

    if(campagneRappelChercheurVo.getCampagneRappelVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagneRappel.id","=",campagneRappelChercheurVo.getCampagneRappelVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findChercheur(CampagneRappelChercheur campagneRappelChercheur){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(campagneRappelChercheur.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    campagneRappelChercheur.setChercheur(loadedChercheur);
    }
    private void findCampagneRappel(CampagneRappelChercheur campagneRappelChercheur){
        CampagneRappel loadedCampagneRappel = null;
        if(campagneRappelChercheur.getCampagneRappel() != null && campagneRappelChercheur.getCampagneRappel().getId() !=null)
        loadedCampagneRappel =campagneRappelService.findById(campagneRappelChercheur.getCampagneRappel().getId());

    if(loadedCampagneRappel==null ) {
        return;
    }
    campagneRappelChercheur.setCampagneRappel(loadedCampagneRappel);
    }

@Override
@Transactional
public void delete(List<CampagneRappelChercheur> campagneRappelChercheurs){
        if(ListUtil.isNotEmpty(campagneRappelChercheurs)){
        campagneRappelChercheurs.forEach(e->campagneRappelChercheurDao.delete(e));
        }
}
@Override
public void update(List<CampagneRappelChercheur> campagneRappelChercheurs){
if(ListUtil.isNotEmpty(campagneRappelChercheurs)){
campagneRappelChercheurs.forEach(e->campagneRappelChercheurDao.save(e));
}
}



@Override
public List<List<CampagneRappelChercheur>>  getToBeSavedAndToBeDeleted(List<CampagneRappelChercheur> oldList,List<CampagneRappelChercheur> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
