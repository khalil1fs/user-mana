package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.Encadrement;
import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.dao.formulaire.EncadrementDao;
import com.ird.faa.service.admin.facade.formulaire.EncadrementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementVo;
import com.ird.faa.service.util.*;
import com.ird.faa.bean.formulaire.EncadrementEtudiant;
import com.ird.faa.bean.formulaire.EncadrementDoctorant;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EncadrementAdminServiceImpl extends AbstractServiceImpl<Encadrement> implements EncadrementAdminService {

@Autowired
private EncadrementDao encadrementDao;

        @Autowired
        private EncadrementEtudiantAdminService encadrementEtudiantService ;
        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private EncadrementDoctorantAdminService encadrementDoctorantService ;
        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<Encadrement> findAll(){
return encadrementDao.findAll();
}

        @Override
        public List<Encadrement> findByCampagneCode(String code){
        return encadrementDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return encadrementDao.deleteByCampagneCode(code);
        }

        @Override
        public List<Encadrement> findByCampagneId(Long id){
        return encadrementDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return encadrementDao.deleteByCampagneId(id);
        }


        @Override
        public List<Encadrement> findByChercheurNumeroMatricule(String numeroMatricule){
        return encadrementDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return encadrementDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<Encadrement> findByChercheurId(Long id){
        return encadrementDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return encadrementDao.deleteByChercheurId(id);
        }


        @Override
        public List<Encadrement> findByEtatEtapeCampagneCode(String code){
        return encadrementDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return encadrementDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<Encadrement> findByEtatEtapeCampagneId(Long id){
        return encadrementDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return encadrementDao.deleteByEtatEtapeCampagneId(id);
        }


@Override
public Encadrement findById(Long id){
if(id==null) return null;
return encadrementDao.getOne(id);
}

@Override
public Encadrement findByIdWithAssociatedList(Long id){
Encadrement encadrement  = findById(id);
    findAssociatedLists(encadrement);
return encadrement;
}
private void findAssociatedLists(Encadrement encadrement){
if(encadrement==null || encadrement.getId()==null) return ;
else{
        List<EncadrementEtudiant> encadrementEtudiants = encadrementEtudiantService.findByEncadrementId(encadrement.getId());
        encadrement.setEncadrementEtudiants(encadrementEtudiants);
        List<EncadrementDoctorant> encadrementDoctorants = encadrementDoctorantService.findByEncadrementId(encadrement.getId());
        encadrement.setEncadrementDoctorants(encadrementDoctorants);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        encadrementEtudiantService.deleteByEncadrementId(id);
        encadrementDoctorantService.deleteByEncadrementId(id);
}
}

    private void updateAssociatedLists(Encadrement encadrement){
    if(encadrement==null || encadrement.getId()==null) return ;
    else{
            List<List<EncadrementEtudiant>> resultEncadrementEtudiants= encadrementEtudiantService.getToBeSavedAndToBeDeleted(encadrementEtudiantService.findByEncadrementId(encadrement.getId()),encadrement.getEncadrementEtudiants());
            encadrementEtudiantService.delete(resultEncadrementEtudiants.get(1));
            associateEncadrementEtudiant(encadrement,resultEncadrementEtudiants.get(0));
            encadrementEtudiantService.update(resultEncadrementEtudiants.get(0));

            List<List<EncadrementDoctorant>> resultEncadrementDoctorants= encadrementDoctorantService.getToBeSavedAndToBeDeleted(encadrementDoctorantService.findByEncadrementId(encadrement.getId()),encadrement.getEncadrementDoctorants());
            encadrementDoctorantService.delete(resultEncadrementDoctorants.get(1));
            associateEncadrementDoctorant(encadrement,resultEncadrementDoctorants.get(0));
            encadrementDoctorantService.update(resultEncadrementDoctorants.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(encadrementDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
encadrementDao.deleteById(id);
return 1;
}
}


@Override
public Encadrement update(Encadrement encadrement){
Encadrement foundedEncadrement = findById(encadrement.getId());
if(foundedEncadrement==null) return null;
else{
    updateAssociatedLists(encadrement);
return  encadrementDao.save(encadrement);
}
}

@Override
public Encadrement save (Encadrement encadrement){


    findCampagne(encadrement);
    findChercheur(encadrement);
    findEtatEtapeCampagne(encadrement);

Encadrement savedEncadrement = encadrementDao.save(encadrement);
       saveEncadrementEtudiants(savedEncadrement,encadrement.getEncadrementEtudiants());
       saveEncadrementDoctorants(savedEncadrement,encadrement.getEncadrementDoctorants());
return savedEncadrement;
}

@Override
public List<Encadrement> save(List<Encadrement> encadrements){
List<Encadrement> list = new ArrayList<Encadrement>();
for(Encadrement encadrement: encadrements){
list.add(save(encadrement));
}
return list;
}



@Override
@Transactional
public int delete(Encadrement encadrement){
    if(encadrement.getId()==null) return -1;
    Encadrement foundedEncadrement = findById(encadrement.getId());
    if(foundedEncadrement==null) return -1;
encadrementDao.delete(foundedEncadrement);
return 1;
}


public List<Encadrement> findByCriteria(EncadrementVo encadrementVo){

String query = "SELECT o FROM Encadrement o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",encadrementVo.getId());
            query += SearchUtil.addConstraint( "o", "annee","=",encadrementVo.getAnnee());
            query += SearchUtil.addConstraint( "o", "tempsEstimePourCetteAnnne","=",encadrementVo.getTempsEstimePourCetteAnnne());
            query += SearchUtil.addConstraintMinMax("o","annee",encadrementVo.getAnneeMin(),encadrementVo.getAnneeMax());
            query += SearchUtil.addConstraintMinMax("o","tempsEstimePourCetteAnnne",encadrementVo.getTempsEstimePourCetteAnnneMin(),encadrementVo.getTempsEstimePourCetteAnnneMax());
    if(encadrementVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",encadrementVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",encadrementVo.getCampagneVo().getCode());
    }

    if(encadrementVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",encadrementVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",encadrementVo.getChercheurVo().getNumeroMatricule());
    }

    if(encadrementVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",encadrementVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",encadrementVo.getEtatEtapeCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveEncadrementEtudiants(Encadrement encadrement,List<EncadrementEtudiant> encadrementEtudiants){

        if (ListUtil.isNotEmpty(encadrement.getEncadrementEtudiants())) {
        List<EncadrementEtudiant> savedEncadrementEtudiants = new ArrayList<>();
        encadrementEtudiants.forEach(element -> {
        element.setEncadrement(encadrement);
        encadrementEtudiantService.save(element);
        });
        encadrement.setEncadrementEtudiants(savedEncadrementEtudiants);
        }
        }
        private  void saveEncadrementDoctorants(Encadrement encadrement,List<EncadrementDoctorant> encadrementDoctorants){

        if (ListUtil.isNotEmpty(encadrement.getEncadrementDoctorants())) {
        List<EncadrementDoctorant> savedEncadrementDoctorants = new ArrayList<>();
        encadrementDoctorants.forEach(element -> {
        element.setEncadrement(encadrement);
        encadrementDoctorantService.save(element);
        });
        encadrement.setEncadrementDoctorants(savedEncadrementDoctorants);
        }
        }

    private void findCampagne(Encadrement encadrement){
        Campagne loadedCampagne =campagneService.findByIdOrCode(encadrement.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    encadrement.setCampagne(loadedCampagne);
    }
    private void findChercheur(Encadrement encadrement){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(encadrement.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    encadrement.setChercheur(loadedChercheur);
    }
    private void findEtatEtapeCampagne(Encadrement encadrement){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(encadrement.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    encadrement.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }

@Override
@Transactional
public void delete(List<Encadrement> encadrements){
        if(ListUtil.isNotEmpty(encadrements)){
        encadrements.forEach(e->encadrementDao.delete(e));
        }
}
@Override
public void update(List<Encadrement> encadrements){
if(ListUtil.isNotEmpty(encadrements)){
encadrements.forEach(e->encadrementDao.save(e));
}
}

private void associateEncadrementEtudiant(Encadrement encadrement, List<EncadrementEtudiant> encadrementEtudiant) {
    if (ListUtil.isNotEmpty(encadrementEtudiant)) {
        encadrementEtudiant.forEach(e -> e.setEncadrement(encadrement));
    }
    }
private void associateEncadrementDoctorant(Encadrement encadrement, List<EncadrementDoctorant> encadrementDoctorant) {
    if (ListUtil.isNotEmpty(encadrementDoctorant)) {
        encadrementDoctorant.forEach(e -> e.setEncadrement(encadrement));
    }
    }


@Override
public List<List<Encadrement>>  getToBeSavedAndToBeDeleted(List<Encadrement> oldList,List<Encadrement> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
