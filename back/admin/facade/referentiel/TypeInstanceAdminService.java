package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeInstance;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeInstanceVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeInstanceAdminService extends AbstractService<TypeInstance,Long,TypeInstanceVo>{


    /**
    * find TypeInstance from database by code (reference)
    * @param code - reference of TypeInstance
    * @return the founded TypeInstance , If no TypeInstance were
    *         found in database return  null.
    */
    TypeInstance findByCode(String code);

    /**
    * find TypeInstance from database by id (PK) or code (reference)
    * @param id - id of TypeInstance
    * @param code - reference of TypeInstance
    * @return the founded TypeInstance , If no TypeInstance were
    *         found in database return  null.
    */
    TypeInstance findByIdOrCode(TypeInstance typeInstance);


/**
    * delete TypeInstance from database
    * @param id - id of TypeInstance to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeInstance from database by code (reference)
    *
    * @param code - reference of TypeInstance to be deleted
    * @return 1 if TypeInstance deleted successfully
    */
    int deleteByCode(String code);



}
