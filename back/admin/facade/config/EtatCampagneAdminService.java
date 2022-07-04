package com.ird.faa.service.admin.facade.config;

import com.ird.faa.bean.config.EtatCampagne;
import com.ird.faa.ws.rest.provided.vo.config.EtatCampagneVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtatCampagneAdminService extends AbstractService<EtatCampagne,Long,EtatCampagneVo>{


    /**
    * find EtatCampagne from database by code (reference)
    * @param code - reference of EtatCampagne
    * @return the founded EtatCampagne , If no EtatCampagne were
    *         found in database return  null.
    */
    EtatCampagne findByCode(String code);

    /**
    * find EtatCampagne from database by id (PK) or code (reference)
    * @param id - id of EtatCampagne
    * @param code - reference of EtatCampagne
    * @return the founded EtatCampagne , If no EtatCampagne were
    *         found in database return  null.
    */
    EtatCampagne findByIdOrCode(EtatCampagne etatCampagne);


/**
    * delete EtatCampagne from database
    * @param id - id of EtatCampagne to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete EtatCampagne from database by code (reference)
    *
    * @param code - reference of EtatCampagne to be deleted
    * @return 1 if EtatCampagne deleted successfully
    */
    int deleteByCode(String code);



}
