package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EncadrementEtudiant;
import com.ird.faa.bean.referentiel.NiveauFormationPostBac;
import com.ird.faa.bean.referentiel.ResponsabiliteEncadrementEtudiant;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.formulaire.Encadrement;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.dao.formulaire.EncadrementEtudiantDao;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.referentiel.ResponsabiliteEncadrementEtudiantAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.referentiel.NiveauFormationPostBacAdminService;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementEtudiantDisciplineScientifiqueAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementEtudiantVo;
import com.ird.faa.service.util.*;
import com.ird.faa.bean.formulaire.EncadrementEtudiantEnjeuxIrd;
import com.ird.faa.bean.formulaire.EncadrementEtudiantDisciplineScientifique;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EncadrementEtudiantAdminServiceImpl extends AbstractServiceImpl<EncadrementEtudiant> implements EncadrementEtudiantAdminService {

@Autowired
private EncadrementEtudiantDao encadrementEtudiantDao;

        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private ResponsabiliteEncadrementEtudiantAdminService responsabiliteEncadrementEtudiantService ;
        @Autowired
        private EncadrementAdminService encadrementService ;
        @Autowired
        private EncadrementEtudiantEnjeuxIrdAdminService encadrementEtudiantEnjeuxIrdService ;
        @Autowired
        private NiveauFormationPostBacAdminService niveauFormationPostBacService ;
        @Autowired
        private EtablissementAdminService etablissementService ;
        @Autowired
        private EncadrementEtudiantDisciplineScientifiqueAdminService encadrementEtudiantDisciplineScientifiqueService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EncadrementEtudiant> findAll(){
return encadrementEtudiantDao.findAll();
}

        @Override
        public List<EncadrementEtudiant> findByNiveauFormationPostBacCode(String code){
        return encadrementEtudiantDao.findByNiveauFormationPostBacCode(code);
        }

        @Override
        @Transactional
        public int deleteByNiveauFormationPostBacCode(String code){
        return encadrementEtudiantDao.deleteByNiveauFormationPostBacCode(code);
        }

        @Override
        public List<EncadrementEtudiant> findByNiveauFormationPostBacId(Long id){
        return encadrementEtudiantDao.findByNiveauFormationPostBacId(id);
        }

        @Override
        @Transactional
        public int deleteByNiveauFormationPostBacId(Long id){
        return encadrementEtudiantDao.deleteByNiveauFormationPostBacId(id);
        }


        @Override
        public List<EncadrementEtudiant> findByResponsabiliteEncadrementEtudiantCode(String code){
        return encadrementEtudiantDao.findByResponsabiliteEncadrementEtudiantCode(code);
        }

        @Override
        @Transactional
        public int deleteByResponsabiliteEncadrementEtudiantCode(String code){
        return encadrementEtudiantDao.deleteByResponsabiliteEncadrementEtudiantCode(code);
        }

        @Override
        public List<EncadrementEtudiant> findByResponsabiliteEncadrementEtudiantId(Long id){
        return encadrementEtudiantDao.findByResponsabiliteEncadrementEtudiantId(id);
        }

        @Override
        @Transactional
        public int deleteByResponsabiliteEncadrementEtudiantId(Long id){
        return encadrementEtudiantDao.deleteByResponsabiliteEncadrementEtudiantId(id);
        }


        @Override
        public List<EncadrementEtudiant> findByEtablissementCode(String code){
        return encadrementEtudiantDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return encadrementEtudiantDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<EncadrementEtudiant> findByEtablissementId(Long id){
        return encadrementEtudiantDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return encadrementEtudiantDao.deleteByEtablissementId(id);
        }


        @Override
        public List<EncadrementEtudiant> findByPaysCode(String code){
        return encadrementEtudiantDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return encadrementEtudiantDao.deleteByPaysCode(code);
        }

        @Override
        public List<EncadrementEtudiant> findByPaysId(Long id){
        return encadrementEtudiantDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return encadrementEtudiantDao.deleteByPaysId(id);
        }

        @Override
        public List<EncadrementEtudiant> findByEncadrementId(Long id){
        return encadrementEtudiantDao.findByEncadrementId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementId(Long id){
        return encadrementEtudiantDao.deleteByEncadrementId(id);
        }


        @Override
        public List<EncadrementEtudiant> findByEtatEtapeCampagneCode(String code){
        return encadrementEtudiantDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return encadrementEtudiantDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<EncadrementEtudiant> findByEtatEtapeCampagneId(Long id){
        return encadrementEtudiantDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return encadrementEtudiantDao.deleteByEtatEtapeCampagneId(id);
        }


@Override
public EncadrementEtudiant findById(Long id){
if(id==null) return null;
return encadrementEtudiantDao.getOne(id);
}

@Override
public EncadrementEtudiant findByIdWithAssociatedList(Long id){
EncadrementEtudiant encadrementEtudiant  = findById(id);
    findAssociatedLists(encadrementEtudiant);
return encadrementEtudiant;
}
private void findAssociatedLists(EncadrementEtudiant encadrementEtudiant){
if(encadrementEtudiant==null || encadrementEtudiant.getId()==null) return ;
else{
        List<EncadrementEtudiantEnjeuxIrd> encadrementEtudiantEnjeuxIrds = encadrementEtudiantEnjeuxIrdService.findByEncadrementEtudiantId(encadrementEtudiant.getId());
        encadrementEtudiant.setEncadrementEtudiantEnjeuxIrds(encadrementEtudiantEnjeuxIrds);
        List<EncadrementEtudiantDisciplineScientifique> encadrementEtudiantDisciplineScientifiques = encadrementEtudiantDisciplineScientifiqueService.findByEncadrementEtudiantId(encadrementEtudiant.getId());
        encadrementEtudiant.setEncadrementEtudiantDisciplineScientifiques(encadrementEtudiantDisciplineScientifiques);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        encadrementEtudiantEnjeuxIrdService.deleteByEncadrementEtudiantId(id);
        encadrementEtudiantDisciplineScientifiqueService.deleteByEncadrementEtudiantId(id);
}
}

    private void updateAssociatedLists(EncadrementEtudiant encadrementEtudiant){
    if(encadrementEtudiant==null || encadrementEtudiant.getId()==null) return ;
    else{
            List<List<EncadrementEtudiantEnjeuxIrd>> resultEncadrementEtudiantEnjeuxIrds= encadrementEtudiantEnjeuxIrdService.getToBeSavedAndToBeDeleted(encadrementEtudiantEnjeuxIrdService.findByEncadrementEtudiantId(encadrementEtudiant.getId()),encadrementEtudiant.getEncadrementEtudiantEnjeuxIrds());
            encadrementEtudiantEnjeuxIrdService.delete(resultEncadrementEtudiantEnjeuxIrds.get(1));
            associateEncadrementEtudiantEnjeuxIrd(encadrementEtudiant,resultEncadrementEtudiantEnjeuxIrds.get(0));
            encadrementEtudiantEnjeuxIrdService.update(resultEncadrementEtudiantEnjeuxIrds.get(0));

            List<List<EncadrementEtudiantDisciplineScientifique>> resultEncadrementEtudiantDisciplineScientifiques= encadrementEtudiantDisciplineScientifiqueService.getToBeSavedAndToBeDeleted(encadrementEtudiantDisciplineScientifiqueService.findByEncadrementEtudiantId(encadrementEtudiant.getId()),encadrementEtudiant.getEncadrementEtudiantDisciplineScientifiques());
            encadrementEtudiantDisciplineScientifiqueService.delete(resultEncadrementEtudiantDisciplineScientifiques.get(1));
            associateEncadrementEtudiantDisciplineScientifique(encadrementEtudiant,resultEncadrementEtudiantDisciplineScientifiques.get(0));
            encadrementEtudiantDisciplineScientifiqueService.update(resultEncadrementEtudiantDisciplineScientifiques.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(encadrementEtudiantDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
encadrementEtudiantDao.deleteById(id);
return 1;
}
}


@Override
public EncadrementEtudiant update(EncadrementEtudiant encadrementEtudiant){
EncadrementEtudiant foundedEncadrementEtudiant = findById(encadrementEtudiant.getId());
if(foundedEncadrementEtudiant==null) return null;
else{
    updateAssociatedLists(encadrementEtudiant);
return  encadrementEtudiantDao.save(encadrementEtudiant);
}
}

@Override
public EncadrementEtudiant save (EncadrementEtudiant encadrementEtudiant){


    findNiveauFormationPostBac(encadrementEtudiant);
    findResponsabiliteEncadrementEtudiant(encadrementEtudiant);
    findEtablissement(encadrementEtudiant);
    findPays(encadrementEtudiant);
    findEncadrement(encadrementEtudiant);
    findEtatEtapeCampagne(encadrementEtudiant);

EncadrementEtudiant savedEncadrementEtudiant = encadrementEtudiantDao.save(encadrementEtudiant);
       saveEncadrementEtudiantEnjeuxIrds(savedEncadrementEtudiant,encadrementEtudiant.getEncadrementEtudiantEnjeuxIrds());
       saveEncadrementEtudiantDisciplineScientifiques(savedEncadrementEtudiant,encadrementEtudiant.getEncadrementEtudiantDisciplineScientifiques());
return savedEncadrementEtudiant;
}

@Override
public List<EncadrementEtudiant> save(List<EncadrementEtudiant> encadrementEtudiants){
List<EncadrementEtudiant> list = new ArrayList<EncadrementEtudiant>();
for(EncadrementEtudiant encadrementEtudiant: encadrementEtudiants){
list.add(save(encadrementEtudiant));
}
return list;
}



@Override
@Transactional
public int delete(EncadrementEtudiant encadrementEtudiant){
    if(encadrementEtudiant.getId()==null) return -1;
    EncadrementEtudiant foundedEncadrementEtudiant = findById(encadrementEtudiant.getId());
    if(foundedEncadrementEtudiant==null) return -1;
encadrementEtudiantDao.delete(foundedEncadrementEtudiant);
return 1;
}


public List<EncadrementEtudiant> findByCriteria(EncadrementEtudiantVo encadrementEtudiantVo){

String query = "SELECT o FROM EncadrementEtudiant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",encadrementEtudiantVo.getId());
            query += SearchUtil.addConstraint( "o", "sujetEtude","LIKE",encadrementEtudiantVo.getSujetEtude());
            query += SearchUtil.addConstraint( "o", "cursus","LIKE",encadrementEtudiantVo.isCursus());
    if(encadrementEtudiantVo.getNiveauFormationPostBacVo()!=null){
        query += SearchUtil.addConstraint( "o", "niveauFormationPostBac.id","=",encadrementEtudiantVo.getNiveauFormationPostBacVo().getId());
            query += SearchUtil.addConstraint( "o", "niveauFormationPostBac.code","LIKE",encadrementEtudiantVo.getNiveauFormationPostBacVo().getCode());
    }

    if(encadrementEtudiantVo.getResponsabiliteEncadrementEtudiantVo()!=null){
        query += SearchUtil.addConstraint( "o", "responsabiliteEncadrementEtudiant.id","=",encadrementEtudiantVo.getResponsabiliteEncadrementEtudiantVo().getId());
            query += SearchUtil.addConstraint( "o", "responsabiliteEncadrementEtudiant.code","LIKE",encadrementEtudiantVo.getResponsabiliteEncadrementEtudiantVo().getCode());
    }

    if(encadrementEtudiantVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",encadrementEtudiantVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",encadrementEtudiantVo.getEtablissementVo().getCode());
    }

    if(encadrementEtudiantVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",encadrementEtudiantVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",encadrementEtudiantVo.getPaysVo().getCode());
    }

    if(encadrementEtudiantVo.getEncadrementVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrement.id","=",encadrementEtudiantVo.getEncadrementVo().getId());
    }

    if(encadrementEtudiantVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",encadrementEtudiantVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",encadrementEtudiantVo.getEtatEtapeCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveEncadrementEtudiantEnjeuxIrds(EncadrementEtudiant encadrementEtudiant,List<EncadrementEtudiantEnjeuxIrd> encadrementEtudiantEnjeuxIrds){

        if (ListUtil.isNotEmpty(encadrementEtudiant.getEncadrementEtudiantEnjeuxIrds())) {
        List<EncadrementEtudiantEnjeuxIrd> savedEncadrementEtudiantEnjeuxIrds = new ArrayList<>();
        encadrementEtudiantEnjeuxIrds.forEach(element -> {
        element.setEncadrementEtudiant(encadrementEtudiant);
        encadrementEtudiantEnjeuxIrdService.save(element);
        });
        encadrementEtudiant.setEncadrementEtudiantEnjeuxIrds(savedEncadrementEtudiantEnjeuxIrds);
        }
        }
        private  void saveEncadrementEtudiantDisciplineScientifiques(EncadrementEtudiant encadrementEtudiant,List<EncadrementEtudiantDisciplineScientifique> encadrementEtudiantDisciplineScientifiques){

        if (ListUtil.isNotEmpty(encadrementEtudiant.getEncadrementEtudiantDisciplineScientifiques())) {
        List<EncadrementEtudiantDisciplineScientifique> savedEncadrementEtudiantDisciplineScientifiques = new ArrayList<>();
        encadrementEtudiantDisciplineScientifiques.forEach(element -> {
        element.setEncadrementEtudiant(encadrementEtudiant);
        encadrementEtudiantDisciplineScientifiqueService.save(element);
        });
        encadrementEtudiant.setEncadrementEtudiantDisciplineScientifiques(savedEncadrementEtudiantDisciplineScientifiques);
        }
        }

    private void findNiveauFormationPostBac(EncadrementEtudiant encadrementEtudiant){
        NiveauFormationPostBac loadedNiveauFormationPostBac =niveauFormationPostBacService.findByIdOrCode(encadrementEtudiant.getNiveauFormationPostBac());

    if(loadedNiveauFormationPostBac==null ) {
        return;
    }
    encadrementEtudiant.setNiveauFormationPostBac(loadedNiveauFormationPostBac);
    }
    private void findResponsabiliteEncadrementEtudiant(EncadrementEtudiant encadrementEtudiant){
        ResponsabiliteEncadrementEtudiant loadedResponsabiliteEncadrementEtudiant =responsabiliteEncadrementEtudiantService.findByIdOrCode(encadrementEtudiant.getResponsabiliteEncadrementEtudiant());

    if(loadedResponsabiliteEncadrementEtudiant==null ) {
        return;
    }
    encadrementEtudiant.setResponsabiliteEncadrementEtudiant(loadedResponsabiliteEncadrementEtudiant);
    }
    private void findEtablissement(EncadrementEtudiant encadrementEtudiant){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(encadrementEtudiant.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    encadrementEtudiant.setEtablissement(loadedEtablissement);
    }
    private void findPays(EncadrementEtudiant encadrementEtudiant){
        Pays loadedPays =paysService.findByIdOrCode(encadrementEtudiant.getPays());

    if(loadedPays==null ) {
        return;
    }
    encadrementEtudiant.setPays(loadedPays);
    }
    private void findEncadrement(EncadrementEtudiant encadrementEtudiant){
        Encadrement loadedEncadrement = null;
        if(encadrementEtudiant.getEncadrement() != null && encadrementEtudiant.getEncadrement().getId() !=null)
        loadedEncadrement =encadrementService.findById(encadrementEtudiant.getEncadrement().getId());

    if(loadedEncadrement==null ) {
        return;
    }
    encadrementEtudiant.setEncadrement(loadedEncadrement);
    }
    private void findEtatEtapeCampagne(EncadrementEtudiant encadrementEtudiant){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(encadrementEtudiant.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    encadrementEtudiant.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }

@Override
@Transactional
public void delete(List<EncadrementEtudiant> encadrementEtudiants){
        if(ListUtil.isNotEmpty(encadrementEtudiants)){
        encadrementEtudiants.forEach(e->encadrementEtudiantDao.delete(e));
        }
}
@Override
public void update(List<EncadrementEtudiant> encadrementEtudiants){
if(ListUtil.isNotEmpty(encadrementEtudiants)){
encadrementEtudiants.forEach(e->encadrementEtudiantDao.save(e));
}
}

private void associateEncadrementEtudiantEnjeuxIrd(EncadrementEtudiant encadrementEtudiant, List<EncadrementEtudiantEnjeuxIrd> encadrementEtudiantEnjeuxIrd) {
    if (ListUtil.isNotEmpty(encadrementEtudiantEnjeuxIrd)) {
        encadrementEtudiantEnjeuxIrd.forEach(e -> e.setEncadrementEtudiant(encadrementEtudiant));
    }
    }
private void associateEncadrementEtudiantDisciplineScientifique(EncadrementEtudiant encadrementEtudiant, List<EncadrementEtudiantDisciplineScientifique> encadrementEtudiantDisciplineScientifique) {
    if (ListUtil.isNotEmpty(encadrementEtudiantDisciplineScientifique)) {
        encadrementEtudiantDisciplineScientifique.forEach(e -> e.setEncadrementEtudiant(encadrementEtudiant));
    }
    }


@Override
public List<List<EncadrementEtudiant>>  getToBeSavedAndToBeDeleted(List<EncadrementEtudiant> oldList,List<EncadrementEtudiant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
