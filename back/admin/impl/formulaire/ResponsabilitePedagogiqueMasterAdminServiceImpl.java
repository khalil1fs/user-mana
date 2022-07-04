package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueMaster;
        import com.ird.faa.bean.referentiel.StatutMaster;
        import com.ird.faa.bean.referentiel.Master;
        import com.ird.faa.bean.referentiel.Etablissement;
        import com.ird.faa.bean.config.EtatEtapeCampagne;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.dao.formulaire.ResponsabilitePedagogiqueMasterDao;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueMasterAdminService;
        import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
        import com.ird.faa.service.admin.facade.referentiel.MasterAdminService;
        import com.ird.faa.service.admin.facade.referentiel.StatutMasterAdminService;
        import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueMasterVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ResponsabilitePedagogiqueMasterAdminServiceImpl extends AbstractServiceImpl<ResponsabilitePedagogiqueMaster> implements ResponsabilitePedagogiqueMasterAdminService {

@Autowired
private ResponsabilitePedagogiqueMasterDao responsabilitePedagogiqueMasterDao;

        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private MasterAdminService masterService ;
        @Autowired
        private StatutMasterAdminService statutMasterService ;
        @Autowired
        private EtablissementAdminService etablissementService ;
        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ResponsabilitePedagogiqueMaster> findAll(){
return responsabilitePedagogiqueMasterDao.findAll();
}

        @Override
        public List<ResponsabilitePedagogiqueMaster> findByStatutMasterCode(String code){
        return responsabilitePedagogiqueMasterDao.findByStatutMasterCode(code);
        }

        @Override
        @Transactional
        public int deleteByStatutMasterCode(String code){
        return responsabilitePedagogiqueMasterDao.deleteByStatutMasterCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueMaster> findByStatutMasterId(Long id){
        return responsabilitePedagogiqueMasterDao.findByStatutMasterId(id);
        }

        @Override
        @Transactional
        public int deleteByStatutMasterId(Long id){
        return responsabilitePedagogiqueMasterDao.deleteByStatutMasterId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueMaster> findByMasterCode(String code){
        return responsabilitePedagogiqueMasterDao.findByMasterCode(code);
        }

        @Override
        @Transactional
        public int deleteByMasterCode(String code){
        return responsabilitePedagogiqueMasterDao.deleteByMasterCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueMaster> findByMasterId(Long id){
        return responsabilitePedagogiqueMasterDao.findByMasterId(id);
        }

        @Override
        @Transactional
        public int deleteByMasterId(Long id){
        return responsabilitePedagogiqueMasterDao.deleteByMasterId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueMaster> findByEtablissementCode(String code){
        return responsabilitePedagogiqueMasterDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return responsabilitePedagogiqueMasterDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueMaster> findByEtablissementId(Long id){
        return responsabilitePedagogiqueMasterDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return responsabilitePedagogiqueMasterDao.deleteByEtablissementId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueMaster> findByEtatEtapeCampagneCode(String code){
        return responsabilitePedagogiqueMasterDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return responsabilitePedagogiqueMasterDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueMaster> findByEtatEtapeCampagneId(Long id){
        return responsabilitePedagogiqueMasterDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return responsabilitePedagogiqueMasterDao.deleteByEtatEtapeCampagneId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueMaster> findByChercheurNumeroMatricule(String numeroMatricule){
        return responsabilitePedagogiqueMasterDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return responsabilitePedagogiqueMasterDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<ResponsabilitePedagogiqueMaster> findByChercheurId(Long id){
        return responsabilitePedagogiqueMasterDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return responsabilitePedagogiqueMasterDao.deleteByChercheurId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueMaster> findByCampagneCode(String code){
        return responsabilitePedagogiqueMasterDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return responsabilitePedagogiqueMasterDao.deleteByCampagneCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueMaster> findByCampagneId(Long id){
        return responsabilitePedagogiqueMasterDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return responsabilitePedagogiqueMasterDao.deleteByCampagneId(id);
        }

    @Override
    public ResponsabilitePedagogiqueMaster findByAnnee(Integer annee){
    if( annee==null) return null;
    return responsabilitePedagogiqueMasterDao.findByAnnee(annee);
    }

    @Override
    @Transactional
    public int deleteByAnnee(Integer  annee) {
    return responsabilitePedagogiqueMasterDao.deleteByAnnee(annee);
    }
    @Override
    public ResponsabilitePedagogiqueMaster findByIdOrAnnee(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
    ResponsabilitePedagogiqueMaster resultat=null;
    if(responsabilitePedagogiqueMaster == null || ( responsabilitePedagogiqueMaster.getAnnee()==null && responsabilitePedagogiqueMaster.getId()==null))
    return resultat;
    else{
    if(responsabilitePedagogiqueMaster.getId() != null){
    resultat= responsabilitePedagogiqueMasterDao.findById(responsabilitePedagogiqueMaster.getId()).get();
    }else if(StringUtil.isNotEmpty(responsabilitePedagogiqueMaster.getAnnee())) {
    resultat= responsabilitePedagogiqueMasterDao.findByAnnee(responsabilitePedagogiqueMaster.getAnnee());
    }
    return resultat;
    }
    }

@Override
public ResponsabilitePedagogiqueMaster findById(Long id){
if(id==null) return null;
return responsabilitePedagogiqueMasterDao.getOne(id);
}

@Override
public ResponsabilitePedagogiqueMaster findByIdWithAssociatedList(Long id){
ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster  = findById(id);
return responsabilitePedagogiqueMaster;
}


@Transactional
public int deleteById(Long id){
if(responsabilitePedagogiqueMasterDao.findById(id) == null) return 0;
else{
responsabilitePedagogiqueMasterDao.deleteById(id);
return 1;
}
}


@Override
public ResponsabilitePedagogiqueMaster update(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
ResponsabilitePedagogiqueMaster foundedResponsabilitePedagogiqueMaster = findById(responsabilitePedagogiqueMaster.getId());
if(foundedResponsabilitePedagogiqueMaster==null) return null;
else{
return  responsabilitePedagogiqueMasterDao.save(responsabilitePedagogiqueMaster);
}
}

@Override
public ResponsabilitePedagogiqueMaster save (ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
    ResponsabilitePedagogiqueMaster foundedResponsabilitePedagogiqueMaster = findByAnnee(responsabilitePedagogiqueMaster.getAnnee());
   if(foundedResponsabilitePedagogiqueMaster!=null) return null;


    findStatutMaster(responsabilitePedagogiqueMaster);
    findMaster(responsabilitePedagogiqueMaster);
    findEtablissement(responsabilitePedagogiqueMaster);
    findEtatEtapeCampagne(responsabilitePedagogiqueMaster);
    findChercheur(responsabilitePedagogiqueMaster);
    findCampagne(responsabilitePedagogiqueMaster);

ResponsabilitePedagogiqueMaster savedResponsabilitePedagogiqueMaster = responsabilitePedagogiqueMasterDao.save(responsabilitePedagogiqueMaster);
return savedResponsabilitePedagogiqueMaster;
}

@Override
public List<ResponsabilitePedagogiqueMaster> save(List<ResponsabilitePedagogiqueMaster> responsabilitePedagogiqueMasters){
List<ResponsabilitePedagogiqueMaster> list = new ArrayList<ResponsabilitePedagogiqueMaster>();
for(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster: responsabilitePedagogiqueMasters){
list.add(save(responsabilitePedagogiqueMaster));
}
return list;
}



@Override
@Transactional
public int delete(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
    if(responsabilitePedagogiqueMaster.getAnnee()==null) return -1;

    ResponsabilitePedagogiqueMaster foundedResponsabilitePedagogiqueMaster = findByAnnee(responsabilitePedagogiqueMaster.getAnnee());
    if(foundedResponsabilitePedagogiqueMaster==null) return -1;
responsabilitePedagogiqueMasterDao.delete(foundedResponsabilitePedagogiqueMaster);
return 1;
}


public List<ResponsabilitePedagogiqueMaster> findByCriteria(ResponsabilitePedagogiqueMasterVo responsabilitePedagogiqueMasterVo){

String query = "SELECT o FROM ResponsabilitePedagogiqueMaster o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",responsabilitePedagogiqueMasterVo.getId());
            query += SearchUtil.addConstraint( "o", "annee","=",responsabilitePedagogiqueMasterVo.getAnnee());
            query += SearchUtil.addConstraint( "o", "tempsEstimePourCetteAnnne","=",responsabilitePedagogiqueMasterVo.getTempsEstimePourCetteAnnne());
            query += SearchUtil.addConstraint( "o", "appelServiceRenforcementCapaciteSud","=",responsabilitePedagogiqueMasterVo.getAppelServiceRenforcementCapaciteSud());
            query += SearchUtil.addConstraint( "o", "masterInternational","=",responsabilitePedagogiqueMasterVo.getMasterInternational());
            query += SearchUtil.addConstraintMinMax("o","annee",responsabilitePedagogiqueMasterVo.getAnneeMin(),responsabilitePedagogiqueMasterVo.getAnneeMax());
            query += SearchUtil.addConstraintMinMax("o","tempsEstimePourCetteAnnne",responsabilitePedagogiqueMasterVo.getTempsEstimePourCetteAnnneMin(),responsabilitePedagogiqueMasterVo.getTempsEstimePourCetteAnnneMax());
    if(responsabilitePedagogiqueMasterVo.getStatutMasterVo()!=null){
        query += SearchUtil.addConstraint( "o", "statutMaster.id","=",responsabilitePedagogiqueMasterVo.getStatutMasterVo().getId());
            query += SearchUtil.addConstraint( "o", "statutMaster.code","LIKE",responsabilitePedagogiqueMasterVo.getStatutMasterVo().getCode());
    }

    if(responsabilitePedagogiqueMasterVo.getMasterVo()!=null){
        query += SearchUtil.addConstraint( "o", "master.id","=",responsabilitePedagogiqueMasterVo.getMasterVo().getId());
            query += SearchUtil.addConstraint( "o", "master.code","LIKE",responsabilitePedagogiqueMasterVo.getMasterVo().getCode());
    }

    if(responsabilitePedagogiqueMasterVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",responsabilitePedagogiqueMasterVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",responsabilitePedagogiqueMasterVo.getEtablissementVo().getCode());
    }

    if(responsabilitePedagogiqueMasterVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",responsabilitePedagogiqueMasterVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",responsabilitePedagogiqueMasterVo.getEtatEtapeCampagneVo().getCode());
    }

    if(responsabilitePedagogiqueMasterVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",responsabilitePedagogiqueMasterVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",responsabilitePedagogiqueMasterVo.getChercheurVo().getNumeroMatricule());
    }

    if(responsabilitePedagogiqueMasterVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",responsabilitePedagogiqueMasterVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",responsabilitePedagogiqueMasterVo.getCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findStatutMaster(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
        StatutMaster loadedStatutMaster =statutMasterService.findByIdOrCode(responsabilitePedagogiqueMaster.getStatutMaster());

    if(loadedStatutMaster==null ) {
        return;
    }
    responsabilitePedagogiqueMaster.setStatutMaster(loadedStatutMaster);
    }
    private void findMaster(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
        Master loadedMaster =masterService.findByIdOrCode(responsabilitePedagogiqueMaster.getMaster());

    if(loadedMaster==null ) {
        return;
    }
    responsabilitePedagogiqueMaster.setMaster(loadedMaster);
    }
    private void findEtablissement(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(responsabilitePedagogiqueMaster.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    responsabilitePedagogiqueMaster.setEtablissement(loadedEtablissement);
    }
    private void findEtatEtapeCampagne(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(responsabilitePedagogiqueMaster.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    responsabilitePedagogiqueMaster.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }
    private void findChercheur(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(responsabilitePedagogiqueMaster.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    responsabilitePedagogiqueMaster.setChercheur(loadedChercheur);
    }
    private void findCampagne(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster){
        Campagne loadedCampagne =campagneService.findByIdOrCode(responsabilitePedagogiqueMaster.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    responsabilitePedagogiqueMaster.setCampagne(loadedCampagne);
    }

@Override
@Transactional
public void delete(List<ResponsabilitePedagogiqueMaster> responsabilitePedagogiqueMasters){
        if(ListUtil.isNotEmpty(responsabilitePedagogiqueMasters)){
        responsabilitePedagogiqueMasters.forEach(e->responsabilitePedagogiqueMasterDao.delete(e));
        }
}
@Override
public void update(List<ResponsabilitePedagogiqueMaster> responsabilitePedagogiqueMasters){
if(ListUtil.isNotEmpty(responsabilitePedagogiqueMasters)){
responsabilitePedagogiqueMasters.forEach(e->responsabilitePedagogiqueMasterDao.save(e));
}
}



@Override
public List<List<ResponsabilitePedagogiqueMaster>>  getToBeSavedAndToBeDeleted(List<ResponsabilitePedagogiqueMaster> oldList,List<ResponsabilitePedagogiqueMaster> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
