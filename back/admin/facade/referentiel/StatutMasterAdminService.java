package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.StatutMaster;
import com.ird.faa.ws.rest.provided.vo.referentiel.StatutMasterVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface StatutMasterAdminService extends AbstractService<StatutMaster,Long,StatutMasterVo>{


    /**
    * find StatutMaster from database by code (reference)
    * @param code - reference of StatutMaster
    * @return the founded StatutMaster , If no StatutMaster were
    *         found in database return  null.
    */
    StatutMaster findByCode(String code);

    /**
    * find StatutMaster from database by id (PK) or code (reference)
    * @param id - id of StatutMaster
    * @param code - reference of StatutMaster
    * @return the founded StatutMaster , If no StatutMaster were
    *         found in database return  null.
    */
    StatutMaster findByIdOrCode(StatutMaster statutMaster);


/**
    * delete StatutMaster from database
    * @param id - id of StatutMaster to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete StatutMaster from database by code (reference)
    *
    * @param code - reference of StatutMaster to be deleted
    * @return 1 if StatutMaster deleted successfully
    */
    int deleteByCode(String code);



}
