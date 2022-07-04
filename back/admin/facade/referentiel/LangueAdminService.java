package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Langue;
import com.ird.faa.ws.rest.provided.vo.referentiel.LangueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface LangueAdminService extends AbstractService<Langue,Long,LangueVo>{


    /**
    * find Langue from database by code (reference)
    * @param code - reference of Langue
    * @return the founded Langue , If no Langue were
    *         found in database return  null.
    */
    Langue findByCode(String code);

    /**
    * find Langue from database by id (PK) or code (reference)
    * @param id - id of Langue
    * @param code - reference of Langue
    * @return the founded Langue , If no Langue were
    *         found in database return  null.
    */
    Langue findByIdOrCode(Langue langue);


/**
    * delete Langue from database
    * @param id - id of Langue to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Langue from database by code (reference)
    *
    * @param code - reference of Langue to be deleted
    * @return 1 if Langue deleted successfully
    */
    int deleteByCode(String code);





}
