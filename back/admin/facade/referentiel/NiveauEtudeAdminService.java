package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.NiveauEtude;
import com.ird.faa.ws.rest.provided.vo.referentiel.NiveauEtudeVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface NiveauEtudeAdminService extends AbstractService<NiveauEtude,Long,NiveauEtudeVo>{


    /**
    * find NiveauEtude from database by code (reference)
    * @param code - reference of NiveauEtude
    * @return the founded NiveauEtude , If no NiveauEtude were
    *         found in database return  null.
    */
    NiveauEtude findByCode(String code);

    /**
    * find NiveauEtude from database by id (PK) or code (reference)
    * @param id - id of NiveauEtude
    * @param code - reference of NiveauEtude
    * @return the founded NiveauEtude , If no NiveauEtude were
    *         found in database return  null.
    */
    NiveauEtude findByIdOrCode(NiveauEtude niveauEtude);


/**
    * delete NiveauEtude from database
    * @param id - id of NiveauEtude to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete NiveauEtude from database by code (reference)
    *
    * @param code - reference of NiveauEtude to be deleted
    * @return 1 if NiveauEtude deleted successfully
    */
    int deleteByCode(String code);



}
