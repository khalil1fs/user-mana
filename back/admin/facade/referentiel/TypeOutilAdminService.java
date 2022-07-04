package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeOutil;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeOutilVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeOutilAdminService extends AbstractService<TypeOutil,Long,TypeOutilVo>{


    /**
    * find TypeOutil from database by code (reference)
    * @param code - reference of TypeOutil
    * @return the founded TypeOutil , If no TypeOutil were
    *         found in database return  null.
    */
    TypeOutil findByCode(String code);

    /**
    * find TypeOutil from database by id (PK) or code (reference)
    * @param id - id of TypeOutil
    * @param code - reference of TypeOutil
    * @return the founded TypeOutil , If no TypeOutil were
    *         found in database return  null.
    */
    TypeOutil findByIdOrCode(TypeOutil typeOutil);


/**
    * delete TypeOutil from database
    * @param id - id of TypeOutil to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeOutil from database by code (reference)
    *
    * @param code - reference of TypeOutil to be deleted
    * @return 1 if TypeOutil deleted successfully
    */
    int deleteByCode(String code);



}
