package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Corps;
import com.ird.faa.ws.rest.provided.vo.referentiel.CorpsVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CorpsAdminService extends AbstractService<Corps,Long,CorpsVo>{


    /**
    * find Corps from database by code (reference)
    * @param code - reference of Corps
    * @return the founded Corps , If no Corps were
    *         found in database return  null.
    */
    Corps findByCode(String code);

    /**
    * find Corps from database by id (PK) or code (reference)
    * @param id - id of Corps
    * @param code - reference of Corps
    * @return the founded Corps , If no Corps were
    *         found in database return  null.
    */
    Corps findByIdOrCode(Corps corps);


/**
    * delete Corps from database
    * @param id - id of Corps to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Corps from database by code (reference)
    *
    * @param code - reference of Corps to be deleted
    * @return 1 if Corps deleted successfully
    */
    int deleteByCode(String code);



}
