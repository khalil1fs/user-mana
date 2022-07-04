package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Contexte;
import com.ird.faa.ws.rest.provided.vo.referentiel.ContexteVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ContexteAdminService extends AbstractService<Contexte,Long,ContexteVo>{


    /**
    * find Contexte from database by code (reference)
    * @param code - reference of Contexte
    * @return the founded Contexte , If no Contexte were
    *         found in database return  null.
    */
    Contexte findByCode(String code);

    /**
    * find Contexte from database by id (PK) or code (reference)
    * @param id - id of Contexte
    * @param code - reference of Contexte
    * @return the founded Contexte , If no Contexte were
    *         found in database return  null.
    */
    Contexte findByIdOrCode(Contexte contexte);


/**
    * delete Contexte from database
    * @param id - id of Contexte to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Contexte from database by code (reference)
    *
    * @param code - reference of Contexte to be deleted
    * @return 1 if Contexte deleted successfully
    */
    int deleteByCode(String code);



}
