package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.NiveauFormation;
import com.ird.faa.ws.rest.provided.vo.referentiel.NiveauFormationVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface NiveauFormationAdminService extends AbstractService<NiveauFormation,Long,NiveauFormationVo>{


    /**
    * find NiveauFormation from database by code (reference)
    * @param code - reference of NiveauFormation
    * @return the founded NiveauFormation , If no NiveauFormation were
    *         found in database return  null.
    */
    NiveauFormation findByCode(String code);

    /**
    * find NiveauFormation from database by id (PK) or code (reference)
    * @param id - id of NiveauFormation
    * @param code - reference of NiveauFormation
    * @return the founded NiveauFormation , If no NiveauFormation were
    *         found in database return  null.
    */
    NiveauFormation findByIdOrCode(NiveauFormation niveauFormation);


/**
    * delete NiveauFormation from database
    * @param id - id of NiveauFormation to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete NiveauFormation from database by code (reference)
    *
    * @param code - reference of NiveauFormation to be deleted
    * @return 1 if NiveauFormation deleted successfully
    */
    int deleteByCode(String code);



}
