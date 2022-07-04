package com.ird.faa.service.admin.impl.formulaire;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.bean.formulaire.ProjetActiviteRecherche;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetail;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailEnjeuxIrd;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailEtablissementLanceur;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailInstitutionCoContractant;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailInstrumentIrd;
import com.ird.faa.bean.formulaire.ProjetActiviteRechercheDetailPays;
import com.ird.faa.bean.referentiel.StatusProjet;
import com.ird.faa.dao.formulaire.ProjetActiviteRechercheDetailDao;
import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailEnjeuxIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailEtablissementLanceurAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailInstitutionCoContractantAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailInstrumentIrdAdminService;
import com.ird.faa.service.admin.facade.formulaire.ProjetActiviteRechercheDetailPaysAdminService;
import com.ird.faa.service.admin.facade.referentiel.StatusProjetAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.ws.rest.provided.vo.formulaire.ProjetActiviteRechercheDetailVo;

@Service
public class ProjetActiviteRechercheDetailAdminServiceImpl extends AbstractServiceImpl<ProjetActiviteRechercheDetail> implements ProjetActiviteRechercheDetailAdminService {

@Autowired
private ProjetActiviteRechercheDetailDao projetActiviteRechercheDetailDao;

        @Autowired
        private ProjetActiviteRechercheDetailPaysAdminService projetActiviteRechercheDetailPaysService ;
        @Autowired
        private ProjetActiviteRechercheAdminService projetActiviteRechercheService ;
        @Autowired
        private ProjetActiviteRechercheDetailEtablissementLanceurAdminService projetActiviteRechercheDetailEtablissementLanceurService ;
        @Autowired
        private StatusProjetAdminService statusProjetService ;
        @Autowired
        private EtablissementAdminService etablissementService ;
        @Autowired
        private ProjetActiviteRechercheDetailInstitutionCoContractantAdminService projetActiviteRechercheDetailInstitutionCoContractantService ;
        @Autowired
        private PaysAdminService paysService ;
        @Autowired
        private ProjetActiviteRechercheDetailEnjeuxIrdAdminService projetActiviteRechercheDetailEnjeuxIrdService ;
        @Autowired
        private ProjetActiviteRechercheDetailInstrumentIrdAdminService projetActiviteRechercheDetailInstrumentIrdService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ProjetActiviteRechercheDetail> findAll(){
return projetActiviteRechercheDetailDao.findAll();
}

        @Override
        public List<ProjetActiviteRechercheDetail> findByStatusProjetCode(String code){
        return projetActiviteRechercheDetailDao.findByStatusProjetCode(code);
        }

        @Override
        @Transactional
        public int deleteByStatusProjetCode(String code){
        return projetActiviteRechercheDetailDao.deleteByStatusProjetCode(code);
        }

        @Override
        public List<ProjetActiviteRechercheDetail> findByStatusProjetId(Long id){
        return projetActiviteRechercheDetailDao.findByStatusProjetId(id);
        }

        @Override
        @Transactional
        public int deleteByStatusProjetId(Long id){
        return projetActiviteRechercheDetailDao.deleteByStatusProjetId(id);
        }


        @Override
        public List<ProjetActiviteRechercheDetail> findByEtablissementCode(String code){
        return projetActiviteRechercheDetailDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return projetActiviteRechercheDetailDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<ProjetActiviteRechercheDetail> findByEtablissementId(Long id){
        return projetActiviteRechercheDetailDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return projetActiviteRechercheDetailDao.deleteByEtablissementId(id);
        }


        @Override
        public List<ProjetActiviteRechercheDetail> findByPaysCode(String code){
        return projetActiviteRechercheDetailDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return projetActiviteRechercheDetailDao.deleteByPaysCode(code);
        }

        @Override
        public List<ProjetActiviteRechercheDetail> findByPaysId(Long id){
        return projetActiviteRechercheDetailDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return projetActiviteRechercheDetailDao.deleteByPaysId(id);
        }

        @Override
        public List<ProjetActiviteRechercheDetail> findByProjetActiviteRechercheId(Long id){
        return projetActiviteRechercheDetailDao.findByProjetActiviteRechercheId(id);
        }

        @Override
        @Transactional
        public int deleteByProjetActiviteRechercheId(Long id){
        return projetActiviteRechercheDetailDao.deleteByProjetActiviteRechercheId(id);
        }


@Override
public ProjetActiviteRechercheDetail findById(Long id){
if(id==null) return null;
return projetActiviteRechercheDetailDao.getOne(id);
}

@Override
public ProjetActiviteRechercheDetail findByIdWithAssociatedList(Long id){
ProjetActiviteRechercheDetail projetActiviteRechercheDetail  = findById(id);
    findAssociatedLists(projetActiviteRechercheDetail);
return projetActiviteRechercheDetail;
}
private void findAssociatedLists(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
if(projetActiviteRechercheDetail==null || projetActiviteRechercheDetail.getId()==null) return ;
else{
        List<ProjetActiviteRechercheDetailEnjeuxIrd> projetActiviteRechercheDetailEnjeuxIrds = projetActiviteRechercheDetailEnjeuxIrdService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId());
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailEnjeuxIrds(projetActiviteRechercheDetailEnjeuxIrds);
        List<ProjetActiviteRechercheDetailInstrumentIrd> projetActiviteRechercheDetailInstrumentIrds = projetActiviteRechercheDetailInstrumentIrdService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId());
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailInstrumentIrds(projetActiviteRechercheDetailInstrumentIrds);
        List<ProjetActiviteRechercheDetailPays> projetActiviteRechercheDetailPayss = projetActiviteRechercheDetailPaysService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId());
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailPayss(projetActiviteRechercheDetailPayss);
        List<ProjetActiviteRechercheDetailInstitutionCoContractant> projetActiviteRechercheDetailInstitutionCoContractants = projetActiviteRechercheDetailInstitutionCoContractantService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId());
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailInstitutionCoContractants(projetActiviteRechercheDetailInstitutionCoContractants);
        List<ProjetActiviteRechercheDetailEtablissementLanceur> projetActiviteRechercheDetailEtablissementLanceurs = projetActiviteRechercheDetailEtablissementLanceurService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId());
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailEtablissementLanceurs(projetActiviteRechercheDetailEtablissementLanceurs);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        projetActiviteRechercheDetailEnjeuxIrdService.deleteByProjetActiviteRechercheDetailId(id);
        projetActiviteRechercheDetailInstrumentIrdService.deleteByProjetActiviteRechercheDetailId(id);
        projetActiviteRechercheDetailPaysService.deleteByProjetActiviteRechercheDetailId(id);
        projetActiviteRechercheDetailInstitutionCoContractantService.deleteByProjetActiviteRechercheDetailId(id);
        projetActiviteRechercheDetailEtablissementLanceurService.deleteByProjetActiviteRechercheDetailId(id);
}
}

    private void updateAssociatedLists(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
    if(projetActiviteRechercheDetail==null || projetActiviteRechercheDetail.getId()==null) return ;
    else{
            List<List<ProjetActiviteRechercheDetailEnjeuxIrd>> resultProjetActiviteRechercheDetailEnjeuxIrds= projetActiviteRechercheDetailEnjeuxIrdService.getToBeSavedAndToBeDeleted(projetActiviteRechercheDetailEnjeuxIrdService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId()),projetActiviteRechercheDetail.getProjetActiviteRechercheDetailEnjeuxIrds());
            projetActiviteRechercheDetailEnjeuxIrdService.delete(resultProjetActiviteRechercheDetailEnjeuxIrds.get(1));
            associateProjetActiviteRechercheDetailEnjeuxIrd(projetActiviteRechercheDetail,resultProjetActiviteRechercheDetailEnjeuxIrds.get(0));
            projetActiviteRechercheDetailEnjeuxIrdService.update(resultProjetActiviteRechercheDetailEnjeuxIrds.get(0));

            List<List<ProjetActiviteRechercheDetailInstrumentIrd>> resultProjetActiviteRechercheDetailInstrumentIrds= projetActiviteRechercheDetailInstrumentIrdService.getToBeSavedAndToBeDeleted(projetActiviteRechercheDetailInstrumentIrdService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId()),projetActiviteRechercheDetail.getProjetActiviteRechercheDetailInstrumentIrds());
            projetActiviteRechercheDetailInstrumentIrdService.delete(resultProjetActiviteRechercheDetailInstrumentIrds.get(1));
            associateProjetActiviteRechercheDetailInstrumentIrd(projetActiviteRechercheDetail,resultProjetActiviteRechercheDetailInstrumentIrds.get(0));
            projetActiviteRechercheDetailInstrumentIrdService.update(resultProjetActiviteRechercheDetailInstrumentIrds.get(0));

            List<List<ProjetActiviteRechercheDetailPays>> resultProjetActiviteRechercheDetailPayss= projetActiviteRechercheDetailPaysService.getToBeSavedAndToBeDeleted(projetActiviteRechercheDetailPaysService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId()),projetActiviteRechercheDetail.getProjetActiviteRechercheDetailPayss());
            projetActiviteRechercheDetailPaysService.delete(resultProjetActiviteRechercheDetailPayss.get(1));
            associateProjetActiviteRechercheDetailPays(projetActiviteRechercheDetail,resultProjetActiviteRechercheDetailPayss.get(0));
            projetActiviteRechercheDetailPaysService.update(resultProjetActiviteRechercheDetailPayss.get(0));

            List<List<ProjetActiviteRechercheDetailInstitutionCoContractant>> resultProjetActiviteRechercheDetailInstitutionCoContractants= projetActiviteRechercheDetailInstitutionCoContractantService.getToBeSavedAndToBeDeleted(projetActiviteRechercheDetailInstitutionCoContractantService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId()),projetActiviteRechercheDetail.getProjetActiviteRechercheDetailInstitutionCoContractants());
            projetActiviteRechercheDetailInstitutionCoContractantService.delete(resultProjetActiviteRechercheDetailInstitutionCoContractants.get(1));
            associateProjetActiviteRechercheDetailInstitutionCoContractant(projetActiviteRechercheDetail,resultProjetActiviteRechercheDetailInstitutionCoContractants.get(0));
            projetActiviteRechercheDetailInstitutionCoContractantService.update(resultProjetActiviteRechercheDetailInstitutionCoContractants.get(0));

            List<List<ProjetActiviteRechercheDetailEtablissementLanceur>> resultProjetActiviteRechercheDetailEtablissementLanceurs= projetActiviteRechercheDetailEtablissementLanceurService.getToBeSavedAndToBeDeleted(projetActiviteRechercheDetailEtablissementLanceurService.findByProjetActiviteRechercheDetailId(projetActiviteRechercheDetail.getId()),projetActiviteRechercheDetail.getProjetActiviteRechercheDetailEtablissementLanceurs());
            projetActiviteRechercheDetailEtablissementLanceurService.delete(resultProjetActiviteRechercheDetailEtablissementLanceurs.get(1));
            associateProjetActiviteRechercheDetailEtablissementLanceur(projetActiviteRechercheDetail,resultProjetActiviteRechercheDetailEtablissementLanceurs.get(0));
            projetActiviteRechercheDetailEtablissementLanceurService.update(resultProjetActiviteRechercheDetailEtablissementLanceurs.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(projetActiviteRechercheDetailDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
projetActiviteRechercheDetailDao.deleteById(id);
return 1;
}
}


@Override
public ProjetActiviteRechercheDetail update(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
ProjetActiviteRechercheDetail foundedProjetActiviteRechercheDetail = findById(projetActiviteRechercheDetail.getId());
if(foundedProjetActiviteRechercheDetail==null) return null;
else{
    updateAssociatedLists(projetActiviteRechercheDetail);
return  projetActiviteRechercheDetailDao.save(projetActiviteRechercheDetail);
}
}

@Override
public ProjetActiviteRechercheDetail save (ProjetActiviteRechercheDetail projetActiviteRechercheDetail){


    findStatusProjet(projetActiviteRechercheDetail);
//    findEtablissement(projetActiviteRechercheDetail);
    findPays(projetActiviteRechercheDetail);
    findProjetActiviteRecherche(projetActiviteRechercheDetail);

ProjetActiviteRechercheDetail savedProjetActiviteRechercheDetail = projetActiviteRechercheDetailDao.save(projetActiviteRechercheDetail);
       saveProjetActiviteRechercheDetailEnjeuxIrds(savedProjetActiviteRechercheDetail,projetActiviteRechercheDetail.getProjetActiviteRechercheDetailEnjeuxIrds());
       saveProjetActiviteRechercheDetailInstrumentIrds(savedProjetActiviteRechercheDetail,projetActiviteRechercheDetail.getProjetActiviteRechercheDetailInstrumentIrds());
       saveProjetActiviteRechercheDetailPayss(savedProjetActiviteRechercheDetail,projetActiviteRechercheDetail.getProjetActiviteRechercheDetailPayss());
       saveProjetActiviteRechercheDetailInstitutionCoContractants(savedProjetActiviteRechercheDetail,projetActiviteRechercheDetail.getProjetActiviteRechercheDetailInstitutionCoContractants());
       saveProjetActiviteRechercheDetailEtablissementLanceurs(savedProjetActiviteRechercheDetail,projetActiviteRechercheDetail.getProjetActiviteRechercheDetailEtablissementLanceurs());
return savedProjetActiviteRechercheDetail;
}

@Override
public List<ProjetActiviteRechercheDetail> save(List<ProjetActiviteRechercheDetail> projetActiviteRechercheDetails){
List<ProjetActiviteRechercheDetail> list = new ArrayList<ProjetActiviteRechercheDetail>();
for(ProjetActiviteRechercheDetail projetActiviteRechercheDetail: projetActiviteRechercheDetails){
list.add(save(projetActiviteRechercheDetail));
}
return list;
}



@Override
@Transactional
public int delete(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
    if(projetActiviteRechercheDetail.getId()==null) return -1;
    ProjetActiviteRechercheDetail foundedProjetActiviteRechercheDetail = findById(projetActiviteRechercheDetail.getId());
    if(foundedProjetActiviteRechercheDetail==null) return -1;
projetActiviteRechercheDetailDao.delete(foundedProjetActiviteRechercheDetail);
return 1;
}


public List<ProjetActiviteRechercheDetail> findByCriteria(ProjetActiviteRechercheDetailVo projetActiviteRechercheDetailVo){

String query = "SELECT o FROM ProjetActiviteRechercheDetail o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",projetActiviteRechercheDetailVo.getId());
            query += SearchUtil.addConstraint( "o", "sujetIntituleReponse","LIKE",projetActiviteRechercheDetailVo.getSujetIntituleReponse());
            query += SearchUtil.addConstraint( "o", "dureePrevuEnMois","=",projetActiviteRechercheDetailVo.getDureePrevuEnMois());
            query += SearchUtil.addConstraint( "o", "financementSpecifique","=",projetActiviteRechercheDetailVo.getFinancementSpecifique());
            query += SearchUtil.addConstraint( "o", "montantFinancementPrevu","=",projetActiviteRechercheDetailVo.getMontantFinancementPrevu());
            query += SearchUtil.addConstraintMinMax("o","dureePrevuEnMois",projetActiviteRechercheDetailVo.getDureePrevuEnMoisMin(),projetActiviteRechercheDetailVo.getDureePrevuEnMoisMax());
            query += SearchUtil.addConstraintMinMax("o","montantFinancementPrevu",projetActiviteRechercheDetailVo.getMontantFinancementPrevuMin(),projetActiviteRechercheDetailVo.getMontantFinancementPrevuMax());
    if(projetActiviteRechercheDetailVo.getStatusProjetVo()!=null){
        query += SearchUtil.addConstraint( "o", "statusProjet.id","=",projetActiviteRechercheDetailVo.getStatusProjetVo().getId());
            query += SearchUtil.addConstraint( "o", "statusProjet.code","LIKE",projetActiviteRechercheDetailVo.getStatusProjetVo().getCode());
    }

    if(projetActiviteRechercheDetailVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",projetActiviteRechercheDetailVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",projetActiviteRechercheDetailVo.getEtablissementVo().getCode());
    }

    if(projetActiviteRechercheDetailVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",projetActiviteRechercheDetailVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",projetActiviteRechercheDetailVo.getPaysVo().getCode());
    }

    if(projetActiviteRechercheDetailVo.getProjetActiviteRechercheVo()!=null){
        query += SearchUtil.addConstraint( "o", "projetActiviteRecherche.id","=",projetActiviteRechercheDetailVo.getProjetActiviteRechercheVo().getId());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveProjetActiviteRechercheDetailEnjeuxIrds(ProjetActiviteRechercheDetail projetActiviteRechercheDetail,List<ProjetActiviteRechercheDetailEnjeuxIrd> projetActiviteRechercheDetailEnjeuxIrds){

        if (ListUtil.isNotEmpty(projetActiviteRechercheDetail.getProjetActiviteRechercheDetailEnjeuxIrds())) {
        List<ProjetActiviteRechercheDetailEnjeuxIrd> savedProjetActiviteRechercheDetailEnjeuxIrds = new ArrayList<>();
        projetActiviteRechercheDetailEnjeuxIrds.forEach(element -> {
        element.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail);
        projetActiviteRechercheDetailEnjeuxIrdService.save(element);
        });
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailEnjeuxIrds(savedProjetActiviteRechercheDetailEnjeuxIrds);
        }
        }
        private  void saveProjetActiviteRechercheDetailInstrumentIrds(ProjetActiviteRechercheDetail projetActiviteRechercheDetail,List<ProjetActiviteRechercheDetailInstrumentIrd> projetActiviteRechercheDetailInstrumentIrds){

        if (ListUtil.isNotEmpty(projetActiviteRechercheDetail.getProjetActiviteRechercheDetailInstrumentIrds())) {
        List<ProjetActiviteRechercheDetailInstrumentIrd> savedProjetActiviteRechercheDetailInstrumentIrds = new ArrayList<>();
        projetActiviteRechercheDetailInstrumentIrds.forEach(element -> {
        element.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail);
        projetActiviteRechercheDetailInstrumentIrdService.save(element);
        });
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailInstrumentIrds(savedProjetActiviteRechercheDetailInstrumentIrds);
        }
        }
        private  void saveProjetActiviteRechercheDetailPayss(ProjetActiviteRechercheDetail projetActiviteRechercheDetail,List<ProjetActiviteRechercheDetailPays> projetActiviteRechercheDetailPayss){

        if (ListUtil.isNotEmpty(projetActiviteRechercheDetail.getProjetActiviteRechercheDetailPayss())) {
        List<ProjetActiviteRechercheDetailPays> savedProjetActiviteRechercheDetailPayss = new ArrayList<>();
        projetActiviteRechercheDetailPayss.forEach(element -> {
        element.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail);
        projetActiviteRechercheDetailPaysService.save(element);
        });
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailPayss(savedProjetActiviteRechercheDetailPayss);
        }
        }
        private  void saveProjetActiviteRechercheDetailInstitutionCoContractants(ProjetActiviteRechercheDetail projetActiviteRechercheDetail,List<ProjetActiviteRechercheDetailInstitutionCoContractant> projetActiviteRechercheDetailInstitutionCoContractants){

        if (ListUtil.isNotEmpty(projetActiviteRechercheDetail.getProjetActiviteRechercheDetailInstitutionCoContractants())) {
        List<ProjetActiviteRechercheDetailInstitutionCoContractant> savedProjetActiviteRechercheDetailInstitutionCoContractants = new ArrayList<>();
        projetActiviteRechercheDetailInstitutionCoContractants.forEach(element -> {
        element.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail);
        projetActiviteRechercheDetailInstitutionCoContractantService.save(element);
        });
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailInstitutionCoContractants(savedProjetActiviteRechercheDetailInstitutionCoContractants);
        }
        }
        private  void saveProjetActiviteRechercheDetailEtablissementLanceurs(ProjetActiviteRechercheDetail projetActiviteRechercheDetail,List<ProjetActiviteRechercheDetailEtablissementLanceur> projetActiviteRechercheDetailEtablissementLanceurs){

        if (ListUtil.isNotEmpty(projetActiviteRechercheDetail.getProjetActiviteRechercheDetailEtablissementLanceurs())) {
        List<ProjetActiviteRechercheDetailEtablissementLanceur> savedProjetActiviteRechercheDetailEtablissementLanceurs = new ArrayList<>();
        projetActiviteRechercheDetailEtablissementLanceurs.forEach(element -> {
        element.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail);
        projetActiviteRechercheDetailEtablissementLanceurService.save(element);
        });
        projetActiviteRechercheDetail.setProjetActiviteRechercheDetailEtablissementLanceurs(savedProjetActiviteRechercheDetailEtablissementLanceurs);
        }
        }

    private void findStatusProjet(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
        StatusProjet loadedStatusProjet =statusProjetService.findByIdOrCode(projetActiviteRechercheDetail.getStatusProjet());

    if(loadedStatusProjet==null ) {
        return;
    }
    projetActiviteRechercheDetail.setStatusProjet(loadedStatusProjet);
    }
    private void findEtablissement(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(projetActiviteRechercheDetail.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    projetActiviteRechercheDetail.setEtablissement(loadedEtablissement);
    } 	
    private void findPays(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
        Pays loadedPays =paysService.findByIdOrCode(projetActiviteRechercheDetail.getPays());

    if(loadedPays==null ) {
        return;
    }
    projetActiviteRechercheDetail.setPays(loadedPays);
    }
    private void findProjetActiviteRecherche(ProjetActiviteRechercheDetail projetActiviteRechercheDetail){
        ProjetActiviteRecherche loadedProjetActiviteRecherche = null;
        if(projetActiviteRechercheDetail.getProjetActiviteRecherche() != null && projetActiviteRechercheDetail.getProjetActiviteRecherche().getId() !=null)
        loadedProjetActiviteRecherche =projetActiviteRechercheService.findById(projetActiviteRechercheDetail.getProjetActiviteRecherche().getId());

    if(loadedProjetActiviteRecherche==null ) {
        return;
    }
    projetActiviteRechercheDetail.setProjetActiviteRecherche(loadedProjetActiviteRecherche);
    }

@Override
@Transactional
public void delete(List<ProjetActiviteRechercheDetail> projetActiviteRechercheDetails){
        if(ListUtil.isNotEmpty(projetActiviteRechercheDetails)){
        projetActiviteRechercheDetails.forEach(e->projetActiviteRechercheDetailDao.delete(e));
        }
}
@Override
public void update(List<ProjetActiviteRechercheDetail> projetActiviteRechercheDetails){
if(ListUtil.isNotEmpty(projetActiviteRechercheDetails)){
projetActiviteRechercheDetails.forEach(e->projetActiviteRechercheDetailDao.save(e));
}
}

private void associateProjetActiviteRechercheDetailEnjeuxIrd(ProjetActiviteRechercheDetail projetActiviteRechercheDetail, List<ProjetActiviteRechercheDetailEnjeuxIrd> projetActiviteRechercheDetailEnjeuxIrd) {
    if (ListUtil.isNotEmpty(projetActiviteRechercheDetailEnjeuxIrd)) {
        projetActiviteRechercheDetailEnjeuxIrd.forEach(e -> e.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail));
    }
    }
private void associateProjetActiviteRechercheDetailInstrumentIrd(ProjetActiviteRechercheDetail projetActiviteRechercheDetail, List<ProjetActiviteRechercheDetailInstrumentIrd> projetActiviteRechercheDetailInstrumentIrd) {
    if (ListUtil.isNotEmpty(projetActiviteRechercheDetailInstrumentIrd)) {
        projetActiviteRechercheDetailInstrumentIrd.forEach(e -> e.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail));
    }
    }
private void associateProjetActiviteRechercheDetailPays(ProjetActiviteRechercheDetail projetActiviteRechercheDetail, List<ProjetActiviteRechercheDetailPays> projetActiviteRechercheDetailPays) {
    if (ListUtil.isNotEmpty(projetActiviteRechercheDetailPays)) {
        projetActiviteRechercheDetailPays.forEach(e -> e.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail));
    }
    }
private void associateProjetActiviteRechercheDetailInstitutionCoContractant(ProjetActiviteRechercheDetail projetActiviteRechercheDetail, List<ProjetActiviteRechercheDetailInstitutionCoContractant> projetActiviteRechercheDetailInstitutionCoContractant) {
    if (ListUtil.isNotEmpty(projetActiviteRechercheDetailInstitutionCoContractant)) {
        projetActiviteRechercheDetailInstitutionCoContractant.forEach(e -> e.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail));
    }
    }
private void associateProjetActiviteRechercheDetailEtablissementLanceur(ProjetActiviteRechercheDetail projetActiviteRechercheDetail, List<ProjetActiviteRechercheDetailEtablissementLanceur> projetActiviteRechercheDetailEtablissementLanceur) {
    if (ListUtil.isNotEmpty(projetActiviteRechercheDetailEtablissementLanceur)) {
        projetActiviteRechercheDetailEtablissementLanceur.forEach(e -> e.setProjetActiviteRechercheDetail(projetActiviteRechercheDetail));
    }
    }


@Override
public List<List<ProjetActiviteRechercheDetail>>  getToBeSavedAndToBeDeleted(List<ProjetActiviteRechercheDetail> oldList,List<ProjetActiviteRechercheDetail> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
