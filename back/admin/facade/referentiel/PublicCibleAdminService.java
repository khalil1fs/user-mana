package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.PublicCible;
import com.ird.faa.ws.rest.provided.vo.referentiel.PublicCibleVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PublicCibleAdminService extends AbstractService<PublicCible,Long,PublicCibleVo>{


    /**
    * find PublicCible from database by code (reference)
    * @param code - reference of PublicCible
    * @return the founded PublicCible , If no PublicCible were
    *         found in database return  null.
    */
    PublicCible findByCode(String code);

    /**
    * find PublicCible from database by id (PK) or code (reference)
    * @param id - id of PublicCible
    * @param code - reference of PublicCible
    * @return the founded PublicCible , If no PublicCible were
    *         found in database return  null.
    */
    PublicCible findByIdOrCode(PublicCible publicCible);


/**
    * delete PublicCible from database
    * @param id - id of PublicCible to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete PublicCible from database by code (reference)
    *
    * @param code - reference of PublicCible to be deleted
    * @return 1 if PublicCible deleted successfully
    */
    int deleteByCode(String code);



}
