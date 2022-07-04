package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.MasterInternational;
import com.ird.faa.ws.rest.provided.vo.referentiel.MasterInternationalVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface MasterInternationalAdminService extends AbstractService<MasterInternational,Long,MasterInternationalVo>{


    /**
    * find MasterInternational from database by code (reference)
    * @param code - reference of MasterInternational
    * @return the founded MasterInternational , If no MasterInternational were
    *         found in database return  null.
    */
    MasterInternational findByCode(String code);

    /**
    * find MasterInternational from database by id (PK) or code (reference)
    * @param id - id of MasterInternational
    * @param code - reference of MasterInternational
    * @return the founded MasterInternational , If no MasterInternational were
    *         found in database return  null.
    */
    MasterInternational findByIdOrCode(MasterInternational masterInternational);


/**
    * delete MasterInternational from database
    * @param id - id of MasterInternational to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete MasterInternational from database by code (reference)
    *
    * @param code - reference of MasterInternational to be deleted
    * @return 1 if MasterInternational deleted successfully
    */
    int deleteByCode(String code);



}
