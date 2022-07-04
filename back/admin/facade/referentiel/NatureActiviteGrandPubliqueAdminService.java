package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.NatureActiviteGrandPublique;
import com.ird.faa.ws.rest.provided.vo.referentiel.NatureActiviteGrandPubliqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface NatureActiviteGrandPubliqueAdminService extends AbstractService<NatureActiviteGrandPublique,Long,NatureActiviteGrandPubliqueVo>{


    /**
    * find NatureActiviteGrandPublique from database by code (reference)
    * @param code - reference of NatureActiviteGrandPublique
    * @return the founded NatureActiviteGrandPublique , If no NatureActiviteGrandPublique were
    *         found in database return  null.
    */
    NatureActiviteGrandPublique findByCode(String code);

    /**
    * find NatureActiviteGrandPublique from database by id (PK) or code (reference)
    * @param id - id of NatureActiviteGrandPublique
    * @param code - reference of NatureActiviteGrandPublique
    * @return the founded NatureActiviteGrandPublique , If no NatureActiviteGrandPublique were
    *         found in database return  null.
    */
    NatureActiviteGrandPublique findByIdOrCode(NatureActiviteGrandPublique natureActiviteGrandPublique);


/**
    * delete NatureActiviteGrandPublique from database
    * @param id - id of NatureActiviteGrandPublique to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete NatureActiviteGrandPublique from database by code (reference)
    *
    * @param code - reference of NatureActiviteGrandPublique to be deleted
    * @return 1 if NatureActiviteGrandPublique deleted successfully
    */
    int deleteByCode(String code);





}
