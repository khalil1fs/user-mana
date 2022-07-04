package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.NatureEnseignement;
import com.ird.faa.ws.rest.provided.vo.referentiel.NatureEnseignementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface NatureEnseignementAdminService extends AbstractService<NatureEnseignement,Long,NatureEnseignementVo>{


    /**
    * find NatureEnseignement from database by code (reference)
    * @param code - reference of NatureEnseignement
    * @return the founded NatureEnseignement , If no NatureEnseignement were
    *         found in database return  null.
    */
    NatureEnseignement findByCode(String code);

    /**
    * find NatureEnseignement from database by id (PK) or code (reference)
    * @param id - id of NatureEnseignement
    * @param code - reference of NatureEnseignement
    * @return the founded NatureEnseignement , If no NatureEnseignement were
    *         found in database return  null.
    */
    NatureEnseignement findByIdOrCode(NatureEnseignement natureEnseignement);


/**
    * delete NatureEnseignement from database
    * @param id - id of NatureEnseignement to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete NatureEnseignement from database by code (reference)
    *
    * @param code - reference of NatureEnseignement to be deleted
    * @return 1 if NatureEnseignement deleted successfully
    */
    int deleteByCode(String code);




    NatureEnseignement archiver(NatureEnseignement natureEnseignement) ;
    NatureEnseignement desarchiver(NatureEnseignement natureEnseignement);

}
