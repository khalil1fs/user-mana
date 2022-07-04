package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublic;
        import com.ird.faa.bean.formulaire.FormatRencontre;
        import com.ird.faa.bean.formulaire.Campagne;
        import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.dao.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublicDao;
import com.ird.faa.service.admin.facade.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublicAdminService;
        import com.ird.faa.service.admin.facade.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.formulaire.FormatRencontreAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublicAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.CultureScientifiqueRecontreGrandPublicJeunePublicVo;
import com.ird.faa.service.util.*;
        import com.ird.faa.bean.formulaire.PublicCibleCultureScientifiqueRecontreGrandPublic;
import com.ird.faa.bean.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublic;
import com.ird.faa.bean.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic;
import com.ird.faa.bean.formulaire.PaysCultureScientifiqueRecontreGrandPublicJeunePublic;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CultureScientifiqueRecontreGrandPublicJeunePublicAdminServiceImpl extends AbstractServiceImpl<CultureScientifiqueRecontreGrandPublicJeunePublic> implements CultureScientifiqueRecontreGrandPublicJeunePublicAdminService {

@Autowired
private CultureScientifiqueRecontreGrandPublicJeunePublicDao cultureScientifiqueRecontreGrandPublicJeunePublicDao;

        @Autowired
        private PaysCultureScientifiqueRecontreGrandPublicJeunePublicAdminService paysCultureScientifiqueRecontreGrandPublicJeunePublicService ;
        @Autowired
        private PublicCibleCultureScientifiqueRecontreGrandPublicAdminService publicCibleCultureScientifiqueRecontreGrandPublicService ;
        @Autowired
        private EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicAdminService etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService ;
        @Autowired
        private FormatRencontreAdminService formatRencontreService ;
        @Autowired
        private ContexteCultureScientifiqueRecontreGrandPublicJeunePublicAdminService contexteCultureScientifiqueRecontreGrandPublicJeunePublicService ;
        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findAll(){
return cultureScientifiqueRecontreGrandPublicJeunePublicDao.findAll();
}

        @Override
        public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findByFormatRencontreCode(String code){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.findByFormatRencontreCode(code);
        }

        @Override
        @Transactional
        public int deleteByFormatRencontreCode(String code){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByFormatRencontreCode(code);
        }

        @Override
        public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findByFormatRencontreId(Long id){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.findByFormatRencontreId(id);
        }

        @Override
        @Transactional
        public int deleteByFormatRencontreId(Long id){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByFormatRencontreId(id);
        }


        @Override
        public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findByCampagneCode(String code){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByCampagneCode(code);
        }

        @Override
        public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findByCampagneId(Long id){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByCampagneId(id);
        }


        @Override
        public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findByChercheurNumeroMatricule(String numeroMatricule){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findByChercheurId(Long id){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return cultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteByChercheurId(id);
        }


@Override
public CultureScientifiqueRecontreGrandPublicJeunePublic findById(Long id){
if(id==null) return null;
return cultureScientifiqueRecontreGrandPublicJeunePublicDao.getOne(id);
}

@Override
public CultureScientifiqueRecontreGrandPublicJeunePublic findByIdWithAssociatedList(Long id){
CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic  = findById(id);
    findAssociatedLists(cultureScientifiqueRecontreGrandPublicJeunePublic);
return cultureScientifiqueRecontreGrandPublicJeunePublic;
}
private void findAssociatedLists(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){
if(cultureScientifiqueRecontreGrandPublicJeunePublic==null || cultureScientifiqueRecontreGrandPublicJeunePublic.getId()==null) return ;
else{
        List<PublicCibleCultureScientifiqueRecontreGrandPublic> publicCibleCultureScientifiqueRecontresGrandPublicJeunePublics = publicCibleCultureScientifiqueRecontreGrandPublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId());
        cultureScientifiqueRecontreGrandPublicJeunePublic.setPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics(publicCibleCultureScientifiqueRecontresGrandPublicJeunePublics);
        List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> contexteCultureScientifiqueRecontreGrandPublicJeunePublics = contexteCultureScientifiqueRecontreGrandPublicJeunePublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId());
        cultureScientifiqueRecontreGrandPublicJeunePublic.setContexteCultureScientifiqueRecontreGrandPublicJeunePublics(contexteCultureScientifiqueRecontreGrandPublicJeunePublics);
        List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> etablissementCultureScientifiqueRecontreGrandPublicJeunePublics = etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId());
        cultureScientifiqueRecontreGrandPublicJeunePublic.setEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics(etablissementCultureScientifiqueRecontreGrandPublicJeunePublics);
        List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> paysCultureScientifiqueRecontreGrandPublicJeunePublics = paysCultureScientifiqueRecontreGrandPublicJeunePublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId());
        cultureScientifiqueRecontreGrandPublicJeunePublic.setPaysCultureScientifiqueRecontreGrandPublicJeunePublics(paysCultureScientifiqueRecontreGrandPublicJeunePublics);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        publicCibleCultureScientifiqueRecontreGrandPublicService.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        contexteCultureScientifiqueRecontreGrandPublicJeunePublicService.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
        paysCultureScientifiqueRecontreGrandPublicJeunePublicService.deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(id);
}
}

    private void updateAssociatedLists(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){
    if(cultureScientifiqueRecontreGrandPublicJeunePublic==null || cultureScientifiqueRecontreGrandPublicJeunePublic.getId()==null) return ;
    else{
            List<List<PublicCibleCultureScientifiqueRecontreGrandPublic>> resultPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics= publicCibleCultureScientifiqueRecontreGrandPublicService.getToBeSavedAndToBeDeleted(publicCibleCultureScientifiqueRecontreGrandPublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId()),cultureScientifiqueRecontreGrandPublicJeunePublic.getPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics());
            publicCibleCultureScientifiqueRecontreGrandPublicService.delete(resultPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics.get(1));
            associatePublicCibleCultureScientifiqueRecontreGrandPublic(cultureScientifiqueRecontreGrandPublicJeunePublic,resultPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics.get(0));
            publicCibleCultureScientifiqueRecontreGrandPublicService.update(resultPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics.get(0));

            List<List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic>> resultContexteCultureScientifiqueRecontreGrandPublicJeunePublics= contexteCultureScientifiqueRecontreGrandPublicJeunePublicService.getToBeSavedAndToBeDeleted(contexteCultureScientifiqueRecontreGrandPublicJeunePublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId()),cultureScientifiqueRecontreGrandPublicJeunePublic.getContexteCultureScientifiqueRecontreGrandPublicJeunePublics());
            contexteCultureScientifiqueRecontreGrandPublicJeunePublicService.delete(resultContexteCultureScientifiqueRecontreGrandPublicJeunePublics.get(1));
            associateContexteCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic,resultContexteCultureScientifiqueRecontreGrandPublicJeunePublics.get(0));
            contexteCultureScientifiqueRecontreGrandPublicJeunePublicService.update(resultContexteCultureScientifiqueRecontreGrandPublicJeunePublics.get(0));

            List<List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic>> resultEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics= etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService.getToBeSavedAndToBeDeleted(etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId()),cultureScientifiqueRecontreGrandPublicJeunePublic.getEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics());
            etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService.delete(resultEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics.get(1));
            associateEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic,resultEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics.get(0));
            etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService.update(resultEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics.get(0));

            List<List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic>> resultPaysCultureScientifiqueRecontreGrandPublicJeunePublics= paysCultureScientifiqueRecontreGrandPublicJeunePublicService.getToBeSavedAndToBeDeleted(paysCultureScientifiqueRecontreGrandPublicJeunePublicService.findByCultureScientifiqueRecontreGrandPublicJeunePublicId(cultureScientifiqueRecontreGrandPublicJeunePublic.getId()),cultureScientifiqueRecontreGrandPublicJeunePublic.getPaysCultureScientifiqueRecontreGrandPublicJeunePublics());
            paysCultureScientifiqueRecontreGrandPublicJeunePublicService.delete(resultPaysCultureScientifiqueRecontreGrandPublicJeunePublics.get(1));
            associatePaysCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic,resultPaysCultureScientifiqueRecontreGrandPublicJeunePublics.get(0));
            paysCultureScientifiqueRecontreGrandPublicJeunePublicService.update(resultPaysCultureScientifiqueRecontreGrandPublicJeunePublics.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(cultureScientifiqueRecontreGrandPublicJeunePublicDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
cultureScientifiqueRecontreGrandPublicJeunePublicDao.deleteById(id);
return 1;
}
}


@Override
public CultureScientifiqueRecontreGrandPublicJeunePublic update(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){
CultureScientifiqueRecontreGrandPublicJeunePublic foundedCultureScientifiqueRecontreGrandPublicJeunePublic = findById(cultureScientifiqueRecontreGrandPublicJeunePublic.getId());
if(foundedCultureScientifiqueRecontreGrandPublicJeunePublic==null) return null;
else{
    updateAssociatedLists(cultureScientifiqueRecontreGrandPublicJeunePublic);
return  cultureScientifiqueRecontreGrandPublicJeunePublicDao.save(cultureScientifiqueRecontreGrandPublicJeunePublic);
}
}

@Override
public CultureScientifiqueRecontreGrandPublicJeunePublic save (CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){


    findFormatRencontre(cultureScientifiqueRecontreGrandPublicJeunePublic);
    findCampagne(cultureScientifiqueRecontreGrandPublicJeunePublic);
    findChercheur(cultureScientifiqueRecontreGrandPublicJeunePublic);

CultureScientifiqueRecontreGrandPublicJeunePublic savedCultureScientifiqueRecontreGrandPublicJeunePublic = cultureScientifiqueRecontreGrandPublicJeunePublicDao.save(cultureScientifiqueRecontreGrandPublicJeunePublic);
       savePublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics(savedCultureScientifiqueRecontreGrandPublicJeunePublic,cultureScientifiqueRecontreGrandPublicJeunePublic.getPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics());
       saveContexteCultureScientifiqueRecontreGrandPublicJeunePublics(savedCultureScientifiqueRecontreGrandPublicJeunePublic,cultureScientifiqueRecontreGrandPublicJeunePublic.getContexteCultureScientifiqueRecontreGrandPublicJeunePublics());
       saveEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics(savedCultureScientifiqueRecontreGrandPublicJeunePublic,cultureScientifiqueRecontreGrandPublicJeunePublic.getEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics());
       savePaysCultureScientifiqueRecontreGrandPublicJeunePublics(savedCultureScientifiqueRecontreGrandPublicJeunePublic,cultureScientifiqueRecontreGrandPublicJeunePublic.getPaysCultureScientifiqueRecontreGrandPublicJeunePublics());
return savedCultureScientifiqueRecontreGrandPublicJeunePublic;
}

@Override
public List<CultureScientifiqueRecontreGrandPublicJeunePublic> save(List<CultureScientifiqueRecontreGrandPublicJeunePublic> cultureScientifiqueRecontreGrandPublicJeunePublics){
List<CultureScientifiqueRecontreGrandPublicJeunePublic> list = new ArrayList<CultureScientifiqueRecontreGrandPublicJeunePublic>();
for(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic: cultureScientifiqueRecontreGrandPublicJeunePublics){
list.add(save(cultureScientifiqueRecontreGrandPublicJeunePublic));
}
return list;
}



@Override
@Transactional
public int delete(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){
    if(cultureScientifiqueRecontreGrandPublicJeunePublic.getId()==null) return -1;
    CultureScientifiqueRecontreGrandPublicJeunePublic foundedCultureScientifiqueRecontreGrandPublicJeunePublic = findById(cultureScientifiqueRecontreGrandPublicJeunePublic.getId());
    if(foundedCultureScientifiqueRecontreGrandPublicJeunePublic==null) return -1;
cultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(foundedCultureScientifiqueRecontreGrandPublicJeunePublic);
return 1;
}


public List<CultureScientifiqueRecontreGrandPublicJeunePublic> findByCriteria(CultureScientifiqueRecontreGrandPublicJeunePublicVo cultureScientifiqueRecontreGrandPublicJeunePublicVo){

String query = "SELECT o FROM CultureScientifiqueRecontreGrandPublicJeunePublic o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getId());
            query += SearchUtil.addConstraint( "o", "tempsEstimePourCetteAnnne","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getTempsEstimePourCetteAnnne());
            query += SearchUtil.addConstraint( "o", "intituleSujet","LIKE",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getIntituleSujet());
            query += SearchUtil.addConstraint( "o", "periodeAnnee","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getPeriodeAnnee());
            query += SearchUtil.addConstraint( "o", "periodeMois","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getPeriodeMois());
            query += SearchUtil.addConstraint( "o", "evenementGrandPublic","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getEvenementGrandPublic());
            query += SearchUtil.addConstraint( "o", "volumePublic","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getVolumePublic());
            query += SearchUtil.addConstraint( "o", "lienWeb","LIKE",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getLienWeb());
            query += SearchUtil.addConstraintMinMax("o","tempsEstimePourCetteAnnne",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getTempsEstimePourCetteAnnneMin(),cultureScientifiqueRecontreGrandPublicJeunePublicVo.getTempsEstimePourCetteAnnneMax());
            query += SearchUtil.addConstraintMinMax("o","periodeAnnee",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getPeriodeAnneeMin(),cultureScientifiqueRecontreGrandPublicJeunePublicVo.getPeriodeAnneeMax());
            query += SearchUtil.addConstraintMinMax("o","periodeMois",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getPeriodeMoisMin(),cultureScientifiqueRecontreGrandPublicJeunePublicVo.getPeriodeMoisMax());
            query += SearchUtil.addConstraintMinMax("o","volumePublic",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getVolumePublicMin(),cultureScientifiqueRecontreGrandPublicJeunePublicVo.getVolumePublicMax());
    if(cultureScientifiqueRecontreGrandPublicJeunePublicVo.getFormatRencontreVo()!=null){
        query += SearchUtil.addConstraint( "o", "formatRencontre.id","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getFormatRencontreVo().getId());
            query += SearchUtil.addConstraint( "o", "formatRencontre.code","LIKE",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getFormatRencontreVo().getCode());
    }

    if(cultureScientifiqueRecontreGrandPublicJeunePublicVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getCampagneVo().getCode());
    }

    if(cultureScientifiqueRecontreGrandPublicJeunePublicVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",cultureScientifiqueRecontreGrandPublicJeunePublicVo.getChercheurVo().getNumeroMatricule());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void savePublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic,List<PublicCibleCultureScientifiqueRecontreGrandPublic> publicCibleCultureScientifiqueRecontresGrandPublicJeunePublics){

        if (ListUtil.isNotEmpty(cultureScientifiqueRecontreGrandPublicJeunePublic.getPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics())) {
        List<PublicCibleCultureScientifiqueRecontreGrandPublic> savedPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics = new ArrayList<>();
        publicCibleCultureScientifiqueRecontresGrandPublicJeunePublics.forEach(element -> {
        element.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic);
        publicCibleCultureScientifiqueRecontreGrandPublicService.save(element);
        });
        cultureScientifiqueRecontreGrandPublicJeunePublic.setPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics(savedPublicCibleCultureScientifiqueRecontresGrandPublicJeunePublics);
        }
        }
        private  void saveContexteCultureScientifiqueRecontreGrandPublicJeunePublics(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic,List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> contexteCultureScientifiqueRecontreGrandPublicJeunePublics){

        if (ListUtil.isNotEmpty(cultureScientifiqueRecontreGrandPublicJeunePublic.getContexteCultureScientifiqueRecontreGrandPublicJeunePublics())) {
        List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> savedContexteCultureScientifiqueRecontreGrandPublicJeunePublics = new ArrayList<>();
        contexteCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(element -> {
        element.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic);
        contexteCultureScientifiqueRecontreGrandPublicJeunePublicService.save(element);
        });
        cultureScientifiqueRecontreGrandPublicJeunePublic.setContexteCultureScientifiqueRecontreGrandPublicJeunePublics(savedContexteCultureScientifiqueRecontreGrandPublicJeunePublics);
        }
        }
        private  void saveEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic,List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> etablissementCultureScientifiqueRecontreGrandPublicJeunePublics){

        if (ListUtil.isNotEmpty(cultureScientifiqueRecontreGrandPublicJeunePublic.getEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics())) {
        List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> savedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics = new ArrayList<>();
        etablissementCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(element -> {
        element.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic);
        etablissementCultureScientifiqueRecontreGrandPublicJeunePublicService.save(element);
        });
        cultureScientifiqueRecontreGrandPublicJeunePublic.setEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics(savedEtablissementCultureScientifiqueRecontreGrandPublicJeunePublics);
        }
        }
        private  void savePaysCultureScientifiqueRecontreGrandPublicJeunePublics(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic,List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> paysCultureScientifiqueRecontreGrandPublicJeunePublics){

        if (ListUtil.isNotEmpty(cultureScientifiqueRecontreGrandPublicJeunePublic.getPaysCultureScientifiqueRecontreGrandPublicJeunePublics())) {
        List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> savedPaysCultureScientifiqueRecontreGrandPublicJeunePublics = new ArrayList<>();
        paysCultureScientifiqueRecontreGrandPublicJeunePublics.forEach(element -> {
        element.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic);
        paysCultureScientifiqueRecontreGrandPublicJeunePublicService.save(element);
        });
        cultureScientifiqueRecontreGrandPublicJeunePublic.setPaysCultureScientifiqueRecontreGrandPublicJeunePublics(savedPaysCultureScientifiqueRecontreGrandPublicJeunePublics);
        }
        }

    private void findFormatRencontre(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){
        FormatRencontre loadedFormatRencontre =formatRencontreService.findByIdOrCode(cultureScientifiqueRecontreGrandPublicJeunePublic.getFormatRencontre());

    if(loadedFormatRencontre==null ) {
        return;
    }
    cultureScientifiqueRecontreGrandPublicJeunePublic.setFormatRencontre(loadedFormatRencontre);
    }
    private void findCampagne(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){
        Campagne loadedCampagne =campagneService.findByIdOrCode(cultureScientifiqueRecontreGrandPublicJeunePublic.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    cultureScientifiqueRecontreGrandPublicJeunePublic.setCampagne(loadedCampagne);
    }
    private void findChercheur(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(cultureScientifiqueRecontreGrandPublicJeunePublic.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    cultureScientifiqueRecontreGrandPublicJeunePublic.setChercheur(loadedChercheur);
    }

@Override
@Transactional
public void delete(List<CultureScientifiqueRecontreGrandPublicJeunePublic> cultureScientifiqueRecontreGrandPublicJeunePublics){
        if(ListUtil.isNotEmpty(cultureScientifiqueRecontreGrandPublicJeunePublics)){
        cultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->cultureScientifiqueRecontreGrandPublicJeunePublicDao.delete(e));
        }
}
@Override
public void update(List<CultureScientifiqueRecontreGrandPublicJeunePublic> cultureScientifiqueRecontreGrandPublicJeunePublics){
if(ListUtil.isNotEmpty(cultureScientifiqueRecontreGrandPublicJeunePublics)){
cultureScientifiqueRecontreGrandPublicJeunePublics.forEach(e->cultureScientifiqueRecontreGrandPublicJeunePublicDao.save(e));
}
}

private void associatePublicCibleCultureScientifiqueRecontreGrandPublic(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic, List<PublicCibleCultureScientifiqueRecontreGrandPublic> publicCibleCultureScientifiqueRecontreGrandPublic) {
    if (ListUtil.isNotEmpty(publicCibleCultureScientifiqueRecontreGrandPublic)) {
        publicCibleCultureScientifiqueRecontreGrandPublic.forEach(e -> e.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic));
    }
    }
private void associateContexteCultureScientifiqueRecontreGrandPublicJeunePublic(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic, List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> contexteCultureScientifiqueRecontreGrandPublicJeunePublic) {
    if (ListUtil.isNotEmpty(contexteCultureScientifiqueRecontreGrandPublicJeunePublic)) {
        contexteCultureScientifiqueRecontreGrandPublicJeunePublic.forEach(e -> e.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic));
    }
    }
private void associateEtablissementCultureScientifiqueRecontreGrandPublicJeunePublic(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic, List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> etablissementCultureScientifiqueRecontreGrandPublicJeunePublic) {
    if (ListUtil.isNotEmpty(etablissementCultureScientifiqueRecontreGrandPublicJeunePublic)) {
        etablissementCultureScientifiqueRecontreGrandPublicJeunePublic.forEach(e -> e.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic));
    }
    }
private void associatePaysCultureScientifiqueRecontreGrandPublicJeunePublic(CultureScientifiqueRecontreGrandPublicJeunePublic cultureScientifiqueRecontreGrandPublicJeunePublic, List<PaysCultureScientifiqueRecontreGrandPublicJeunePublic> paysCultureScientifiqueRecontreGrandPublicJeunePublic) {
    if (ListUtil.isNotEmpty(paysCultureScientifiqueRecontreGrandPublicJeunePublic)) {
        paysCultureScientifiqueRecontreGrandPublicJeunePublic.forEach(e -> e.setCultureScientifiqueRecontreGrandPublicJeunePublic(cultureScientifiqueRecontreGrandPublicJeunePublic));
    }
    }


@Override
public List<List<CultureScientifiqueRecontreGrandPublicJeunePublic>>  getToBeSavedAndToBeDeleted(List<CultureScientifiqueRecontreGrandPublicJeunePublic> oldList,List<CultureScientifiqueRecontreGrandPublicJeunePublic> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
