package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ConseilEtComiteScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.ConseilEtComiteScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ConseilEtComiteScientifiqueAdminService extends AbstractService<ConseilEtComiteScientifique,Long,ConseilEtComiteScientifiqueVo>{


    /**
    * find ConseilEtComiteScientifique from database by annee (reference)
    * @param annee - reference of ConseilEtComiteScientifique
    * @return the founded ConseilEtComiteScientifique , If no ConseilEtComiteScientifique were
    *         found in database return  null.
    */
    ConseilEtComiteScientifique findByAnnee(Integer annee);

    /**
    * find ConseilEtComiteScientifique from database by id (PK) or annee (reference)
    * @param id - id of ConseilEtComiteScientifique
    * @param annee - reference of ConseilEtComiteScientifique
    * @return the founded ConseilEtComiteScientifique , If no ConseilEtComiteScientifique were
    *         found in database return  null.
    */
    ConseilEtComiteScientifique findByIdOrAnnee(ConseilEtComiteScientifique conseilEtComiteScientifique);


/**
    * delete ConseilEtComiteScientifique from database
    * @param id - id of ConseilEtComiteScientifique to be deleted
    *
    */
    int deleteById(Long id);


    List<ConseilEtComiteScientifique> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<ConseilEtComiteScientifique> findByPaysId(Long id);

    int deleteByPaysId(Long id);
    List<ConseilEtComiteScientifique> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<ConseilEtComiteScientifique> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<ConseilEtComiteScientifique> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<ConseilEtComiteScientifique> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<ConseilEtComiteScientifique> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<ConseilEtComiteScientifique> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<ConseilEtComiteScientifique> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<ConseilEtComiteScientifique> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);


    /**
    * delete ConseilEtComiteScientifique from database by annee (reference)
    *
    * @param annee - reference of ConseilEtComiteScientifique to be deleted
    * @return 1 if ConseilEtComiteScientifique deleted successfully
    */
    int deleteByAnnee(Integer annee);



}
