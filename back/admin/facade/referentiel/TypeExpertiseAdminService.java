package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeExpertise;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeExpertiseVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeExpertiseAdminService extends AbstractService<TypeExpertise,Long,TypeExpertiseVo>{


    /**
    * find TypeExpertise from database by code (reference)
    * @param code - reference of TypeExpertise
    * @return the founded TypeExpertise , If no TypeExpertise were
    *         found in database return  null.
    */
    TypeExpertise findByCode(String code);

    /**
    * find TypeExpertise from database by id (PK) or code (reference)
    * @param id - id of TypeExpertise
    * @param code - reference of TypeExpertise
    * @return the founded TypeExpertise , If no TypeExpertise were
    *         found in database return  null.
    */
    TypeExpertise findByIdOrCode(TypeExpertise typeExpertise);


/**
    * delete TypeExpertise from database
    * @param id - id of TypeExpertise to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeExpertise from database by code (reference)
    *
    * @param code - reference of TypeExpertise to be deleted
    * @return 1 if TypeExpertise deleted successfully
    */
    int deleteByCode(String code);



}
