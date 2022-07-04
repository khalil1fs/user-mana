package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Modalite;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModaliteVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ModaliteAdminService extends AbstractService<Modalite,Long,ModaliteVo>{


    /**
    * find Modalite from database by code (reference)
    * @param code - reference of Modalite
    * @return the founded Modalite , If no Modalite were
    *         found in database return  null.
    */
    Modalite findByCode(String code);

    /**
    * find Modalite from database by id (PK) or code (reference)
    * @param id - id of Modalite
    * @param code - reference of Modalite
    * @return the founded Modalite , If no Modalite were
    *         found in database return  null.
    */
    Modalite findByIdOrCode(Modalite modalite);


/**
    * delete Modalite from database
    * @param id - id of Modalite to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Modalite from database by code (reference)
    *
    * @param code - reference of Modalite to be deleted
    * @return 1 if Modalite deleted successfully
    */
    int deleteByCode(String code);



}
