package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ExpertiseScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.ExpertiseScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ExpertiseScientifiqueAdminService extends AbstractService<ExpertiseScientifique,Long,ExpertiseScientifiqueVo>{


    /**
    * find ExpertiseScientifique from database by annee (reference)
    * @param annee - reference of ExpertiseScientifique
    * @return the founded ExpertiseScientifique , If no ExpertiseScientifique were
    *         found in database return  null.
    */
    ExpertiseScientifique findByAnnee(Integer annee);

    /**
    * find ExpertiseScientifique from database by id (PK) or annee (reference)
    * @param id - id of ExpertiseScientifique
    * @param annee - reference of ExpertiseScientifique
    * @return the founded ExpertiseScientifique , If no ExpertiseScientifique were
    *         found in database return  null.
    */
    ExpertiseScientifique findByIdOrAnnee(ExpertiseScientifique expertiseScientifique);


/**
    * delete ExpertiseScientifique from database
    * @param id - id of ExpertiseScientifique to be deleted
    *
    */
    int deleteById(Long id);


    List<ExpertiseScientifique> findByTypeExpertiseCode(String code);

    int deleteByTypeExpertiseCode(String code);

    List<ExpertiseScientifique> findByTypeExpertiseId(Long id);

    int deleteByTypeExpertiseId(Long id);
    List<ExpertiseScientifique> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<ExpertiseScientifique> findByPaysId(Long id);

    int deleteByPaysId(Long id);
    List<ExpertiseScientifique> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<ExpertiseScientifique> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<ExpertiseScientifique> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<ExpertiseScientifique> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);
    List<ExpertiseScientifique> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<ExpertiseScientifique> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<ExpertiseScientifique> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<ExpertiseScientifique> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);


    /**
    * delete ExpertiseScientifique from database by annee (reference)
    *
    * @param annee - reference of ExpertiseScientifique to be deleted
    * @return 1 if ExpertiseScientifique deleted successfully
    */
    int deleteByAnnee(Integer annee);



}
