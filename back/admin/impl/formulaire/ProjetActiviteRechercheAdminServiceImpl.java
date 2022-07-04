package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ProjetActiviteRecherche;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.dao.formulaire.ProjetActiviteRechercheDao;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheVo;
import com.ird.faa.service.util.*;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetail;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ProjetActiviteRechercheAdminServiceImpl extends AbstractServiceImpl<ProjetActiviteRecherche> implements ProjetActiviteRechercheAdminService {

@Autowired
private ProjetActiviteRechercheDao projetActiviteRechercheDao;

        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private ProjetActiviteRechercheDetailAdminService projetActiviteRechercheDetailService ;
        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ProjetActiviteRecherche> findAll(){
return projetActiviteRechercheDao.findAll();
}

        @Override
        public List<ProjetActiviteRecherche> findByEtatEtapeCampagneCode(String code){
        return projetActiviteRechercheDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return projetActiviteRechercheDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<ProjetActiviteRecherche> findByEtatEtapeCampagneId(Long id){
        return projetActiviteRechercheDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return projetActiviteRechercheDao.deleteByEtatEtapeCampagneId(id);
        }


        @Override
        public List<ProjetActiviteRecherche> findByChercheurNumeroMatricule(String numeroMatricule){
        return projetActiviteRechercheDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return projetActiviteRechercheDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<ProjetActiviteRecherche> findByChercheurId(Long id){
        return projetActiviteRechercheDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return projetActiviteRechercheDao.deleteByChercheurId(id);
        }


        @Override
        public List<ProjetActiviteRecherche> findByCampagneCode(String code){
        return projetActiviteRechercheDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return projetActiviteRechercheDao.deleteByCampagneCode(code);
        }

        @Override
        public List<ProjetActiviteRecherche> findByCampagneId(Long id){
        return projetActiviteRechercheDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return projetActiviteRechercheDao.deleteByCampagneId(id);
        }


@Override
public ProjetActiviteRecherche findById(Long id){
if(id==null) return null;
return projetActiviteRechercheDao.getOne(id);
}

@Override
public ProjetActiviteRecherche findByIdWithAssociatedList(Long id){
ProjetActiviteRecherche projetActiviteRecherche  = findById(id);
    findAssociatedLists(projetActiviteRecherche);
return projetActiviteRecherche;
}
private void findAssociatedLists(ProjetActiviteRecherche projetActiviteRecherche){
if(projetActiviteRecherche==null || projetActiviteRecherche.getId()==null) return ;
else{
        List<ProjetActiviteRechercheDetail> projetActiviteRechercheDetails = projetActiviteRechercheDetailService.findByProjetActiviteRechercheId(projetActiviteRecherche.getId());
        projetActiviteRecherche.setProjetActiviteRechercheDetails(projetActiviteRechercheDetails);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        projetActiviteRechercheDetailService.deleteByProjetActiviteRechercheId(id);
}
}

    private void updateAssociatedLists(ProjetActiviteRecherche projetActiviteRecherche){
    if(projetActiviteRecherche==null || projetActiviteRecherche.getId()==null) return ;
    else{
            List<List<ProjetActiviteRechercheDetail>> resultProjetActiviteRechercheDetails= projetActiviteRechercheDetailService.getToBeSavedAndToBeDeleted(projetActiviteRechercheDetailService.findByProjetActiviteRechercheId(projetActiviteRecherche.getId()),projetActiviteRecherche.getProjetActiviteRechercheDetails());
            projetActiviteRechercheDetailService.delete(resultProjetActiviteRechercheDetails.get(1));
            associateProjetActiviteRechercheDetail(projetActiviteRecherche,resultProjetActiviteRechercheDetails.get(0));
            projetActiviteRechercheDetailService.update(resultProjetActiviteRechercheDetails.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(projetActiviteRechercheDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
projetActiviteRechercheDao.deleteById(id);
return 1;
}
}


@Override
public ProjetActiviteRecherche update(ProjetActiviteRecherche projetActiviteRecherche){
ProjetActiviteRecherche foundedProjetActiviteRecherche = findById(projetActiviteRecherche.getId());
if(foundedProjetActiviteRecherche==null) return null;
else{
    updateAssociatedLists(projetActiviteRecherche);
return  projetActiviteRechercheDao.save(projetActiviteRecherche);
}
}

@Override
public ProjetActiviteRecherche save (ProjetActiviteRecherche projetActiviteRecherche){


    findEtatEtapeCampagne(projetActiviteRecherche);
    findChercheur(projetActiviteRecherche);
    findCampagne(projetActiviteRecherche);

ProjetActiviteRecherche savedProjetActiviteRecherche = projetActiviteRechercheDao.save(projetActiviteRecherche);
       saveProjetActiviteRechercheDetails(savedProjetActiviteRecherche,projetActiviteRecherche.getProjetActiviteRechercheDetails());
return savedProjetActiviteRecherche;
}

@Override
public List<ProjetActiviteRecherche> save(List<ProjetActiviteRecherche> projetActiviteRecherches){
List<ProjetActiviteRecherche> list = new ArrayList<ProjetActiviteRecherche>();
for(ProjetActiviteRecherche projetActiviteRecherche: projetActiviteRecherches){
list.add(save(projetActiviteRecherche));
}
return list;
}



@Override
@Transactional
public int delete(ProjetActiviteRecherche projetActiviteRecherche){
    if(projetActiviteRecherche.getId()==null) return -1;
    ProjetActiviteRecherche foundedProjetActiviteRecherche = findById(projetActiviteRecherche.getId());
    if(foundedProjetActiviteRecherche==null) return -1;
projetActiviteRechercheDao.delete(foundedProjetActiviteRecherche);
return 1;
}


public List<ProjetActiviteRecherche> findByCriteria(ProjetActiviteRechercheVo projetActiviteRechercheVo){

String query = "SELECT o FROM ProjetActiviteRecherche o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",projetActiviteRechercheVo.getId());
            query += SearchUtil.addConstraint( "o", "tempsEstimePourCetteAnnne","=",projetActiviteRechercheVo.getTempsEstimePourCetteAnnne());
            query += SearchUtil.addConstraint( "o", "annee","=",projetActiviteRechercheVo.getAnnee());
            query += SearchUtil.addConstraintMinMax("o","tempsEstimePourCetteAnnne",projetActiviteRechercheVo.getTempsEstimePourCetteAnnneMin(),projetActiviteRechercheVo.getTempsEstimePourCetteAnnneMax());
            query += SearchUtil.addConstraintMinMax("o","annee",projetActiviteRechercheVo.getAnneeMin(),projetActiviteRechercheVo.getAnneeMax());
    if(projetActiviteRechercheVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",projetActiviteRechercheVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",projetActiviteRechercheVo.getEtatEtapeCampagneVo().getCode());
    }

    if(projetActiviteRechercheVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",projetActiviteRechercheVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",projetActiviteRechercheVo.getChercheurVo().getNumeroMatricule());
    }

    if(projetActiviteRechercheVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",projetActiviteRechercheVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",projetActiviteRechercheVo.getCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveProjetActiviteRechercheDetails(ProjetActiviteRecherche projetActiviteRecherche,List<ProjetActiviteRechercheDetail> projetActiviteRechercheDetails){

        if (ListUtil.isNotEmpty(projetActiviteRecherche.getProjetActiviteRechercheDetails())) {
        List<ProjetActiviteRechercheDetail> savedProjetActiviteRechercheDetails = new ArrayList<>();
        projetActiviteRechercheDetails.forEach(element -> {
        element.setProjetActiviteRecherche(projetActiviteRecherche);
        projetActiviteRechercheDetailService.save(element);
        });
        projetActiviteRecherche.setProjetActiviteRechercheDetails(savedProjetActiviteRechercheDetails);
        }
        }

    private void findEtatEtapeCampagne(ProjetActiviteRecherche projetActiviteRecherche){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(projetActiviteRecherche.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    projetActiviteRecherche.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }
    private void findChercheur(ProjetActiviteRecherche projetActiviteRecherche){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(projetActiviteRecherche.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    projetActiviteRecherche.setChercheur(loadedChercheur);
    }
    private void findCampagne(ProjetActiviteRecherche projetActiviteRecherche){
        Campagne loadedCampagne =campagneService.findByIdOrCode(projetActiviteRecherche.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    projetActiviteRecherche.setCampagne(loadedCampagne);
    }

@Override
@Transactional
public void delete(List<ProjetActiviteRecherche> projetActiviteRecherches){
        if(ListUtil.isNotEmpty(projetActiviteRecherches)){
        projetActiviteRecherches.forEach(e->projetActiviteRechercheDao.delete(e));
        }
}
@Override
public void update(List<ProjetActiviteRecherche> projetActiviteRecherches){
if(ListUtil.isNotEmpty(projetActiviteRecherches)){
projetActiviteRecherches.forEach(e->projetActiviteRechercheDao.save(e));
}
}

private void associateProjetActiviteRechercheDetail(ProjetActiviteRecherche projetActiviteRecherche, List<ProjetActiviteRechercheDetail> projetActiviteRechercheDetail) {
    if (ListUtil.isNotEmpty(projetActiviteRechercheDetail)) {
        projetActiviteRechercheDetail.forEach(e -> e.setProjetActiviteRecherche(projetActiviteRecherche));
    }
    }


@Override
public List<List<ProjetActiviteRecherche>>  getToBeSavedAndToBeDeleted(List<ProjetActiviteRecherche> oldList,List<ProjetActiviteRecherche> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
