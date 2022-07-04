package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeSavoir;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeSavoirVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeSavoirAdminService extends AbstractService<TypeSavoir,Long,TypeSavoirVo>{


    /**
    * find TypeSavoir from database by code (reference)
    * @param code - reference of TypeSavoir
    * @return the founded TypeSavoir , If no TypeSavoir were
    *         found in database return  null.
    */
    TypeSavoir findByCode(String code);

    /**
    * find TypeSavoir from database by id (PK) or code (reference)
    * @param id - id of TypeSavoir
    * @param code - reference of TypeSavoir
    * @return the founded TypeSavoir , If no TypeSavoir were
    *         found in database return  null.
    */
    TypeSavoir findByIdOrCode(TypeSavoir typeSavoir);


/**
    * delete TypeSavoir from database
    * @param id - id of TypeSavoir to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeSavoir from database by code (reference)
    *
    * @param code - reference of TypeSavoir to be deleted
    * @return 1 if TypeSavoir deleted successfully
    */
    int deleteByCode(String code);



}
