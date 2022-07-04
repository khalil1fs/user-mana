package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.ObjetGlobal;
import com.ird.faa.ws.rest.provided.vo.referentiel.ObjetGlobalVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ObjetGlobalAdminService extends AbstractService<ObjetGlobal,Long,ObjetGlobalVo>{


    /**
    * find ObjetGlobal from database by code (reference)
    * @param code - reference of ObjetGlobal
    * @return the founded ObjetGlobal , If no ObjetGlobal were
    *         found in database return  null.
    */
    ObjetGlobal findByCode(String code);

    /**
    * find ObjetGlobal from database by id (PK) or code (reference)
    * @param id - id of ObjetGlobal
    * @param code - reference of ObjetGlobal
    * @return the founded ObjetGlobal , If no ObjetGlobal were
    *         found in database return  null.
    */
    ObjetGlobal findByIdOrCode(ObjetGlobal objetGlobal);


/**
    * delete ObjetGlobal from database
    * @param id - id of ObjetGlobal to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete ObjetGlobal from database by code (reference)
    *
    * @param code - reference of ObjetGlobal to be deleted
    * @return 1 if ObjetGlobal deleted successfully
    */
    int deleteByCode(String code);



}
