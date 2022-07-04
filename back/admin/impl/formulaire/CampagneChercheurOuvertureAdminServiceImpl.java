package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CampagneChercheurOuverture;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.dao.formulaire.CampagneChercheurOuvertureDao;
import com.ird.faa.service.admin.facade.formulaire.CampagneChercheurOuvertureAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.ws.rest.provided.converter.formulaire.ChercheurConverter;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneChercheurOuvertureVo;
import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CampagneChercheurOuvertureAdminServiceImpl extends AbstractServiceImpl<CampagneChercheurOuverture> implements CampagneChercheurOuvertureAdminService {

@Autowired
private CampagneChercheurOuvertureDao campagneChercheurOuvertureDao;

        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;
        @Autowired
        private ChercheurConverter chercheurConverter;


@Autowired
private EntityManager entityManager;


@Override
public List<CampagneChercheurOuverture> findAll(){
return campagneChercheurOuvertureDao.findAll();
}

        @Override
        public List<CampagneChercheurOuverture> findByChercheurNumeroMatricule(String numeroMatricule){
        return campagneChercheurOuvertureDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return campagneChercheurOuvertureDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<CampagneChercheurOuverture> findByChercheurId(Long id){
        return campagneChercheurOuvertureDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return campagneChercheurOuvertureDao.deleteByChercheurId(id);
        }


        @Override
        public List<CampagneChercheurOuverture> findByCampagneCode(String code){
        return campagneChercheurOuvertureDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return campagneChercheurOuvertureDao.deleteByCampagneCode(code);
        }

        @Override
        public List<CampagneChercheurOuverture> findByCampagneId(Long id){
        return campagneChercheurOuvertureDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return campagneChercheurOuvertureDao.deleteByCampagneId(id);
        }


@Override
public CampagneChercheurOuverture findById(Long id){
if(id==null) return null;
return campagneChercheurOuvertureDao.getOne(id);
}

@Override
public CampagneChercheurOuverture findByIdWithAssociatedList(Long id){
CampagneChercheurOuverture campagneChercheurOuverture  = findById(id);
return campagneChercheurOuverture;
}


@Transactional
public int deleteById(Long id){
if(campagneChercheurOuvertureDao.findById(id) == null) return 0;
else{
campagneChercheurOuvertureDao.deleteById(id);
return 1;
}
}


@Override
public CampagneChercheurOuverture update(CampagneChercheurOuverture campagneChercheurOuverture){
CampagneChercheurOuverture foundedCampagneChercheurOuverture = findById(campagneChercheurOuverture.getId());
if(foundedCampagneChercheurOuverture==null) return null;
else{
return  campagneChercheurOuvertureDao.save(campagneChercheurOuverture);
}
}

@Override
public CampagneChercheurOuverture save (CampagneChercheurOuverture campagneChercheurOuverture){


    findChercheur(campagneChercheurOuverture);
    findCampagne(campagneChercheurOuverture);

CampagneChercheurOuverture savedCampagneChercheurOuverture = campagneChercheurOuvertureDao.save(campagneChercheurOuverture);
return savedCampagneChercheurOuverture;
}

@Override
public List<CampagneChercheurOuverture> save(List<CampagneChercheurOuverture> campagneChercheurOuvertures){
List<CampagneChercheurOuverture> list = new ArrayList<CampagneChercheurOuverture>();
for(CampagneChercheurOuverture campagneChercheurOuverture: campagneChercheurOuvertures){
list.add(save(campagneChercheurOuverture));
}
return list;
}



@Override
@Transactional
public int delete(CampagneChercheurOuverture campagneChercheurOuverture){
    if(campagneChercheurOuverture.getId()==null) return -1;
    CampagneChercheurOuverture foundedCampagneChercheurOuverture = findById(campagneChercheurOuverture.getId());
    if(foundedCampagneChercheurOuverture==null) return -1;
campagneChercheurOuvertureDao.delete(foundedCampagneChercheurOuverture);
return 1;
}


public List<CampagneChercheurOuverture> findByCriteria(CampagneChercheurOuvertureVo campagneChercheurOuvertureVo){

String query = "SELECT o FROM CampagneChercheurOuverture o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",campagneChercheurOuvertureVo.getId());
            query += SearchUtil.addConstraint( "o", "objet","LIKE",campagneChercheurOuvertureVo.getObjet());
            query += SearchUtil.addConstraint( "o", "message","LIKE",campagneChercheurOuvertureVo.getMessage());
            query += SearchUtil.addConstraint( "o", "envoye","=",campagneChercheurOuvertureVo.getEnvoye());
        query += SearchUtil.addConstraintDate( "o", "dateEnvoi","=",campagneChercheurOuvertureVo.getDateEnvoi());
            query += SearchUtil.addConstraintMinMaxDate("o","dateEnvoi",campagneChercheurOuvertureVo.getDateEnvoiMin(),campagneChercheurOuvertureVo.getDateEnvoiMax());
    if(campagneChercheurOuvertureVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",campagneChercheurOuvertureVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",campagneChercheurOuvertureVo.getChercheurVo().getNumeroMatricule());
    }

    if(campagneChercheurOuvertureVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",campagneChercheurOuvertureVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",campagneChercheurOuvertureVo.getCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findChercheur(CampagneChercheurOuverture campagneChercheurOuverture){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(campagneChercheurOuverture.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    campagneChercheurOuverture.setChercheur(loadedChercheur);
    }
    private void findCampagne(CampagneChercheurOuverture campagneChercheurOuverture){
        Campagne loadedCampagne =campagneService.findByIdOrCode(campagneChercheurOuverture.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    campagneChercheurOuverture.setCampagne(loadedCampagne);
    }

@Override
@Transactional
public void delete(List<CampagneChercheurOuverture> campagneChercheurOuvertures){
        if(ListUtil.isNotEmpty(campagneChercheurOuvertures)){
        campagneChercheurOuvertures.forEach(e->campagneChercheurOuvertureDao.delete(e));
        }
}
@Override
public void update(List<CampagneChercheurOuverture> campagneChercheurOuvertures){
if(ListUtil.isNotEmpty(campagneChercheurOuvertures)){
campagneChercheurOuvertures.forEach(e->campagneChercheurOuvertureDao.save(e));
}
}



@Override
public List<List<CampagneChercheurOuverture>>  getToBeSavedAndToBeDeleted(List<CampagneChercheurOuverture> oldList,List<CampagneChercheurOuverture> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

@Override
public List<ChercheurVo> findListChercheursByCampagneId(Long campagneId) {
	List<ChercheurVo> chercheurs=new ArrayList<>();
	List<CampagneChercheurOuverture> listeCampagneChercheurOuverture=campagneChercheurOuvertureDao.findByCampagneId(campagneId);
	listeCampagneChercheurOuverture.forEach(campagneChercheurOuverture->{
		chercheurs.add(chercheurConverter.toVo(campagneChercheurOuverture.getChercheur()));
	});
	return chercheurs;
}

}
