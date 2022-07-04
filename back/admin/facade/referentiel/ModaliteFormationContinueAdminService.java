package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.ModaliteFormationContinue;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModaliteFormationContinueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ModaliteFormationContinueAdminService extends AbstractService<ModaliteFormationContinue,Long,ModaliteFormationContinueVo>{


    /**
    * find ModaliteFormationContinue from database by code (reference)
    * @param code - reference of ModaliteFormationContinue
    * @return the founded ModaliteFormationContinue , If no ModaliteFormationContinue were
    *         found in database return  null.
    */
    ModaliteFormationContinue findByCode(String code);

    /**
    * find ModaliteFormationContinue from database by id (PK) or code (reference)
    * @param id - id of ModaliteFormationContinue
    * @param code - reference of ModaliteFormationContinue
    * @return the founded ModaliteFormationContinue , If no ModaliteFormationContinue were
    *         found in database return  null.
    */
    ModaliteFormationContinue findByIdOrCode(ModaliteFormationContinue modaliteFormationContinue);


/**
    * delete ModaliteFormationContinue from database
    * @param id - id of ModaliteFormationContinue to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete ModaliteFormationContinue from database by code (reference)
    *
    * @param code - reference of ModaliteFormationContinue to be deleted
    * @return 1 if ModaliteFormationContinue deleted successfully
    */
    int deleteByCode(String code);



}
