package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueEcoleDoctorale;
        import com.ird.faa.bean.referentiel.StatutEcoleDoctorale;
        import com.ird.faa.bean.formulaire.EcoleDoctorale;
        import com.ird.faa.bean.referentiel.Etablissement;
        import com.ird.faa.bean.config.EtatEtapeCampagne;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.dao.formulaire.ResponsabilitePedagogiqueEcoleDoctoraleDao;
import com.ird.faa.service.admin.facade.formulaire.ResponsabilitePedagogiqueEcoleDoctoraleAdminService;
        import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.EcoleDoctoraleAdminService;
        import com.ird.faa.service.admin.facade.referentiel.StatutEcoleDoctoraleAdminService;
        import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueEcoleDoctoraleVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ResponsabilitePedagogiqueEcoleDoctoraleAdminServiceImpl extends AbstractServiceImpl<ResponsabilitePedagogiqueEcoleDoctorale> implements ResponsabilitePedagogiqueEcoleDoctoraleAdminService {

@Autowired
private ResponsabilitePedagogiqueEcoleDoctoraleDao responsabilitePedagogiqueEcoleDoctoraleDao;

        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private EcoleDoctoraleAdminService ecoleDoctoraleService ;
        @Autowired
        private StatutEcoleDoctoraleAdminService statutEcoleDoctoraleService ;
        @Autowired
        private EtablissementAdminService etablissementService ;
        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ResponsabilitePedagogiqueEcoleDoctorale> findAll(){
return responsabilitePedagogiqueEcoleDoctoraleDao.findAll();
}

        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByStatutEcoleDoctoraleCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByStatutEcoleDoctoraleCode(code);
        }

        @Override
        @Transactional
        public int deleteByStatutEcoleDoctoraleCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByStatutEcoleDoctoraleCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByStatutEcoleDoctoraleId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByStatutEcoleDoctoraleId(id);
        }

        @Override
        @Transactional
        public int deleteByStatutEcoleDoctoraleId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByStatutEcoleDoctoraleId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByEcoleDoctoraleIntitule(String intitule){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByEcoleDoctoraleIntitule(intitule);
        }

        @Override
        @Transactional
        public int deleteByEcoleDoctoraleIntitule(String intitule){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByEcoleDoctoraleIntitule(intitule);
        }

        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByEcoleDoctoraleId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByEcoleDoctoraleId(id);
        }

        @Override
        @Transactional
        public int deleteByEcoleDoctoraleId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByEcoleDoctoraleId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtablissementCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtablissementId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByEtablissementId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtatEtapeCampagneCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByEtatEtapeCampagneId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByEtatEtapeCampagneId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByChercheurNumeroMatricule(String numeroMatricule){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByChercheurId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByChercheurId(id);
        }


        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByCampagneCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByCampagneCode(code);
        }

        @Override
        public List<ResponsabilitePedagogiqueEcoleDoctorale> findByCampagneId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByCampagneId(id);
        }

    @Override
    public ResponsabilitePedagogiqueEcoleDoctorale findByAnnee(Integer annee){
    if( annee==null) return null;
    return responsabilitePedagogiqueEcoleDoctoraleDao.findByAnnee(annee);
    }

    @Override
    @Transactional
    public int deleteByAnnee(Integer  annee) {
    return responsabilitePedagogiqueEcoleDoctoraleDao.deleteByAnnee(annee);
    }
    @Override
    public ResponsabilitePedagogiqueEcoleDoctorale findByIdOrAnnee(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
    ResponsabilitePedagogiqueEcoleDoctorale resultat=null;
    if(responsabilitePedagogiqueEcoleDoctorale == null || ( responsabilitePedagogiqueEcoleDoctorale.getAnnee()==null && responsabilitePedagogiqueEcoleDoctorale.getId()==null))
    return resultat;
    else{
    if(responsabilitePedagogiqueEcoleDoctorale.getId() != null){
    resultat= responsabilitePedagogiqueEcoleDoctoraleDao.findById(responsabilitePedagogiqueEcoleDoctorale.getId()).get();
    }else if(StringUtil.isNotEmpty(responsabilitePedagogiqueEcoleDoctorale.getAnnee())) {
    resultat= responsabilitePedagogiqueEcoleDoctoraleDao.findByAnnee(responsabilitePedagogiqueEcoleDoctorale.getAnnee());
    }
    return resultat;
    }
    }

@Override
public ResponsabilitePedagogiqueEcoleDoctorale findById(Long id){
if(id==null) return null;
return responsabilitePedagogiqueEcoleDoctoraleDao.getOne(id);
}

@Override
public ResponsabilitePedagogiqueEcoleDoctorale findByIdWithAssociatedList(Long id){
ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale  = findById(id);
return responsabilitePedagogiqueEcoleDoctorale;
}


@Transactional
public int deleteById(Long id){
if(responsabilitePedagogiqueEcoleDoctoraleDao.findById(id) == null) return 0;
else{
responsabilitePedagogiqueEcoleDoctoraleDao.deleteById(id);
return 1;
}
}


@Override
public ResponsabilitePedagogiqueEcoleDoctorale update(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
ResponsabilitePedagogiqueEcoleDoctorale foundedResponsabilitePedagogiqueEcoleDoctorale = findById(responsabilitePedagogiqueEcoleDoctorale.getId());
if(foundedResponsabilitePedagogiqueEcoleDoctorale==null) return null;
else{
return  responsabilitePedagogiqueEcoleDoctoraleDao.save(responsabilitePedagogiqueEcoleDoctorale);
}
}

@Override
public ResponsabilitePedagogiqueEcoleDoctorale save (ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
    ResponsabilitePedagogiqueEcoleDoctorale foundedResponsabilitePedagogiqueEcoleDoctorale = findByAnnee(responsabilitePedagogiqueEcoleDoctorale.getAnnee());
   if(foundedResponsabilitePedagogiqueEcoleDoctorale!=null) return null;


    findStatutEcoleDoctorale(responsabilitePedagogiqueEcoleDoctorale);
    findEcoleDoctorale(responsabilitePedagogiqueEcoleDoctorale);
    findEtablissement(responsabilitePedagogiqueEcoleDoctorale);
    findEtatEtapeCampagne(responsabilitePedagogiqueEcoleDoctorale);
    findChercheur(responsabilitePedagogiqueEcoleDoctorale);
    findCampagne(responsabilitePedagogiqueEcoleDoctorale);

ResponsabilitePedagogiqueEcoleDoctorale savedResponsabilitePedagogiqueEcoleDoctorale = responsabilitePedagogiqueEcoleDoctoraleDao.save(responsabilitePedagogiqueEcoleDoctorale);
return savedResponsabilitePedagogiqueEcoleDoctorale;
}

@Override
public List<ResponsabilitePedagogiqueEcoleDoctorale> save(List<ResponsabilitePedagogiqueEcoleDoctorale> responsabilitePedagogiqueEcoleDoctorales){
List<ResponsabilitePedagogiqueEcoleDoctorale> list = new ArrayList<ResponsabilitePedagogiqueEcoleDoctorale>();
for(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale: responsabilitePedagogiqueEcoleDoctorales){
list.add(save(responsabilitePedagogiqueEcoleDoctorale));
}
return list;
}



@Override
@Transactional
public int delete(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
    if(responsabilitePedagogiqueEcoleDoctorale.getAnnee()==null) return -1;

    ResponsabilitePedagogiqueEcoleDoctorale foundedResponsabilitePedagogiqueEcoleDoctorale = findByAnnee(responsabilitePedagogiqueEcoleDoctorale.getAnnee());
    if(foundedResponsabilitePedagogiqueEcoleDoctorale==null) return -1;
responsabilitePedagogiqueEcoleDoctoraleDao.delete(foundedResponsabilitePedagogiqueEcoleDoctorale);
return 1;
}


public List<ResponsabilitePedagogiqueEcoleDoctorale> findByCriteria(ResponsabilitePedagogiqueEcoleDoctoraleVo responsabilitePedagogiqueEcoleDoctoraleVo){

String query = "SELECT o FROM ResponsabilitePedagogiqueEcoleDoctorale o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",responsabilitePedagogiqueEcoleDoctoraleVo.getId());
            query += SearchUtil.addConstraint( "o", "annee","=",responsabilitePedagogiqueEcoleDoctoraleVo.getAnnee());
            query += SearchUtil.addConstraint( "o", "tempsEstimePourCetteAnnne","=",responsabilitePedagogiqueEcoleDoctoraleVo.getTempsEstimePourCetteAnnne());
            query += SearchUtil.addConstraint( "o", "appelServiceRenforcementCapaciteSud","=",responsabilitePedagogiqueEcoleDoctoraleVo.getAppelServiceRenforcementCapaciteSud());
            query += SearchUtil.addConstraint( "o", "ecoleDoctoraleInternational","=",responsabilitePedagogiqueEcoleDoctoraleVo.getEcoleDoctoraleInternational());
            query += SearchUtil.addConstraintMinMax("o","annee",responsabilitePedagogiqueEcoleDoctoraleVo.getAnneeMin(),responsabilitePedagogiqueEcoleDoctoraleVo.getAnneeMax());
            query += SearchUtil.addConstraintMinMax("o","tempsEstimePourCetteAnnne",responsabilitePedagogiqueEcoleDoctoraleVo.getTempsEstimePourCetteAnnneMin(),responsabilitePedagogiqueEcoleDoctoraleVo.getTempsEstimePourCetteAnnneMax());
    if(responsabilitePedagogiqueEcoleDoctoraleVo.getStatutEcoleDoctoraleVo()!=null){
        query += SearchUtil.addConstraint( "o", "statutEcoleDoctorale.id","=",responsabilitePedagogiqueEcoleDoctoraleVo.getStatutEcoleDoctoraleVo().getId());
            query += SearchUtil.addConstraint( "o", "statutEcoleDoctorale.code","LIKE",responsabilitePedagogiqueEcoleDoctoraleVo.getStatutEcoleDoctoraleVo().getCode());
    }

    if(responsabilitePedagogiqueEcoleDoctoraleVo.getEcoleDoctoraleVo()!=null){
        query += SearchUtil.addConstraint( "o", "ecoleDoctorale.id","=",responsabilitePedagogiqueEcoleDoctoraleVo.getEcoleDoctoraleVo().getId());
            query += SearchUtil.addConstraint( "o", "ecoleDoctorale.intitule","LIKE",responsabilitePedagogiqueEcoleDoctoraleVo.getEcoleDoctoraleVo().getIntitule());
    }

    if(responsabilitePedagogiqueEcoleDoctoraleVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",responsabilitePedagogiqueEcoleDoctoraleVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",responsabilitePedagogiqueEcoleDoctoraleVo.getEtablissementVo().getCode());
    }

    if(responsabilitePedagogiqueEcoleDoctoraleVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",responsabilitePedagogiqueEcoleDoctoraleVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",responsabilitePedagogiqueEcoleDoctoraleVo.getEtatEtapeCampagneVo().getCode());
    }

    if(responsabilitePedagogiqueEcoleDoctoraleVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",responsabilitePedagogiqueEcoleDoctoraleVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",responsabilitePedagogiqueEcoleDoctoraleVo.getChercheurVo().getNumeroMatricule());
    }

    if(responsabilitePedagogiqueEcoleDoctoraleVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",responsabilitePedagogiqueEcoleDoctoraleVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",responsabilitePedagogiqueEcoleDoctoraleVo.getCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findStatutEcoleDoctorale(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
        StatutEcoleDoctorale loadedStatutEcoleDoctorale =statutEcoleDoctoraleService.findByIdOrCode(responsabilitePedagogiqueEcoleDoctorale.getStatutEcoleDoctorale());

    if(loadedStatutEcoleDoctorale==null ) {
        return;
    }
    responsabilitePedagogiqueEcoleDoctorale.setStatutEcoleDoctorale(loadedStatutEcoleDoctorale);
    }
    private void findEcoleDoctorale(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
        EcoleDoctorale loadedEcoleDoctorale =ecoleDoctoraleService.findByIdOrIntitule(responsabilitePedagogiqueEcoleDoctorale.getEcoleDoctorale());

    if(loadedEcoleDoctorale==null ) {
        return;
    }
    responsabilitePedagogiqueEcoleDoctorale.setEcoleDoctorale(loadedEcoleDoctorale);
    }
    private void findEtablissement(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(responsabilitePedagogiqueEcoleDoctorale.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    responsabilitePedagogiqueEcoleDoctorale.setEtablissement(loadedEtablissement);
    }
    private void findEtatEtapeCampagne(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(responsabilitePedagogiqueEcoleDoctorale.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    responsabilitePedagogiqueEcoleDoctorale.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }
    private void findChercheur(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(responsabilitePedagogiqueEcoleDoctorale.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    responsabilitePedagogiqueEcoleDoctorale.setChercheur(loadedChercheur);
    }
    private void findCampagne(ResponsabilitePedagogiqueEcoleDoctorale responsabilitePedagogiqueEcoleDoctorale){
        Campagne loadedCampagne =campagneService.findByIdOrCode(responsabilitePedagogiqueEcoleDoctorale.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    responsabilitePedagogiqueEcoleDoctorale.setCampagne(loadedCampagne);
    }

@Override
@Transactional
public void delete(List<ResponsabilitePedagogiqueEcoleDoctorale> responsabilitePedagogiqueEcoleDoctorales){
        if(ListUtil.isNotEmpty(responsabilitePedagogiqueEcoleDoctorales)){
        responsabilitePedagogiqueEcoleDoctorales.forEach(e->responsabilitePedagogiqueEcoleDoctoraleDao.delete(e));
        }
}
@Override
public void update(List<ResponsabilitePedagogiqueEcoleDoctorale> responsabilitePedagogiqueEcoleDoctorales){
if(ListUtil.isNotEmpty(responsabilitePedagogiqueEcoleDoctorales)){
responsabilitePedagogiqueEcoleDoctorales.forEach(e->responsabilitePedagogiqueEcoleDoctoraleDao.save(e));
}
}



@Override
public List<List<ResponsabilitePedagogiqueEcoleDoctorale>>  getToBeSavedAndToBeDeleted(List<ResponsabilitePedagogiqueEcoleDoctorale> oldList,List<ResponsabilitePedagogiqueEcoleDoctorale> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
