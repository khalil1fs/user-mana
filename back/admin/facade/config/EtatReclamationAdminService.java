package com.ird.faa.service.admin.facade.config;

import com.ird.faa.bean.config.EtatReclamation;
import com.ird.faa.ws.rest.provided.vo.config.EtatReclamationVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtatReclamationAdminService extends AbstractService<EtatReclamation,Long,EtatReclamationVo>{


    /**
    * find EtatReclamation from database by code (reference)
    * @param code - reference of EtatReclamation
    * @return the founded EtatReclamation , If no EtatReclamation were
    *         found in database return  null.
    */
    EtatReclamation findByCode(String code);

    /**
    * find EtatReclamation from database by id (PK) or code (reference)
    * @param id - id of EtatReclamation
    * @param code - reference of EtatReclamation
    * @return the founded EtatReclamation , If no EtatReclamation were
    *         found in database return  null.
    */
    EtatReclamation findByIdOrCode(EtatReclamation etatReclamation);


/**
    * delete EtatReclamation from database
    * @param id - id of EtatReclamation to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete EtatReclamation from database by code (reference)
    *
    * @param code - reference of EtatReclamation to be deleted
    * @return 1 if EtatReclamation deleted successfully
    */
    int deleteByCode(String code);



}
