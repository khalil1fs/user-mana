package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeExpert;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeExpertVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeExpertAdminService extends AbstractService<TypeExpert,Long,TypeExpertVo>{


    /**
    * find TypeExpert from database by code (reference)
    * @param code - reference of TypeExpert
    * @return the founded TypeExpert , If no TypeExpert were
    *         found in database return  null.
    */
    TypeExpert findByCode(String code);

    /**
    * find TypeExpert from database by id (PK) or code (reference)
    * @param id - id of TypeExpert
    * @param code - reference of TypeExpert
    * @return the founded TypeExpert , If no TypeExpert were
    *         found in database return  null.
    */
    TypeExpert findByIdOrCode(TypeExpert typeExpert);


/**
    * delete TypeExpert from database
    * @param id - id of TypeExpert to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeExpert from database by code (reference)
    *
    * @param code - reference of TypeExpert to be deleted
    * @return 1 if TypeExpert deleted successfully
    */
    int deleteByCode(String code);



}
