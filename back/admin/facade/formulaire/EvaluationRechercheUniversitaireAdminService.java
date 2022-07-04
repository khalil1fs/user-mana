package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EvaluationRechercheUniversitaire;
import com.ird.faa.ws.rest.provided.vo.formulaire.EvaluationRechercheUniversitaireVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EvaluationRechercheUniversitaireAdminService extends AbstractService<EvaluationRechercheUniversitaire,Long,EvaluationRechercheUniversitaireVo>{


    /**
    * find EvaluationRechercheUniversitaire from database by annee (reference)
    * @param annee - reference of EvaluationRechercheUniversitaire
    * @return the founded EvaluationRechercheUniversitaire , If no EvaluationRechercheUniversitaire were
    *         found in database return  null.
    */
    EvaluationRechercheUniversitaire findByAnnee(Integer annee);

    /**
    * find EvaluationRechercheUniversitaire from database by id (PK) or annee (reference)
    * @param id - id of EvaluationRechercheUniversitaire
    * @param annee - reference of EvaluationRechercheUniversitaire
    * @return the founded EvaluationRechercheUniversitaire , If no EvaluationRechercheUniversitaire were
    *         found in database return  null.
    */
    EvaluationRechercheUniversitaire findByIdOrAnnee(EvaluationRechercheUniversitaire evaluationRechercheUniversitaire);


/**
    * delete EvaluationRechercheUniversitaire from database
    * @param id - id of EvaluationRechercheUniversitaire to be deleted
    *
    */
    int deleteById(Long id);


    List<EvaluationRechercheUniversitaire> findByTypeExpertCode(String code);

    int deleteByTypeExpertCode(String code);

    List<EvaluationRechercheUniversitaire> findByTypeExpertId(Long id);

    int deleteByTypeExpertId(Long id);
    List<EvaluationRechercheUniversitaire> findByRoleEvaluationRechercheUniversitaireCode(String code);

    int deleteByRoleEvaluationRechercheUniversitaireCode(String code);

    List<EvaluationRechercheUniversitaire> findByRoleEvaluationRechercheUniversitaireId(Long id);

    int deleteByRoleEvaluationRechercheUniversitaireId(Long id);
    List<EvaluationRechercheUniversitaire> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<EvaluationRechercheUniversitaire> findByPaysId(Long id);

    int deleteByPaysId(Long id);
    List<EvaluationRechercheUniversitaire> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<EvaluationRechercheUniversitaire> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<EvaluationRechercheUniversitaire> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<EvaluationRechercheUniversitaire> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<EvaluationRechercheUniversitaire> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<EvaluationRechercheUniversitaire> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<EvaluationRechercheUniversitaire> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<EvaluationRechercheUniversitaire> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);


    /**
    * delete EvaluationRechercheUniversitaire from database by annee (reference)
    *
    * @param annee - reference of EvaluationRechercheUniversitaire to be deleted
    * @return 1 if EvaluationRechercheUniversitaire deleted successfully
    */
    int deleteByAnnee(Integer annee);



}
