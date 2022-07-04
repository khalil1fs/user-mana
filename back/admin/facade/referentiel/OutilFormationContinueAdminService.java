package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.OutilFormationContinue;
import com.ird.faa.ws.rest.provided.vo.referentiel.OutilFormationContinueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface OutilFormationContinueAdminService extends AbstractService<OutilFormationContinue,Long,OutilFormationContinueVo>{


    /**
    * find OutilFormationContinue from database by code (reference)
    * @param code - reference of OutilFormationContinue
    * @return the founded OutilFormationContinue , If no OutilFormationContinue were
    *         found in database return  null.
    */
    OutilFormationContinue findByCode(String code);

    /**
    * find OutilFormationContinue from database by id (PK) or code (reference)
    * @param id - id of OutilFormationContinue
    * @param code - reference of OutilFormationContinue
    * @return the founded OutilFormationContinue , If no OutilFormationContinue were
    *         found in database return  null.
    */
    OutilFormationContinue findByIdOrCode(OutilFormationContinue outilFormationContinue);


/**
    * delete OutilFormationContinue from database
    * @param id - id of OutilFormationContinue to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete OutilFormationContinue from database by code (reference)
    *
    * @param code - reference of OutilFormationContinue to be deleted
    * @return 1 if OutilFormationContinue deleted successfully
    */
    int deleteByCode(String code);



}
