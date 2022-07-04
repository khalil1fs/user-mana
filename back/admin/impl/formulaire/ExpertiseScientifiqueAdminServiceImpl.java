package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.ExpertiseScientifique;
        import com.ird.faa.bean.referentiel.TypeExpertise;
        import com.ird.faa.bean.referentiel.Pays;
        import com.ird.faa.bean.referentiel.Etablissement;
        import com.ird.faa.bean.config.EtatEtapeCampagne;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.Campagne;
import com.ird.faa.dao.formulaire.ExpertiseScientifiqueDao;
import com.ird.faa.service.admin.facade.formulaire.ExpertiseScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueExpertiseScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.TypeExpertiseAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirExpertiseScientifiqueAdminService;
        import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.ExpertiseScientifiqueVo;
import com.ird.faa.service.util.*;
        import com.ird.faa.bean.formulaire.CommunauteSavoirExpertiseScientifique;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueExpertiseScientifique;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ExpertiseScientifiqueAdminServiceImpl extends AbstractServiceImpl<ExpertiseScientifique> implements ExpertiseScientifiqueAdminService {

@Autowired
private ExpertiseScientifiqueDao expertiseScientifiqueDao;

        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private DisciplineScientifiqueExpertiseScientifiqueAdminService disciplineScientifiqueExpertiseScientifiqueService ;
        @Autowired
        private TypeExpertiseAdminService typeExpertiseService ;
        @Autowired
        private CommunauteSavoirExpertiseScientifiqueAdminService communauteSavoirExpertiseScientifiqueService ;
        @Autowired
        private EtablissementAdminService etablissementService ;
        @Autowired
        private CampagneAdminService campagneService ;
        @Autowired
        private PaysAdminService paysService ;
        @Autowired
        private ChercheurAdminService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<ExpertiseScientifique> findAll(){
return expertiseScientifiqueDao.findAll();
}

        @Override
        public List<ExpertiseScientifique> findByTypeExpertiseCode(String code){
        return expertiseScientifiqueDao.findByTypeExpertiseCode(code);
        }

        @Override
        @Transactional
        public int deleteByTypeExpertiseCode(String code){
        return expertiseScientifiqueDao.deleteByTypeExpertiseCode(code);
        }

        @Override
        public List<ExpertiseScientifique> findByTypeExpertiseId(Long id){
        return expertiseScientifiqueDao.findByTypeExpertiseId(id);
        }

        @Override
        @Transactional
        public int deleteByTypeExpertiseId(Long id){
        return expertiseScientifiqueDao.deleteByTypeExpertiseId(id);
        }


        @Override
        public List<ExpertiseScientifique> findByPaysCode(String code){
        return expertiseScientifiqueDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return expertiseScientifiqueDao.deleteByPaysCode(code);
        }

        @Override
        public List<ExpertiseScientifique> findByPaysId(Long id){
        return expertiseScientifiqueDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return expertiseScientifiqueDao.deleteByPaysId(id);
        }


        @Override
        public List<ExpertiseScientifique> findByEtablissementCode(String code){
        return expertiseScientifiqueDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return expertiseScientifiqueDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<ExpertiseScientifique> findByEtablissementId(Long id){
        return expertiseScientifiqueDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return expertiseScientifiqueDao.deleteByEtablissementId(id);
        }


        @Override
        public List<ExpertiseScientifique> findByEtatEtapeCampagneCode(String code){
        return expertiseScientifiqueDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return expertiseScientifiqueDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<ExpertiseScientifique> findByEtatEtapeCampagneId(Long id){
        return expertiseScientifiqueDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return expertiseScientifiqueDao.deleteByEtatEtapeCampagneId(id);
        }


        @Override
        public List<ExpertiseScientifique> findByChercheurNumeroMatricule(String numeroMatricule){
        return expertiseScientifiqueDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return expertiseScientifiqueDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<ExpertiseScientifique> findByChercheurId(Long id){
        return expertiseScientifiqueDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return expertiseScientifiqueDao.deleteByChercheurId(id);
        }


        @Override
        public List<ExpertiseScientifique> findByCampagneCode(String code){
        return expertiseScientifiqueDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return expertiseScientifiqueDao.deleteByCampagneCode(code);
        }

        @Override
        public List<ExpertiseScientifique> findByCampagneId(Long id){
        return expertiseScientifiqueDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return expertiseScientifiqueDao.deleteByCampagneId(id);
        }

    @Override
    public ExpertiseScientifique findByAnnee(Integer annee){
    if( annee==null) return null;
    return expertiseScientifiqueDao.findByAnnee(annee);
    }

    @Override
    @Transactional
    public int deleteByAnnee(Integer  annee) {
    return expertiseScientifiqueDao.deleteByAnnee(annee);
    }
    @Override
    public ExpertiseScientifique findByIdOrAnnee(ExpertiseScientifique expertiseScientifique){
    ExpertiseScientifique resultat=null;
    if(expertiseScientifique == null || ( expertiseScientifique.getAnnee()==null && expertiseScientifique.getId()==null))
    return resultat;
    else{
    if(expertiseScientifique.getId() != null){
    resultat= expertiseScientifiqueDao.findById(expertiseScientifique.getId()).get();
    }else if(StringUtil.isNotEmpty(expertiseScientifique.getAnnee())) {
    resultat= expertiseScientifiqueDao.findByAnnee(expertiseScientifique.getAnnee());
    }
    return resultat;
    }
    }

@Override
public ExpertiseScientifique findById(Long id){
if(id==null) return null;
return expertiseScientifiqueDao.getOne(id);
}

@Override
public ExpertiseScientifique findByIdWithAssociatedList(Long id){
ExpertiseScientifique expertiseScientifique  = findById(id);
    findAssociatedLists(expertiseScientifique);
return expertiseScientifique;
}
private void findAssociatedLists(ExpertiseScientifique expertiseScientifique){
if(expertiseScientifique==null || expertiseScientifique.getId()==null) return ;
else{
        List<CommunauteSavoirExpertiseScientifique> communauteSavoirExpertiseScientifiques = communauteSavoirExpertiseScientifiqueService.findByExpertiseScientifiqueId(expertiseScientifique.getId());
        expertiseScientifique.setCommunauteSavoirExpertiseScientifiques(communauteSavoirExpertiseScientifiques);
        List<DisciplineScientifiqueExpertiseScientifique> disciplineScientifiqueExpertiseScientifiques = disciplineScientifiqueExpertiseScientifiqueService.findByExpertiseScientifiqueId(expertiseScientifique.getId());
        expertiseScientifique.setDisciplineScientifiqueExpertiseScientifiques(disciplineScientifiqueExpertiseScientifiques);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        communauteSavoirExpertiseScientifiqueService.deleteByExpertiseScientifiqueId(id);
        disciplineScientifiqueExpertiseScientifiqueService.deleteByExpertiseScientifiqueId(id);
}
}

    private void updateAssociatedLists(ExpertiseScientifique expertiseScientifique){
    if(expertiseScientifique==null || expertiseScientifique.getId()==null) return ;
    else{
            List<List<CommunauteSavoirExpertiseScientifique>> resultCommunauteSavoirExpertiseScientifiques= communauteSavoirExpertiseScientifiqueService.getToBeSavedAndToBeDeleted(communauteSavoirExpertiseScientifiqueService.findByExpertiseScientifiqueId(expertiseScientifique.getId()),expertiseScientifique.getCommunauteSavoirExpertiseScientifiques());
            communauteSavoirExpertiseScientifiqueService.delete(resultCommunauteSavoirExpertiseScientifiques.get(1));
            associateCommunauteSavoirExpertiseScientifique(expertiseScientifique,resultCommunauteSavoirExpertiseScientifiques.get(0));
            communauteSavoirExpertiseScientifiqueService.update(resultCommunauteSavoirExpertiseScientifiques.get(0));

            List<List<DisciplineScientifiqueExpertiseScientifique>> resultDisciplineScientifiqueExpertiseScientifiques= disciplineScientifiqueExpertiseScientifiqueService.getToBeSavedAndToBeDeleted(disciplineScientifiqueExpertiseScientifiqueService.findByExpertiseScientifiqueId(expertiseScientifique.getId()),expertiseScientifique.getDisciplineScientifiqueExpertiseScientifiques());
            disciplineScientifiqueExpertiseScientifiqueService.delete(resultDisciplineScientifiqueExpertiseScientifiques.get(1));
            associateDisciplineScientifiqueExpertiseScientifique(expertiseScientifique,resultDisciplineScientifiqueExpertiseScientifiques.get(0));
            disciplineScientifiqueExpertiseScientifiqueService.update(resultDisciplineScientifiqueExpertiseScientifiques.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(expertiseScientifiqueDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
expertiseScientifiqueDao.deleteById(id);
return 1;
}
}


@Override
public ExpertiseScientifique update(ExpertiseScientifique expertiseScientifique){
ExpertiseScientifique foundedExpertiseScientifique = findById(expertiseScientifique.getId());
if(foundedExpertiseScientifique==null) return null;
else{
    updateAssociatedLists(expertiseScientifique);
return  expertiseScientifiqueDao.save(expertiseScientifique);
}
}

@Override
public ExpertiseScientifique save (ExpertiseScientifique expertiseScientifique){
    ExpertiseScientifique foundedExpertiseScientifique = findByAnnee(expertiseScientifique.getAnnee());
   if(foundedExpertiseScientifique!=null) return null;


    findTypeExpertise(expertiseScientifique);
    findPays(expertiseScientifique);
    findEtablissement(expertiseScientifique);
    findEtatEtapeCampagne(expertiseScientifique);
    findChercheur(expertiseScientifique);
    findCampagne(expertiseScientifique);

ExpertiseScientifique savedExpertiseScientifique = expertiseScientifiqueDao.save(expertiseScientifique);
       saveCommunauteSavoirExpertiseScientifiques(savedExpertiseScientifique,expertiseScientifique.getCommunauteSavoirExpertiseScientifiques());
       saveDisciplineScientifiqueExpertiseScientifiques(savedExpertiseScientifique,expertiseScientifique.getDisciplineScientifiqueExpertiseScientifiques());
return savedExpertiseScientifique;
}

@Override
public List<ExpertiseScientifique> save(List<ExpertiseScientifique> expertiseScientifiques){
List<ExpertiseScientifique> list = new ArrayList<ExpertiseScientifique>();
for(ExpertiseScientifique expertiseScientifique: expertiseScientifiques){
list.add(save(expertiseScientifique));
}
return list;
}



@Override
@Transactional
public int delete(ExpertiseScientifique expertiseScientifique){
    if(expertiseScientifique.getAnnee()==null) return -1;

    ExpertiseScientifique foundedExpertiseScientifique = findByAnnee(expertiseScientifique.getAnnee());
    if(foundedExpertiseScientifique==null) return -1;
expertiseScientifiqueDao.delete(foundedExpertiseScientifique);
return 1;
}


public List<ExpertiseScientifique> findByCriteria(ExpertiseScientifiqueVo expertiseScientifiqueVo){

String query = "SELECT o FROM ExpertiseScientifique o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",expertiseScientifiqueVo.getId());
            query += SearchUtil.addConstraint( "o", "annee","=",expertiseScientifiqueVo.getAnnee());
            query += SearchUtil.addConstraint( "o", "intitule","LIKE",expertiseScientifiqueVo.getIntitule());
            query += SearchUtil.addConstraint( "o", "nombreJourConsacrePourCetteAnnee","=",expertiseScientifiqueVo.getNombreJourConsacrePourCetteAnnee());
            query += SearchUtil.addConstraint( "o", "periodeRemiseRapportMois","=",expertiseScientifiqueVo.getPeriodeRemiseRapportMois());
            query += SearchUtil.addConstraint( "o", "periodeRemiseRapportAnnee","=",expertiseScientifiqueVo.getPeriodeRemiseRapportAnnee());
            query += SearchUtil.addConstraint( "o", "commentairesEventuels","LIKE",expertiseScientifiqueVo.getCommentairesEventuels());
            query += SearchUtil.addConstraintMinMax("o","annee",expertiseScientifiqueVo.getAnneeMin(),expertiseScientifiqueVo.getAnneeMax());
            query += SearchUtil.addConstraintMinMax("o","nombreJourConsacrePourCetteAnnee",expertiseScientifiqueVo.getNombreJourConsacrePourCetteAnneeMin(),expertiseScientifiqueVo.getNombreJourConsacrePourCetteAnneeMax());
            query += SearchUtil.addConstraintMinMax("o","periodeRemiseRapportMois",expertiseScientifiqueVo.getPeriodeRemiseRapportMoisMin(),expertiseScientifiqueVo.getPeriodeRemiseRapportMoisMax());
            query += SearchUtil.addConstraintMinMax("o","periodeRemiseRapportAnnee",expertiseScientifiqueVo.getPeriodeRemiseRapportAnneeMin(),expertiseScientifiqueVo.getPeriodeRemiseRapportAnneeMax());
    if(expertiseScientifiqueVo.getTypeExpertiseVo()!=null){
        query += SearchUtil.addConstraint( "o", "typeExpertise.id","=",expertiseScientifiqueVo.getTypeExpertiseVo().getId());
            query += SearchUtil.addConstraint( "o", "typeExpertise.code","LIKE",expertiseScientifiqueVo.getTypeExpertiseVo().getCode());
    }

    if(expertiseScientifiqueVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",expertiseScientifiqueVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",expertiseScientifiqueVo.getPaysVo().getCode());
    }

    if(expertiseScientifiqueVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",expertiseScientifiqueVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",expertiseScientifiqueVo.getEtablissementVo().getCode());
    }

    if(expertiseScientifiqueVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",expertiseScientifiqueVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",expertiseScientifiqueVo.getEtatEtapeCampagneVo().getCode());
    }

    if(expertiseScientifiqueVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",expertiseScientifiqueVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",expertiseScientifiqueVo.getChercheurVo().getNumeroMatricule());
    }

    if(expertiseScientifiqueVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",expertiseScientifiqueVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",expertiseScientifiqueVo.getCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveCommunauteSavoirExpertiseScientifiques(ExpertiseScientifique expertiseScientifique,List<CommunauteSavoirExpertiseScientifique> communauteSavoirExpertiseScientifiques){

        if (ListUtil.isNotEmpty(expertiseScientifique.getCommunauteSavoirExpertiseScientifiques())) {
        List<CommunauteSavoirExpertiseScientifique> savedCommunauteSavoirExpertiseScientifiques = new ArrayList<>();
        communauteSavoirExpertiseScientifiques.forEach(element -> {
        element.setExpertiseScientifique(expertiseScientifique);
        communauteSavoirExpertiseScientifiqueService.save(element);
        });
        expertiseScientifique.setCommunauteSavoirExpertiseScientifiques(savedCommunauteSavoirExpertiseScientifiques);
        }
        }
        private  void saveDisciplineScientifiqueExpertiseScientifiques(ExpertiseScientifique expertiseScientifique,List<DisciplineScientifiqueExpertiseScientifique> disciplineScientifiqueExpertiseScientifiques){

        if (ListUtil.isNotEmpty(expertiseScientifique.getDisciplineScientifiqueExpertiseScientifiques())) {
        List<DisciplineScientifiqueExpertiseScientifique> savedDisciplineScientifiqueExpertiseScientifiques = new ArrayList<>();
        disciplineScientifiqueExpertiseScientifiques.forEach(element -> {
        element.setExpertiseScientifique(expertiseScientifique);
        disciplineScientifiqueExpertiseScientifiqueService.save(element);
        });
        expertiseScientifique.setDisciplineScientifiqueExpertiseScientifiques(savedDisciplineScientifiqueExpertiseScientifiques);
        }
        }

    private void findTypeExpertise(ExpertiseScientifique expertiseScientifique){
        TypeExpertise loadedTypeExpertise =typeExpertiseService.findByIdOrCode(expertiseScientifique.getTypeExpertise());

    if(loadedTypeExpertise==null ) {
        return;
    }
    expertiseScientifique.setTypeExpertise(loadedTypeExpertise);
    }
    private void findPays(ExpertiseScientifique expertiseScientifique){
        Pays loadedPays =paysService.findByIdOrCode(expertiseScientifique.getPays());

    if(loadedPays==null ) {
        return;
    }
    expertiseScientifique.setPays(loadedPays);
    }
    private void findEtablissement(ExpertiseScientifique expertiseScientifique){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(expertiseScientifique.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    expertiseScientifique.setEtablissement(loadedEtablissement);
    }
    private void findEtatEtapeCampagne(ExpertiseScientifique expertiseScientifique){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(expertiseScientifique.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    expertiseScientifique.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }
    private void findChercheur(ExpertiseScientifique expertiseScientifique){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(expertiseScientifique.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    expertiseScientifique.setChercheur(loadedChercheur);
    }
    private void findCampagne(ExpertiseScientifique expertiseScientifique){
        Campagne loadedCampagne =campagneService.findByIdOrCode(expertiseScientifique.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    expertiseScientifique.setCampagne(loadedCampagne);
    }

@Override
@Transactional
public void delete(List<ExpertiseScientifique> expertiseScientifiques){
        if(ListUtil.isNotEmpty(expertiseScientifiques)){
        expertiseScientifiques.forEach(e->expertiseScientifiqueDao.delete(e));
        }
}
@Override
public void update(List<ExpertiseScientifique> expertiseScientifiques){
if(ListUtil.isNotEmpty(expertiseScientifiques)){
expertiseScientifiques.forEach(e->expertiseScientifiqueDao.save(e));
}
}

private void associateCommunauteSavoirExpertiseScientifique(ExpertiseScientifique expertiseScientifique, List<CommunauteSavoirExpertiseScientifique> communauteSavoirExpertiseScientifique) {
    if (ListUtil.isNotEmpty(communauteSavoirExpertiseScientifique)) {
        communauteSavoirExpertiseScientifique.forEach(e -> e.setExpertiseScientifique(expertiseScientifique));
    }
    }
private void associateDisciplineScientifiqueExpertiseScientifique(ExpertiseScientifique expertiseScientifique, List<DisciplineScientifiqueExpertiseScientifique> disciplineScientifiqueExpertiseScientifique) {
    if (ListUtil.isNotEmpty(disciplineScientifiqueExpertiseScientifique)) {
        disciplineScientifiqueExpertiseScientifique.forEach(e -> e.setExpertiseScientifique(expertiseScientifique));
    }
    }


@Override
public List<List<ExpertiseScientifique>>  getToBeSavedAndToBeDeleted(List<ExpertiseScientifique> oldList,List<ExpertiseScientifique> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
