package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeEnseignementDispense;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeEnseignementDispenseVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeEnseignementDispenseAdminService extends AbstractService<TypeEnseignementDispense,Long,TypeEnseignementDispenseVo>{


    /**
    * find TypeEnseignementDispense from database by code (reference)
    * @param code - reference of TypeEnseignementDispense
    * @return the founded TypeEnseignementDispense , If no TypeEnseignementDispense were
    *         found in database return  null.
    */
    TypeEnseignementDispense findByCode(String code);

    /**
    * find TypeEnseignementDispense from database by id (PK) or code (reference)
    * @param id - id of TypeEnseignementDispense
    * @param code - reference of TypeEnseignementDispense
    * @return the founded TypeEnseignementDispense , If no TypeEnseignementDispense were
    *         found in database return  null.
    */
    TypeEnseignementDispense findByIdOrCode(TypeEnseignementDispense typeEnseignementDispense);


/**
    * delete TypeEnseignementDispense from database
    * @param id - id of TypeEnseignementDispense to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeEnseignementDispense from database by code (reference)
    *
    * @param code - reference of TypeEnseignementDispense to be deleted
    * @return 1 if TypeEnseignementDispense deleted successfully
    */
    int deleteByCode(String code);



}
