package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.EtablissementPartenaire;
import com.ird.faa.ws.rest.provided.vo.referentiel.EtablissementPartenaireVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtablissementPartenaireAdminService extends AbstractService<EtablissementPartenaire,Long,EtablissementPartenaireVo>{


    /**
    * find EtablissementPartenaire from database by code (reference)
    * @param code - reference of EtablissementPartenaire
    * @return the founded EtablissementPartenaire , If no EtablissementPartenaire were
    *         found in database return  null.
    */
    EtablissementPartenaire findByCode(String code);

    /**
    * find EtablissementPartenaire from database by id (PK) or code (reference)
    * @param id - id of EtablissementPartenaire
    * @param code - reference of EtablissementPartenaire
    * @return the founded EtablissementPartenaire , If no EtablissementPartenaire were
    *         found in database return  null.
    */
    EtablissementPartenaire findByIdOrCode(EtablissementPartenaire etablissementPartenaire);


/**
    * delete EtablissementPartenaire from database
    * @param id - id of EtablissementPartenaire to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete EtablissementPartenaire from database by code (reference)
    *
    * @param code - reference of EtablissementPartenaire to be deleted
    * @return 1 if EtablissementPartenaire deleted successfully
    */
    int deleteByCode(String code);



}
