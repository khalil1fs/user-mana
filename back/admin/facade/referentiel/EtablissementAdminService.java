package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.Etablissement;
import com.ird.faa.ws.rest.provided.vo.referentiel.EtablissementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtablissementAdminService extends AbstractService<Etablissement,Long,EtablissementVo>{


    /**
    * find Etablissement from database by code (reference)
    * @param code - reference of Etablissement
    * @return the founded Etablissement , If no Etablissement were
    *         found in database return  null.
    */
    Etablissement findByCode(String code);

    /**
    * find Etablissement from database by id (PK) or code (reference)
    * @param id - id of Etablissement
    * @param code - reference of Etablissement
    * @return the founded Etablissement , If no Etablissement were
    *         found in database return  null.
    */
    Etablissement findByIdOrCode(Etablissement etablissement);


/**
    * delete Etablissement from database
    * @param id - id of Etablissement to be deleted
    *
    */
    int deleteById(Long id);


    List<Etablissement> findByVilleCode(String code);

    int deleteByVilleCode(String code);

    List<Etablissement> findByVilleId(Long id);

    int deleteByVilleId(Long id);
    List<Etablissement> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<Etablissement> findByPaysId(Long id);

    int deleteByPaysId(Long id);


    /**
    * delete Etablissement from database by code (reference)
    *
    * @param code - reference of Etablissement to be deleted
    * @return 1 if Etablissement deleted successfully
    */
    int deleteByCode(String code);




    Etablissement archiver(Etablissement etablissement) ;
    Etablissement desarchiver(Etablissement etablissement);

}
