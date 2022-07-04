package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EncadrementDoctorant;
import com.ird.faa.bean.referentiel.ResponsabiliteEncadrementDoctorant;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.formulaire.Doctorant;
import com.ird.faa.bean.formulaire.Encadrement;
import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.dao.formulaire.EncadrementDoctorantDao;
import com.ird.faa.service.admin.facade.formulaire.EncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.referentiel.FinancementDoctorantAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnjeuxIrdEncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueEncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirEncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.formulaire.EncadrementAdminService;
import com.ird.faa.service.admin.facade.formulaire.DoctorantAdminService;
import com.ird.faa.service.admin.facade.referentiel.ResponsabiliteEncadrementDoctorantAdminService;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementDoctorantVo;
import com.ird.faa.service.util.*;
import com.ird.faa.bean.formulaire.EnjeuxIrdEncadrementDoctorant;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEncadrementDoctorant;
import com.ird.faa.bean.formulaire.CommunauteSavoirEncadrementDoctorant;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EncadrementDoctorantAdminServiceImpl extends AbstractServiceImpl<EncadrementDoctorant> implements EncadrementDoctorantAdminService {

@Autowired
private EncadrementDoctorantDao encadrementDoctorantDao;

        @Autowired
        private FinancementDoctorantAdminService financementDoctorantService ;
        @Autowired
        private EnjeuxIrdEncadrementDoctorantAdminService enjeuxIrdEncadrementDoctorantService ;
        @Autowired
        private DisciplineScientifiqueEncadrementDoctorantAdminService disciplineScientifiqueEncadrementDoctorantService ;
        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private CommunauteSavoirEncadrementDoctorantAdminService communauteSavoirEncadrementDoctorantService ;
        @Autowired
        private EncadrementAdminService encadrementService ;
        @Autowired
        private DoctorantAdminService doctorantService ;
        @Autowired
        private ResponsabiliteEncadrementDoctorantAdminService responsabiliteEncadrementDoctorantService ;
        @Autowired
        private EtablissementAdminService etablissementService ;
        @Autowired
        private PaysAdminService paysService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EncadrementDoctorant> findAll(){
return encadrementDoctorantDao.findAll();
}

        @Override
        public List<EncadrementDoctorant> findByResponsabiliteEncadrementDoctorantCode(String code){
        return encadrementDoctorantDao.findByResponsabiliteEncadrementDoctorantCode(code);
        }

        @Override
        @Transactional
        public int deleteByResponsabiliteEncadrementDoctorantCode(String code){
        return encadrementDoctorantDao.deleteByResponsabiliteEncadrementDoctorantCode(code);
        }

        @Override
        public List<EncadrementDoctorant> findByResponsabiliteEncadrementDoctorantId(Long id){
        return encadrementDoctorantDao.findByResponsabiliteEncadrementDoctorantId(id);
        }

        @Override
        @Transactional
        public int deleteByResponsabiliteEncadrementDoctorantId(Long id){
        return encadrementDoctorantDao.deleteByResponsabiliteEncadrementDoctorantId(id);
        }


        @Override
        public List<EncadrementDoctorant> findByEtablissementCode(String code){
        return encadrementDoctorantDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return encadrementDoctorantDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<EncadrementDoctorant> findByEtablissementId(Long id){
        return encadrementDoctorantDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return encadrementDoctorantDao.deleteByEtablissementId(id);
        }


        @Override
        public List<EncadrementDoctorant> findByPaysCode(String code){
        return encadrementDoctorantDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return encadrementDoctorantDao.deleteByPaysCode(code);
        }

        @Override
        public List<EncadrementDoctorant> findByPaysId(Long id){
        return encadrementDoctorantDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return encadrementDoctorantDao.deleteByPaysId(id);
        }

        @Override
        public List<EncadrementDoctorant> findByDoctorantId(Long id){
        return encadrementDoctorantDao.findByDoctorantId(id);
        }

        @Override
        @Transactional
        public int deleteByDoctorantId(Long id){
        return encadrementDoctorantDao.deleteByDoctorantId(id);
        }

        @Override
        public List<EncadrementDoctorant> findByEncadrementId(Long id){
        return encadrementDoctorantDao.findByEncadrementId(id);
        }

        @Override
        @Transactional
        public int deleteByEncadrementId(Long id){
        return encadrementDoctorantDao.deleteByEncadrementId(id);
        }


        @Override
        public List<EncadrementDoctorant> findByEtatEtapeCampagneCode(String code){
        return encadrementDoctorantDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return encadrementDoctorantDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<EncadrementDoctorant> findByEtatEtapeCampagneId(Long id){
        return encadrementDoctorantDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return encadrementDoctorantDao.deleteByEtatEtapeCampagneId(id);
        }


@Override
public EncadrementDoctorant findById(Long id){
if(id==null) return null;
return encadrementDoctorantDao.getOne(id);
}

@Override
public EncadrementDoctorant findByIdWithAssociatedList(Long id){
EncadrementDoctorant encadrementDoctorant  = findById(id);
    findAssociatedLists(encadrementDoctorant);
return encadrementDoctorant;
}
private void findAssociatedLists(EncadrementDoctorant encadrementDoctorant){
if(encadrementDoctorant==null || encadrementDoctorant.getId()==null) return ;
else{
        List<EnjeuxIrdEncadrementDoctorant> enjeuxIrdEncadrementDoctorants = enjeuxIrdEncadrementDoctorantService.findByEncadrementDoctorantId(encadrementDoctorant.getId());
        encadrementDoctorant.setEnjeuxIrdEncadrementDoctorants(enjeuxIrdEncadrementDoctorants);
        List<DisciplineScientifiqueEncadrementDoctorant> disciplineScientifiqueEncadrementDoctorants = disciplineScientifiqueEncadrementDoctorantService.findByEncadrementDoctorantId(encadrementDoctorant.getId());
        encadrementDoctorant.setDisciplineScientifiqueEncadrementDoctorants(disciplineScientifiqueEncadrementDoctorants);
        List<CommunauteSavoirEncadrementDoctorant> communauteSavoirEncadrementDoctorants = communauteSavoirEncadrementDoctorantService.findByEncadrementDoctorantId(encadrementDoctorant.getId());
        encadrementDoctorant.setCommunauteSavoirEncadrementDoctorants(communauteSavoirEncadrementDoctorants);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        enjeuxIrdEncadrementDoctorantService.deleteByEncadrementDoctorantId(id);
        disciplineScientifiqueEncadrementDoctorantService.deleteByEncadrementDoctorantId(id);
        communauteSavoirEncadrementDoctorantService.deleteByEncadrementDoctorantId(id);
}
}

    private void updateAssociatedLists(EncadrementDoctorant encadrementDoctorant){
    if(encadrementDoctorant==null || encadrementDoctorant.getId()==null) return ;
    else{
            List<List<EnjeuxIrdEncadrementDoctorant>> resultEnjeuxIrdEncadrementDoctorants= enjeuxIrdEncadrementDoctorantService.getToBeSavedAndToBeDeleted(enjeuxIrdEncadrementDoctorantService.findByEncadrementDoctorantId(encadrementDoctorant.getId()),encadrementDoctorant.getEnjeuxIrdEncadrementDoctorants());
            enjeuxIrdEncadrementDoctorantService.delete(resultEnjeuxIrdEncadrementDoctorants.get(1));
            associateEnjeuxIrdEncadrementDoctorant(encadrementDoctorant,resultEnjeuxIrdEncadrementDoctorants.get(0));
            enjeuxIrdEncadrementDoctorantService.update(resultEnjeuxIrdEncadrementDoctorants.get(0));

            List<List<DisciplineScientifiqueEncadrementDoctorant>> resultDisciplineScientifiqueEncadrementDoctorants= disciplineScientifiqueEncadrementDoctorantService.getToBeSavedAndToBeDeleted(disciplineScientifiqueEncadrementDoctorantService.findByEncadrementDoctorantId(encadrementDoctorant.getId()),encadrementDoctorant.getDisciplineScientifiqueEncadrementDoctorants());
            disciplineScientifiqueEncadrementDoctorantService.delete(resultDisciplineScientifiqueEncadrementDoctorants.get(1));
            associateDisciplineScientifiqueEncadrementDoctorant(encadrementDoctorant,resultDisciplineScientifiqueEncadrementDoctorants.get(0));
            disciplineScientifiqueEncadrementDoctorantService.update(resultDisciplineScientifiqueEncadrementDoctorants.get(0));

            List<List<CommunauteSavoirEncadrementDoctorant>> resultCommunauteSavoirEncadrementDoctorants= communauteSavoirEncadrementDoctorantService.getToBeSavedAndToBeDeleted(communauteSavoirEncadrementDoctorantService.findByEncadrementDoctorantId(encadrementDoctorant.getId()),encadrementDoctorant.getCommunauteSavoirEncadrementDoctorants());
            communauteSavoirEncadrementDoctorantService.delete(resultCommunauteSavoirEncadrementDoctorants.get(1));
            associateCommunauteSavoirEncadrementDoctorant(encadrementDoctorant,resultCommunauteSavoirEncadrementDoctorants.get(0));
            communauteSavoirEncadrementDoctorantService.update(resultCommunauteSavoirEncadrementDoctorants.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(encadrementDoctorantDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
encadrementDoctorantDao.deleteById(id);
return 1;
}
}


@Override
public EncadrementDoctorant update(EncadrementDoctorant encadrementDoctorant){
EncadrementDoctorant foundedEncadrementDoctorant = findById(encadrementDoctorant.getId());
if(foundedEncadrementDoctorant==null) return null;
else{
    updateAssociatedLists(encadrementDoctorant);
return  encadrementDoctorantDao.save(encadrementDoctorant);
}
}

@Override
public EncadrementDoctorant save (EncadrementDoctorant encadrementDoctorant){


    findResponsabiliteEncadrementDoctorant(encadrementDoctorant);
    findEtablissement(encadrementDoctorant);
    findPays(encadrementDoctorant);
    findDoctorant(encadrementDoctorant);
    findEncadrement(encadrementDoctorant);
    findEtatEtapeCampagne(encadrementDoctorant);

EncadrementDoctorant savedEncadrementDoctorant = encadrementDoctorantDao.save(encadrementDoctorant);
       saveEnjeuxIrdEncadrementDoctorants(savedEncadrementDoctorant,encadrementDoctorant.getEnjeuxIrdEncadrementDoctorants());
       saveDisciplineScientifiqueEncadrementDoctorants(savedEncadrementDoctorant,encadrementDoctorant.getDisciplineScientifiqueEncadrementDoctorants());
       saveCommunauteSavoirEncadrementDoctorants(savedEncadrementDoctorant,encadrementDoctorant.getCommunauteSavoirEncadrementDoctorants());
return savedEncadrementDoctorant;
}

@Override
public List<EncadrementDoctorant> save(List<EncadrementDoctorant> encadrementDoctorants){
List<EncadrementDoctorant> list = new ArrayList<EncadrementDoctorant>();
for(EncadrementDoctorant encadrementDoctorant: encadrementDoctorants){
list.add(save(encadrementDoctorant));
}
return list;
}



@Override
@Transactional
public int delete(EncadrementDoctorant encadrementDoctorant){
    if(encadrementDoctorant.getId()==null) return -1;
    EncadrementDoctorant foundedEncadrementDoctorant = findById(encadrementDoctorant.getId());
    if(foundedEncadrementDoctorant==null) return -1;
encadrementDoctorantDao.delete(foundedEncadrementDoctorant);
return 1;
}


public List<EncadrementDoctorant> findByCriteria(EncadrementDoctorantVo encadrementDoctorantVo){

String query = "SELECT o FROM EncadrementDoctorant o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",encadrementDoctorantVo.getId());
            query += SearchUtil.addConstraint( "o", "codirectionInternationale","=",encadrementDoctorantVo.getCodirectionInternationale());
            query += SearchUtil.addConstraint( "o", "sujetThese","LIKE",encadrementDoctorantVo.getSujetThese());
        query += SearchUtil.addConstraintDate( "o", "dateDebutThese","=",encadrementDoctorantVo.getDateDebutThese());
        query += SearchUtil.addConstraintDate( "o", "datePrevuSoutenanceThese","=",encadrementDoctorantVo.getDatePrevuSoutenanceThese());
            query += SearchUtil.addConstraint( "o", "intituleEcoleDoctorale","LIKE",encadrementDoctorantVo.getIntituleEcoleDoctorale());
            query += SearchUtil.addConstraintMinMaxDate("o","dateDebutThese",encadrementDoctorantVo.getDateDebutTheseMin(),encadrementDoctorantVo.getDateDebutTheseMax());
            query += SearchUtil.addConstraintMinMaxDate("o","datePrevuSoutenanceThese",encadrementDoctorantVo.getDatePrevuSoutenanceTheseMin(),encadrementDoctorantVo.getDatePrevuSoutenanceTheseMax());
    if(encadrementDoctorantVo.getResponsabiliteEncadrementDoctorantVo()!=null){
        query += SearchUtil.addConstraint( "o", "responsabiliteEncadrementDoctorant.id","=",encadrementDoctorantVo.getResponsabiliteEncadrementDoctorantVo().getId());
            query += SearchUtil.addConstraint( "o", "responsabiliteEncadrementDoctorant.code","LIKE",encadrementDoctorantVo.getResponsabiliteEncadrementDoctorantVo().getCode());
    }

    if(encadrementDoctorantVo.getFinancementDoctorantVo()!=null){
        query += SearchUtil.addConstraint( "o", "financementDoctorant.id","=",encadrementDoctorantVo.getFinancementDoctorantVo().getId());
            query += SearchUtil.addConstraint( "o", "financementDoctorant.code","LIKE",encadrementDoctorantVo.getFinancementDoctorantVo().getCode());
    }

    if(encadrementDoctorantVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",encadrementDoctorantVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",encadrementDoctorantVo.getEtablissementVo().getCode());
    }

    if(encadrementDoctorantVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",encadrementDoctorantVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",encadrementDoctorantVo.getPaysVo().getCode());
    }

    if(encadrementDoctorantVo.getDoctorantVo()!=null){
        query += SearchUtil.addConstraint( "o", "doctorant.id","=",encadrementDoctorantVo.getDoctorantVo().getId());
    }

    if(encadrementDoctorantVo.getEncadrementVo()!=null){
        query += SearchUtil.addConstraint( "o", "encadrement.id","=",encadrementDoctorantVo.getEncadrementVo().getId());
    }

    if(encadrementDoctorantVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",encadrementDoctorantVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",encadrementDoctorantVo.getEtatEtapeCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveEnjeuxIrdEncadrementDoctorants(EncadrementDoctorant encadrementDoctorant,List<EnjeuxIrdEncadrementDoctorant> enjeuxIrdEncadrementDoctorants){

        if (ListUtil.isNotEmpty(encadrementDoctorant.getEnjeuxIrdEncadrementDoctorants())) {
        List<EnjeuxIrdEncadrementDoctorant> savedEnjeuxIrdEncadrementDoctorants = new ArrayList<>();
        enjeuxIrdEncadrementDoctorants.forEach(element -> {
        element.setEncadrementDoctorant(encadrementDoctorant);
        enjeuxIrdEncadrementDoctorantService.save(element);
        });
        encadrementDoctorant.setEnjeuxIrdEncadrementDoctorants(savedEnjeuxIrdEncadrementDoctorants);
        }
        }
        private  void saveDisciplineScientifiqueEncadrementDoctorants(EncadrementDoctorant encadrementDoctorant,List<DisciplineScientifiqueEncadrementDoctorant> disciplineScientifiqueEncadrementDoctorants){

        if (ListUtil.isNotEmpty(encadrementDoctorant.getDisciplineScientifiqueEncadrementDoctorants())) {
        List<DisciplineScientifiqueEncadrementDoctorant> savedDisciplineScientifiqueEncadrementDoctorants = new ArrayList<>();
        disciplineScientifiqueEncadrementDoctorants.forEach(element -> {
        element.setEncadrementDoctorant(encadrementDoctorant);
        disciplineScientifiqueEncadrementDoctorantService.save(element);
        });
        encadrementDoctorant.setDisciplineScientifiqueEncadrementDoctorants(savedDisciplineScientifiqueEncadrementDoctorants);
        }
        }
        private  void saveCommunauteSavoirEncadrementDoctorants(EncadrementDoctorant encadrementDoctorant,List<CommunauteSavoirEncadrementDoctorant> communauteSavoirEncadrementDoctorants){

        if (ListUtil.isNotEmpty(encadrementDoctorant.getCommunauteSavoirEncadrementDoctorants())) {
        List<CommunauteSavoirEncadrementDoctorant> savedCommunauteSavoirEncadrementDoctorants = new ArrayList<>();
        communauteSavoirEncadrementDoctorants.forEach(element -> {
        element.setEncadrementDoctorant(encadrementDoctorant);
        communauteSavoirEncadrementDoctorantService.save(element);
        });
        encadrementDoctorant.setCommunauteSavoirEncadrementDoctorants(savedCommunauteSavoirEncadrementDoctorants);
        }
        }

    private void findResponsabiliteEncadrementDoctorant(EncadrementDoctorant encadrementDoctorant){
        ResponsabiliteEncadrementDoctorant loadedResponsabiliteEncadrementDoctorant =responsabiliteEncadrementDoctorantService.findByIdOrCode(encadrementDoctorant.getResponsabiliteEncadrementDoctorant());

    if(loadedResponsabiliteEncadrementDoctorant==null ) {
        return;
    }
    encadrementDoctorant.setResponsabiliteEncadrementDoctorant(loadedResponsabiliteEncadrementDoctorant);
    }
   
    private void findEtablissement(EncadrementDoctorant encadrementDoctorant){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(encadrementDoctorant.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    encadrementDoctorant.setEtablissement(loadedEtablissement);
    }
    private void findPays(EncadrementDoctorant encadrementDoctorant){
        Pays loadedPays =paysService.findByIdOrCode(encadrementDoctorant.getPays());

    if(loadedPays==null ) {
        return;
    }
    encadrementDoctorant.setPays(loadedPays);
    }
    private void findDoctorant(EncadrementDoctorant encadrementDoctorant){
        Doctorant loadedDoctorant = null;
        if(encadrementDoctorant.getDoctorant() != null && encadrementDoctorant.getDoctorant().getId() !=null)
        loadedDoctorant =doctorantService.findById(encadrementDoctorant.getDoctorant().getId());

    if(loadedDoctorant==null ) {
        return;
    }
    encadrementDoctorant.setDoctorant(loadedDoctorant);
    }
    private void findEncadrement(EncadrementDoctorant encadrementDoctorant){
        Encadrement loadedEncadrement = null;
        if(encadrementDoctorant.getEncadrement() != null && encadrementDoctorant.getEncadrement().getId() !=null)
        loadedEncadrement =encadrementService.findById(encadrementDoctorant.getEncadrement().getId());

    if(loadedEncadrement==null ) {
        return;
    }
    encadrementDoctorant.setEncadrement(loadedEncadrement);
    }
    private void findEtatEtapeCampagne(EncadrementDoctorant encadrementDoctorant){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(encadrementDoctorant.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    encadrementDoctorant.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }

@Override
@Transactional
public void delete(List<EncadrementDoctorant> encadrementDoctorants){
        if(ListUtil.isNotEmpty(encadrementDoctorants)){
        encadrementDoctorants.forEach(e->encadrementDoctorantDao.delete(e));
        }
}
@Override
public void update(List<EncadrementDoctorant> encadrementDoctorants){
if(ListUtil.isNotEmpty(encadrementDoctorants)){
encadrementDoctorants.forEach(e->encadrementDoctorantDao.save(e));
}
}

private void associateEnjeuxIrdEncadrementDoctorant(EncadrementDoctorant encadrementDoctorant, List<EnjeuxIrdEncadrementDoctorant> enjeuxIrdEncadrementDoctorant) {
    if (ListUtil.isNotEmpty(enjeuxIrdEncadrementDoctorant)) {
        enjeuxIrdEncadrementDoctorant.forEach(e -> e.setEncadrementDoctorant(encadrementDoctorant));
    }
    }
private void associateDisciplineScientifiqueEncadrementDoctorant(EncadrementDoctorant encadrementDoctorant, List<DisciplineScientifiqueEncadrementDoctorant> disciplineScientifiqueEncadrementDoctorant) {
    if (ListUtil.isNotEmpty(disciplineScientifiqueEncadrementDoctorant)) {
        disciplineScientifiqueEncadrementDoctorant.forEach(e -> e.setEncadrementDoctorant(encadrementDoctorant));
    }
    }
private void associateCommunauteSavoirEncadrementDoctorant(EncadrementDoctorant encadrementDoctorant, List<CommunauteSavoirEncadrementDoctorant> communauteSavoirEncadrementDoctorant) {
    if (ListUtil.isNotEmpty(communauteSavoirEncadrementDoctorant)) {
        communauteSavoirEncadrementDoctorant.forEach(e -> e.setEncadrementDoctorant(encadrementDoctorant));
    }
    }


@Override
public List<List<EncadrementDoctorant>>  getToBeSavedAndToBeDeleted(List<EncadrementDoctorant> oldList,List<EncadrementDoctorant> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
