package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CampagneChercheurFermeture;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.dao.formulaire.CampagneChercheurFermetureDao;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurFermetureAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneChercheurFermetureVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CampagneChercheurFermetureAdminServiceImpl extends AbstractServiceImpl<CampagneChercheurFermeture> implements CampagneChercheurFermetureAdminService {

@Autowired
private CampagneChercheurFermetureDao campagneChercheurFermetureDao;

        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CampagneChercheurFermeture> findAll(){
return campagneChercheurFermetureDao.findAll();
}

        @Override
        public List<CampagneChercheurFermeture> findByChercheurNumeroMatricule(String numeroMatricule){
        return campagneChercheurFermetureDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return campagneChercheurFermetureDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<CampagneChercheurFermeture> findByChercheurId(Long id){
        return campagneChercheurFermetureDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return campagneChercheurFermetureDao.deleteByChercheurId(id);
        }


        @Override
        public List<CampagneChercheurFermeture> findByCampagneCode(String code){
        return campagneChercheurFermetureDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return campagneChercheurFermetureDao.deleteByCampagneCode(code);
        }

        @Override
        public List<CampagneChercheurFermeture> findByCampagneId(Long id){
        return campagneChercheurFermetureDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return campagneChercheurFermetureDao.deleteByCampagneId(id);
        }


@Override
public CampagneChercheurFermeture findById(Long id){
if(id==null) return null;
return campagneChercheurFermetureDao.getOne(id);
}

@Override
public CampagneChercheurFermeture findByIdWithAssociatedList(Long id){
CampagneChercheurFermeture campagneChercheurFermeture  = findById(id);
return campagneChercheurFermeture;
}


@Transactional
public int deleteById(Long id){
if(campagneChercheurFermetureDao.findById(id) == null) return 0;
else{
campagneChercheurFermetureDao.deleteById(id);
return 1;
}
}


@Override
public CampagneChercheurFermeture update(CampagneChercheurFermeture campagneChercheurFermeture){
CampagneChercheurFermeture foundedCampagneChercheurFermeture = findById(campagneChercheurFermeture.getId());
if(foundedCampagneChercheurFermeture==null) return null;
else{
return  campagneChercheurFermetureDao.save(campagneChercheurFermeture);
}
}

@Override
public CampagneChercheurFermeture save (CampagneChercheurFermeture campagneChercheurFermeture){


    findChercheur(campagneChercheurFermeture);
    findCampagne(campagneChercheurFermeture);

CampagneChercheurFermeture savedCampagneChercheurFermeture = campagneChercheurFermetureDao.save(campagneChercheurFermeture);
return savedCampagneChercheurFermeture;
}

@Override
public List<CampagneChercheurFermeture> save(List<CampagneChercheurFermeture> campagneChercheurFermetures){
List<CampagneChercheurFermeture> list = new ArrayList<CampagneChercheurFermeture>();
for(CampagneChercheurFermeture campagneChercheurFermeture: campagneChercheurFermetures){
list.add(save(campagneChercheurFermeture));
}
return list;
}



@Override
@Transactional
public int delete(CampagneChercheurFermeture campagneChercheurFermeture){
    if(campagneChercheurFermeture.getId()==null) return -1;
    CampagneChercheurFermeture foundedCampagneChercheurFermeture = findById(campagneChercheurFermeture.getId());
    if(foundedCampagneChercheurFermeture==null) return -1;
campagneChercheurFermetureDao.delete(foundedCampagneChercheurFermeture);
return 1;
}


public List<CampagneChercheurFermeture> findByCriteria(CampagneChercheurFermetureVo campagneChercheurFermetureVo){

String query = "SELECT o FROM CampagneChercheurFermeture o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",campagneChercheurFermetureVo.getId());
            query += SearchUtil.addConstraint( "o", "objet","LIKE",campagneChercheurFermetureVo.getObjet());
            query += SearchUtil.addConstraint( "o", "message","LIKE",campagneChercheurFermetureVo.getMessage());
            query += SearchUtil.addConstraint( "o", "envoye","=",campagneChercheurFermetureVo.getEnvoye());
        query += SearchUtil.addConstraintDate( "o", "dateEnvoi","=",campagneChercheurFermetureVo.getDateEnvoi());
            query += SearchUtil.addConstraintMinMaxDate("o","dateEnvoi",campagneChercheurFermetureVo.getDateEnvoiMin(),campagneChercheurFermetureVo.getDateEnvoiMax());
    if(campagneChercheurFermetureVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",campagneChercheurFermetureVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",campagneChercheurFermetureVo.getChercheurVo().getNumeroMatricule());
    }

    if(campagneChercheurFermetureVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",campagneChercheurFermetureVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",campagneChercheurFermetureVo.getCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findChercheur(CampagneChercheurFermeture campagneChercheurFermeture){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(campagneChercheurFermeture.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    campagneChercheurFermeture.setChercheur(loadedChercheur);
    }
    private void findCampagne(CampagneChercheurFermeture campagneChercheurFermeture){
        Campagne loadedCampagne =campagneService.findByIdOrCode(campagneChercheurFermeture.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    campagneChercheurFermeture.setCampagne(loadedCampagne);
    }

@Override
@Transactional
public void delete(List<CampagneChercheurFermeture> campagneChercheurFermetures){
        if(ListUtil.isNotEmpty(campagneChercheurFermetures)){
        campagneChercheurFermetures.forEach(e->campagneChercheurFermetureDao.delete(e));
        }
}
@Override
public void update(List<CampagneChercheurFermeture> campagneChercheurFermetures){
if(ListUtil.isNotEmpty(campagneChercheurFermetures)){
campagneChercheurFermetures.forEach(e->campagneChercheurFermetureDao.save(e));
}
}



@Override
public List<List<CampagneChercheurFermeture>>  getToBeSavedAndToBeDeleted(List<CampagneChercheurFermeture> oldList,List<CampagneChercheurFermeture> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
