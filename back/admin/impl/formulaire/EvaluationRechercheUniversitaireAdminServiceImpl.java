package com.ird.faa.service.admin.impl.formulaire;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.formulaire.EvaluationRechercheUniversitaire;
        import com.ird.faa.bean.referentiel.TypeExpert;
        import com.ird.faa.bean.referentiel.RoleEvaluationRechercheUniversitaire;
        import com.ird.faa.bean.referentiel.Pays;
        import com.ird.faa.bean.referentiel.Etablissement;
        import com.ird.faa.bean.formulaire.Chercheur;
        import com.ird.faa.bean.formulaire.Campagne;
        import com.ird.faa.bean.config.EtatEtapeCampagne;
import com.ird.faa.dao.formulaire.EvaluationRechercheUniversitaireDao;
import com.ird.faa.service.admin.facade.formulaire.EvaluationRechercheUniversitaireAdminService;
        import com.ird.faa.service.admin.facade.referentiel.RoleEvaluationRechercheUniversitaireAdminService;
        import com.ird.faa.service.admin.facade.config.EtatEtapeCampagneAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirEvaluationRechercheUniversitaireAdminService;
        import com.ird.faa.service.admin.facade.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaireAdminService;
        import com.ird.faa.service.admin.facade.referentiel.TypeExpertAdminService;
        import com.ird.faa.service.admin.facade.referentiel.EtablissementAdminService;
        import com.ird.faa.service.admin.facade.formulaire.CampagneAdminService;
        import com.ird.faa.service.admin.facade.referentiel.PaysAdminService;
        import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;

import com.ird.faa.ws.rest.provided.vo.formulaire.EvaluationRechercheUniversitaireVo;
import com.ird.faa.service.util.*;
        import com.ird.faa.bean.formulaire.CommunauteSavoirEvaluationRechercheUniversitaire;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaire;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EvaluationRechercheUniversitaireAdminServiceImpl extends AbstractServiceImpl<EvaluationRechercheUniversitaire> implements EvaluationRechercheUniversitaireAdminService {

@Autowired
private EvaluationRechercheUniversitaireDao evaluationRechercheUniversitaireDao;

        @Autowired
        private RoleEvaluationRechercheUniversitaireAdminService roleEvaluationRechercheUniversitaireService ;
        @Autowired
        private EtatEtapeCampagneAdminService etatEtapeCampagneService ;
        @Autowired
        private CommunauteSavoirEvaluationRechercheUniversitaireAdminService communauteSavoirEvaluationRechercheUniversitaireService ;
        @Autowired
        private DisciplineScientifiqueEvaluationRechercheUniversitaireAdminService disciplineScientifiqueEvaluationRechercheUniversitaireService ;
        @Autowired
        private TypeExpertAdminService typeExpertService ;
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
public List<EvaluationRechercheUniversitaire> findAll(){
return evaluationRechercheUniversitaireDao.findAll();
}

        @Override
        public List<EvaluationRechercheUniversitaire> findByTypeExpertCode(String code){
        return evaluationRechercheUniversitaireDao.findByTypeExpertCode(code);
        }

        @Override
        @Transactional
        public int deleteByTypeExpertCode(String code){
        return evaluationRechercheUniversitaireDao.deleteByTypeExpertCode(code);
        }

        @Override
        public List<EvaluationRechercheUniversitaire> findByTypeExpertId(Long id){
        return evaluationRechercheUniversitaireDao.findByTypeExpertId(id);
        }

        @Override
        @Transactional
        public int deleteByTypeExpertId(Long id){
        return evaluationRechercheUniversitaireDao.deleteByTypeExpertId(id);
        }


        @Override
        public List<EvaluationRechercheUniversitaire> findByRoleEvaluationRechercheUniversitaireCode(String code){
        return evaluationRechercheUniversitaireDao.findByRoleEvaluationRechercheUniversitaireCode(code);
        }

        @Override
        @Transactional
        public int deleteByRoleEvaluationRechercheUniversitaireCode(String code){
        return evaluationRechercheUniversitaireDao.deleteByRoleEvaluationRechercheUniversitaireCode(code);
        }

        @Override
        public List<EvaluationRechercheUniversitaire> findByRoleEvaluationRechercheUniversitaireId(Long id){
        return evaluationRechercheUniversitaireDao.findByRoleEvaluationRechercheUniversitaireId(id);
        }

        @Override
        @Transactional
        public int deleteByRoleEvaluationRechercheUniversitaireId(Long id){
        return evaluationRechercheUniversitaireDao.deleteByRoleEvaluationRechercheUniversitaireId(id);
        }


        @Override
        public List<EvaluationRechercheUniversitaire> findByPaysCode(String code){
        return evaluationRechercheUniversitaireDao.findByPaysCode(code);
        }

        @Override
        @Transactional
        public int deleteByPaysCode(String code){
        return evaluationRechercheUniversitaireDao.deleteByPaysCode(code);
        }

        @Override
        public List<EvaluationRechercheUniversitaire> findByPaysId(Long id){
        return evaluationRechercheUniversitaireDao.findByPaysId(id);
        }

        @Override
        @Transactional
        public int deleteByPaysId(Long id){
        return evaluationRechercheUniversitaireDao.deleteByPaysId(id);
        }


        @Override
        public List<EvaluationRechercheUniversitaire> findByEtablissementCode(String code){
        return evaluationRechercheUniversitaireDao.findByEtablissementCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtablissementCode(String code){
        return evaluationRechercheUniversitaireDao.deleteByEtablissementCode(code);
        }

        @Override
        public List<EvaluationRechercheUniversitaire> findByEtablissementId(Long id){
        return evaluationRechercheUniversitaireDao.findByEtablissementId(id);
        }

        @Override
        @Transactional
        public int deleteByEtablissementId(Long id){
        return evaluationRechercheUniversitaireDao.deleteByEtablissementId(id);
        }


        @Override
        public List<EvaluationRechercheUniversitaire> findByChercheurNumeroMatricule(String numeroMatricule){
        return evaluationRechercheUniversitaireDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return evaluationRechercheUniversitaireDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<EvaluationRechercheUniversitaire> findByChercheurId(Long id){
        return evaluationRechercheUniversitaireDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return evaluationRechercheUniversitaireDao.deleteByChercheurId(id);
        }


        @Override
        public List<EvaluationRechercheUniversitaire> findByCampagneCode(String code){
        return evaluationRechercheUniversitaireDao.findByCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByCampagneCode(String code){
        return evaluationRechercheUniversitaireDao.deleteByCampagneCode(code);
        }

        @Override
        public List<EvaluationRechercheUniversitaire> findByCampagneId(Long id){
        return evaluationRechercheUniversitaireDao.findByCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByCampagneId(Long id){
        return evaluationRechercheUniversitaireDao.deleteByCampagneId(id);
        }


        @Override
        public List<EvaluationRechercheUniversitaire> findByEtatEtapeCampagneCode(String code){
        return evaluationRechercheUniversitaireDao.findByEtatEtapeCampagneCode(code);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneCode(String code){
        return evaluationRechercheUniversitaireDao.deleteByEtatEtapeCampagneCode(code);
        }

        @Override
        public List<EvaluationRechercheUniversitaire> findByEtatEtapeCampagneId(Long id){
        return evaluationRechercheUniversitaireDao.findByEtatEtapeCampagneId(id);
        }

        @Override
        @Transactional
        public int deleteByEtatEtapeCampagneId(Long id){
        return evaluationRechercheUniversitaireDao.deleteByEtatEtapeCampagneId(id);
        }

    @Override
    public EvaluationRechercheUniversitaire findByAnnee(Integer annee){
    if( annee==null) return null;
    return evaluationRechercheUniversitaireDao.findByAnnee(annee);
    }

    @Override
    @Transactional
    public int deleteByAnnee(Integer  annee) {
    return evaluationRechercheUniversitaireDao.deleteByAnnee(annee);
    }
    @Override
    public EvaluationRechercheUniversitaire findByIdOrAnnee(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
    EvaluationRechercheUniversitaire resultat=null;
    if(evaluationRechercheUniversitaire == null || ( evaluationRechercheUniversitaire.getAnnee()==null && evaluationRechercheUniversitaire.getId()==null))
    return resultat;
    else{
    if(evaluationRechercheUniversitaire.getId() != null){
    resultat= evaluationRechercheUniversitaireDao.findById(evaluationRechercheUniversitaire.getId()).get();
    }else if(StringUtil.isNotEmpty(evaluationRechercheUniversitaire.getAnnee())) {
    resultat= evaluationRechercheUniversitaireDao.findByAnnee(evaluationRechercheUniversitaire.getAnnee());
    }
    return resultat;
    }
    }

@Override
public EvaluationRechercheUniversitaire findById(Long id){
if(id==null) return null;
return evaluationRechercheUniversitaireDao.getOne(id);
}

@Override
public EvaluationRechercheUniversitaire findByIdWithAssociatedList(Long id){
EvaluationRechercheUniversitaire evaluationRechercheUniversitaire  = findById(id);
    findAssociatedLists(evaluationRechercheUniversitaire);
return evaluationRechercheUniversitaire;
}
private void findAssociatedLists(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
if(evaluationRechercheUniversitaire==null || evaluationRechercheUniversitaire.getId()==null) return ;
else{
        List<CommunauteSavoirEvaluationRechercheUniversitaire> communauteSavoirEvaluationRechercheUniversitaires = communauteSavoirEvaluationRechercheUniversitaireService.findByEvaluationRechercheUniversitaireId(evaluationRechercheUniversitaire.getId());
        evaluationRechercheUniversitaire.setCommunauteSavoirEvaluationRechercheUniversitaires(communauteSavoirEvaluationRechercheUniversitaires);
        List<DisciplineScientifiqueEvaluationRechercheUniversitaire> disciplineScientifiqueEvaluationRechercheUniversitaires = disciplineScientifiqueEvaluationRechercheUniversitaireService.findByEvaluationRechercheUniversitaireId(evaluationRechercheUniversitaire.getId());
        evaluationRechercheUniversitaire.setDisciplineScientifiqueEvaluationRechercheUniversitaires(disciplineScientifiqueEvaluationRechercheUniversitaires);
}
}
private void deleteAssociatedLists(Long id){
if(id==null ) return ;
else{
        communauteSavoirEvaluationRechercheUniversitaireService.deleteByEvaluationRechercheUniversitaireId(id);
        disciplineScientifiqueEvaluationRechercheUniversitaireService.deleteByEvaluationRechercheUniversitaireId(id);
}
}

    private void updateAssociatedLists(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
    if(evaluationRechercheUniversitaire==null || evaluationRechercheUniversitaire.getId()==null) return ;
    else{
            List<List<CommunauteSavoirEvaluationRechercheUniversitaire>> resultCommunauteSavoirEvaluationRechercheUniversitaires= communauteSavoirEvaluationRechercheUniversitaireService.getToBeSavedAndToBeDeleted(communauteSavoirEvaluationRechercheUniversitaireService.findByEvaluationRechercheUniversitaireId(evaluationRechercheUniversitaire.getId()),evaluationRechercheUniversitaire.getCommunauteSavoirEvaluationRechercheUniversitaires());
            communauteSavoirEvaluationRechercheUniversitaireService.delete(resultCommunauteSavoirEvaluationRechercheUniversitaires.get(1));
            associateCommunauteSavoirEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire,resultCommunauteSavoirEvaluationRechercheUniversitaires.get(0));
            communauteSavoirEvaluationRechercheUniversitaireService.update(resultCommunauteSavoirEvaluationRechercheUniversitaires.get(0));

            List<List<DisciplineScientifiqueEvaluationRechercheUniversitaire>> resultDisciplineScientifiqueEvaluationRechercheUniversitaires= disciplineScientifiqueEvaluationRechercheUniversitaireService.getToBeSavedAndToBeDeleted(disciplineScientifiqueEvaluationRechercheUniversitaireService.findByEvaluationRechercheUniversitaireId(evaluationRechercheUniversitaire.getId()),evaluationRechercheUniversitaire.getDisciplineScientifiqueEvaluationRechercheUniversitaires());
            disciplineScientifiqueEvaluationRechercheUniversitaireService.delete(resultDisciplineScientifiqueEvaluationRechercheUniversitaires.get(1));
            associateDisciplineScientifiqueEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire,resultDisciplineScientifiqueEvaluationRechercheUniversitaires.get(0));
            disciplineScientifiqueEvaluationRechercheUniversitaireService.update(resultDisciplineScientifiqueEvaluationRechercheUniversitaires.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
if(evaluationRechercheUniversitaireDao.findById(id) == null) return 0;
else{
deleteAssociatedLists(id);
evaluationRechercheUniversitaireDao.deleteById(id);
return 1;
}
}


@Override
public EvaluationRechercheUniversitaire update(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
EvaluationRechercheUniversitaire foundedEvaluationRechercheUniversitaire = findById(evaluationRechercheUniversitaire.getId());
if(foundedEvaluationRechercheUniversitaire==null) return null;
else{
    updateAssociatedLists(evaluationRechercheUniversitaire);
return  evaluationRechercheUniversitaireDao.save(evaluationRechercheUniversitaire);
}
}

@Override
public EvaluationRechercheUniversitaire save (EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
    EvaluationRechercheUniversitaire foundedEvaluationRechercheUniversitaire = findByAnnee(evaluationRechercheUniversitaire.getAnnee());
   if(foundedEvaluationRechercheUniversitaire!=null) return null;


    findTypeExpert(evaluationRechercheUniversitaire);
    findRoleEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire);
    findPays(evaluationRechercheUniversitaire);
    findEtablissement(evaluationRechercheUniversitaire);
    findChercheur(evaluationRechercheUniversitaire);
    findCampagne(evaluationRechercheUniversitaire);
    findEtatEtapeCampagne(evaluationRechercheUniversitaire);

EvaluationRechercheUniversitaire savedEvaluationRechercheUniversitaire = evaluationRechercheUniversitaireDao.save(evaluationRechercheUniversitaire);
       saveCommunauteSavoirEvaluationRechercheUniversitaires(savedEvaluationRechercheUniversitaire,evaluationRechercheUniversitaire.getCommunauteSavoirEvaluationRechercheUniversitaires());
       saveDisciplineScientifiqueEvaluationRechercheUniversitaires(savedEvaluationRechercheUniversitaire,evaluationRechercheUniversitaire.getDisciplineScientifiqueEvaluationRechercheUniversitaires());
return savedEvaluationRechercheUniversitaire;
}

@Override
public List<EvaluationRechercheUniversitaire> save(List<EvaluationRechercheUniversitaire> evaluationRechercheUniversitaires){
List<EvaluationRechercheUniversitaire> list = new ArrayList<EvaluationRechercheUniversitaire>();
for(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire: evaluationRechercheUniversitaires){
list.add(save(evaluationRechercheUniversitaire));
}
return list;
}



@Override
@Transactional
public int delete(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
    if(evaluationRechercheUniversitaire.getAnnee()==null) return -1;

    EvaluationRechercheUniversitaire foundedEvaluationRechercheUniversitaire = findByAnnee(evaluationRechercheUniversitaire.getAnnee());
    if(foundedEvaluationRechercheUniversitaire==null) return -1;
evaluationRechercheUniversitaireDao.delete(foundedEvaluationRechercheUniversitaire);
return 1;
}


public List<EvaluationRechercheUniversitaire> findByCriteria(EvaluationRechercheUniversitaireVo evaluationRechercheUniversitaireVo){

String query = "SELECT o FROM EvaluationRechercheUniversitaire o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",evaluationRechercheUniversitaireVo.getId());
            query += SearchUtil.addConstraint( "o", "annee","=",evaluationRechercheUniversitaireVo.getAnnee());
            query += SearchUtil.addConstraint( "o", "nombreJourConsacrePourCetteAnnee","=",evaluationRechercheUniversitaireVo.getNombreJourConsacrePourCetteAnnee());
            query += SearchUtil.addConstraint( "o", "commentaire","LIKE",evaluationRechercheUniversitaireVo.getCommentaire());
            query += SearchUtil.addConstraintMinMax("o","annee",evaluationRechercheUniversitaireVo.getAnneeMin(),evaluationRechercheUniversitaireVo.getAnneeMax());
            query += SearchUtil.addConstraintMinMax("o","nombreJourConsacrePourCetteAnnee",evaluationRechercheUniversitaireVo.getNombreJourConsacrePourCetteAnneeMin(),evaluationRechercheUniversitaireVo.getNombreJourConsacrePourCetteAnneeMax());
    if(evaluationRechercheUniversitaireVo.getTypeExpertVo()!=null){
        query += SearchUtil.addConstraint( "o", "typeExpert.id","=",evaluationRechercheUniversitaireVo.getTypeExpertVo().getId());
            query += SearchUtil.addConstraint( "o", "typeExpert.code","LIKE",evaluationRechercheUniversitaireVo.getTypeExpertVo().getCode());
    }

    if(evaluationRechercheUniversitaireVo.getRoleEvaluationRechercheUniversitaireVo()!=null){
        query += SearchUtil.addConstraint( "o", "roleEvaluationRechercheUniversitaire.id","=",evaluationRechercheUniversitaireVo.getRoleEvaluationRechercheUniversitaireVo().getId());
            query += SearchUtil.addConstraint( "o", "roleEvaluationRechercheUniversitaire.code","LIKE",evaluationRechercheUniversitaireVo.getRoleEvaluationRechercheUniversitaireVo().getCode());
    }

    if(evaluationRechercheUniversitaireVo.getPaysVo()!=null){
        query += SearchUtil.addConstraint( "o", "pays.id","=",evaluationRechercheUniversitaireVo.getPaysVo().getId());
            query += SearchUtil.addConstraint( "o", "pays.code","LIKE",evaluationRechercheUniversitaireVo.getPaysVo().getCode());
    }

    if(evaluationRechercheUniversitaireVo.getEtablissementVo()!=null){
        query += SearchUtil.addConstraint( "o", "etablissement.id","=",evaluationRechercheUniversitaireVo.getEtablissementVo().getId());
            query += SearchUtil.addConstraint( "o", "etablissement.code","LIKE",evaluationRechercheUniversitaireVo.getEtablissementVo().getCode());
    }

    if(evaluationRechercheUniversitaireVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",evaluationRechercheUniversitaireVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",evaluationRechercheUniversitaireVo.getChercheurVo().getNumeroMatricule());
    }

    if(evaluationRechercheUniversitaireVo.getCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "campagne.id","=",evaluationRechercheUniversitaireVo.getCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "campagne.code","LIKE",evaluationRechercheUniversitaireVo.getCampagneVo().getCode());
    }

    if(evaluationRechercheUniversitaireVo.getEtatEtapeCampagneVo()!=null){
        query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.id","=",evaluationRechercheUniversitaireVo.getEtatEtapeCampagneVo().getId());
            query += SearchUtil.addConstraint( "o", "etatEtapeCampagne.code","LIKE",evaluationRechercheUniversitaireVo.getEtatEtapeCampagneVo().getCode());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void saveCommunauteSavoirEvaluationRechercheUniversitaires(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire,List<CommunauteSavoirEvaluationRechercheUniversitaire> communauteSavoirEvaluationRechercheUniversitaires){

        if (ListUtil.isNotEmpty(evaluationRechercheUniversitaire.getCommunauteSavoirEvaluationRechercheUniversitaires())) {
        List<CommunauteSavoirEvaluationRechercheUniversitaire> savedCommunauteSavoirEvaluationRechercheUniversitaires = new ArrayList<>();
        communauteSavoirEvaluationRechercheUniversitaires.forEach(element -> {
        element.setEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire);
        communauteSavoirEvaluationRechercheUniversitaireService.save(element);
        });
        evaluationRechercheUniversitaire.setCommunauteSavoirEvaluationRechercheUniversitaires(savedCommunauteSavoirEvaluationRechercheUniversitaires);
        }
        }
        private  void saveDisciplineScientifiqueEvaluationRechercheUniversitaires(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire,List<DisciplineScientifiqueEvaluationRechercheUniversitaire> disciplineScientifiqueEvaluationRechercheUniversitaires){

        if (ListUtil.isNotEmpty(evaluationRechercheUniversitaire.getDisciplineScientifiqueEvaluationRechercheUniversitaires())) {
        List<DisciplineScientifiqueEvaluationRechercheUniversitaire> savedDisciplineScientifiqueEvaluationRechercheUniversitaires = new ArrayList<>();
        disciplineScientifiqueEvaluationRechercheUniversitaires.forEach(element -> {
        element.setEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire);
        disciplineScientifiqueEvaluationRechercheUniversitaireService.save(element);
        });
        evaluationRechercheUniversitaire.setDisciplineScientifiqueEvaluationRechercheUniversitaires(savedDisciplineScientifiqueEvaluationRechercheUniversitaires);
        }
        }

    private void findTypeExpert(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
        TypeExpert loadedTypeExpert =typeExpertService.findByIdOrCode(evaluationRechercheUniversitaire.getTypeExpert());

    if(loadedTypeExpert==null ) {
        return;
    }
    evaluationRechercheUniversitaire.setTypeExpert(loadedTypeExpert);
    }
    private void findRoleEvaluationRechercheUniversitaire(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
        RoleEvaluationRechercheUniversitaire loadedRoleEvaluationRechercheUniversitaire =roleEvaluationRechercheUniversitaireService.findByIdOrCode(evaluationRechercheUniversitaire.getRoleEvaluationRechercheUniversitaire());

    if(loadedRoleEvaluationRechercheUniversitaire==null ) {
        return;
    }
    evaluationRechercheUniversitaire.setRoleEvaluationRechercheUniversitaire(loadedRoleEvaluationRechercheUniversitaire);
    }
    private void findPays(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
        Pays loadedPays =paysService.findByIdOrCode(evaluationRechercheUniversitaire.getPays());

    if(loadedPays==null ) {
        return;
    }
    evaluationRechercheUniversitaire.setPays(loadedPays);
    }
    private void findEtablissement(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
        Etablissement loadedEtablissement =etablissementService.findByIdOrCode(evaluationRechercheUniversitaire.getEtablissement());

    if(loadedEtablissement==null ) {
        return;
    }
    evaluationRechercheUniversitaire.setEtablissement(loadedEtablissement);
    }
    private void findChercheur(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(evaluationRechercheUniversitaire.getChercheur());

    if(loadedChercheur==null ) {
        return;
    }
    evaluationRechercheUniversitaire.setChercheur(loadedChercheur);
    }
    private void findCampagne(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
        Campagne loadedCampagne =campagneService.findByIdOrCode(evaluationRechercheUniversitaire.getCampagne());

    if(loadedCampagne==null ) {
        return;
    }
    evaluationRechercheUniversitaire.setCampagne(loadedCampagne);
    }
    private void findEtatEtapeCampagne(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire){
        EtatEtapeCampagne loadedEtatEtapeCampagne =etatEtapeCampagneService.findByIdOrCode(evaluationRechercheUniversitaire.getEtatEtapeCampagne());

    if(loadedEtatEtapeCampagne==null ) {
        return;
    }
    evaluationRechercheUniversitaire.setEtatEtapeCampagne(loadedEtatEtapeCampagne);
    }

@Override
@Transactional
public void delete(List<EvaluationRechercheUniversitaire> evaluationRechercheUniversitaires){
        if(ListUtil.isNotEmpty(evaluationRechercheUniversitaires)){
        evaluationRechercheUniversitaires.forEach(e->evaluationRechercheUniversitaireDao.delete(e));
        }
}
@Override
public void update(List<EvaluationRechercheUniversitaire> evaluationRechercheUniversitaires){
if(ListUtil.isNotEmpty(evaluationRechercheUniversitaires)){
evaluationRechercheUniversitaires.forEach(e->evaluationRechercheUniversitaireDao.save(e));
}
}

private void associateCommunauteSavoirEvaluationRechercheUniversitaire(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire, List<CommunauteSavoirEvaluationRechercheUniversitaire> communauteSavoirEvaluationRechercheUniversitaire) {
    if (ListUtil.isNotEmpty(communauteSavoirEvaluationRechercheUniversitaire)) {
        communauteSavoirEvaluationRechercheUniversitaire.forEach(e -> e.setEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire));
    }
    }
private void associateDisciplineScientifiqueEvaluationRechercheUniversitaire(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire, List<DisciplineScientifiqueEvaluationRechercheUniversitaire> disciplineScientifiqueEvaluationRechercheUniversitaire) {
    if (ListUtil.isNotEmpty(disciplineScientifiqueEvaluationRechercheUniversitaire)) {
        disciplineScientifiqueEvaluationRechercheUniversitaire.forEach(e -> e.setEvaluationRechercheUniversitaire(evaluationRechercheUniversitaire));
    }
    }


@Override
public List<List<EvaluationRechercheUniversitaire>>  getToBeSavedAndToBeDeleted(List<EvaluationRechercheUniversitaire> oldList,List<EvaluationRechercheUniversitaire> newList){
            return super.getToBeSavedAndToBeDeleted(oldList,newList);
            }

}
