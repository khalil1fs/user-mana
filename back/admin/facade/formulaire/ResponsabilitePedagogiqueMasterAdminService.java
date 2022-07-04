package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ResponsabilitePedagogiqueMaster;
import com.ird.faa.ws.rest.provided.vo.formulaire.ResponsabilitePedagogiqueMasterVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ResponsabilitePedagogiqueMasterAdminService extends AbstractService<ResponsabilitePedagogiqueMaster,Long,ResponsabilitePedagogiqueMasterVo>{


    /**
    * find ResponsabilitePedagogiqueMaster from database by annee (reference)
    * @param annee - reference of ResponsabilitePedagogiqueMaster
    * @return the founded ResponsabilitePedagogiqueMaster , If no ResponsabilitePedagogiqueMaster were
    *         found in database return  null.
    */
    ResponsabilitePedagogiqueMaster findByAnnee(Integer annee);

    /**
    * find ResponsabilitePedagogiqueMaster from database by id (PK) or annee (reference)
    * @param id - id of ResponsabilitePedagogiqueMaster
    * @param annee - reference of ResponsabilitePedagogiqueMaster
    * @return the founded ResponsabilitePedagogiqueMaster , If no ResponsabilitePedagogiqueMaster were
    *         found in database return  null.
    */
    ResponsabilitePedagogiqueMaster findByIdOrAnnee(ResponsabilitePedagogiqueMaster responsabilitePedagogiqueMaster);


/**
    * delete ResponsabilitePedagogiqueMaster from database
    * @param id - id of ResponsabilitePedagogiqueMaster to be deleted
    *
    */
    int deleteById(Long id);


    List<ResponsabilitePedagogiqueMaster> findByStatutMasterCode(String code);

    int deleteByStatutMasterCode(String code);

    List<ResponsabilitePedagogiqueMaster> findByStatutMasterId(Long id);

    int deleteByStatutMasterId(Long id);
    List<ResponsabilitePedagogiqueMaster> findByMasterCode(String code);

    int deleteByMasterCode(String code);

    List<ResponsabilitePedagogiqueMaster> findByMasterId(Long id);

    int deleteByMasterId(Long id);
    List<ResponsabilitePedagogiqueMaster> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<ResponsabilitePedagogiqueMaster> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<ResponsabilitePedagogiqueMaster> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<ResponsabilitePedagogiqueMaster> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);
    List<ResponsabilitePedagogiqueMaster> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<ResponsabilitePedagogiqueMaster> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<ResponsabilitePedagogiqueMaster> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<ResponsabilitePedagogiqueMaster> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);


    /**
    * delete ResponsabilitePedagogiqueMaster from database by annee (reference)
    *
    * @param annee - reference of ResponsabilitePedagogiqueMaster to be deleted
    * @return 1 if ResponsabilitePedagogiqueMaster deleted successfully
    */
    int deleteByAnnee(Integer annee);



}
