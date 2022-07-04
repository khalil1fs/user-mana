package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Organisme;
import com.ird.faa.ws.rest.provided.vo.referentiel.OrganismeVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface OrganismeAdminService extends AbstractService<Organisme,Long,OrganismeVo>{


    /**
    * find Organisme from database by code (reference)
    * @param code - reference of Organisme
    * @return the founded Organisme , If no Organisme were
    *         found in database return  null.
    */
    Organisme findByCode(String code);

    /**
    * find Organisme from database by id (PK) or code (reference)
    * @param id - id of Organisme
    * @param code - reference of Organisme
    * @return the founded Organisme , If no Organisme were
    *         found in database return  null.
    */
    Organisme findByIdOrCode(Organisme organisme);


/**
    * delete Organisme from database
    * @param id - id of Organisme to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Organisme from database by code (reference)
    *
    * @param code - reference of Organisme to be deleted
    * @return 1 if Organisme deleted successfully
    */
    int deleteByCode(String code);



}
