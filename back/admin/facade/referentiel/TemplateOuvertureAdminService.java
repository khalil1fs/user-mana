package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TemplateOuverture;
import com.ird.faa.ws.rest.provided.vo.referentiel.TemplateOuvertureVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TemplateOuvertureAdminService extends AbstractService<TemplateOuverture,Long,TemplateOuvertureVo>{


    /**
    * find TemplateOuverture from database by code (reference)
    * @param code - reference of TemplateOuverture
    * @return the founded TemplateOuverture , If no TemplateOuverture were
    *         found in database return  null.
    */
    TemplateOuverture findByCode(String code);

    /**
    * find TemplateOuverture from database by id (PK) or code (reference)
    * @param id - id of TemplateOuverture
    * @param code - reference of TemplateOuverture
    * @return the founded TemplateOuverture , If no TemplateOuverture were
    *         found in database return  null.
    */
    TemplateOuverture findByIdOrCode(TemplateOuverture templateOuverture);


/**
    * delete TemplateOuverture from database
    * @param id - id of TemplateOuverture to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TemplateOuverture from database by code (reference)
    *
    * @param code - reference of TemplateOuverture to be deleted
    * @return 1 if TemplateOuverture deleted successfully
    */
    int deleteByCode(String code);



}
