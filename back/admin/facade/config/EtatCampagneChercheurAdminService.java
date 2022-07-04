package com.ird.faa.service.admin.facade.config;

import com.ird.faa.bean.config.EtatCampagneChercheur;
import com.ird.faa.ws.rest.provided.vo.config.EtatCampagneChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtatCampagneChercheurAdminService extends AbstractService<EtatCampagneChercheur,Long,EtatCampagneChercheurVo>{


    /**
    * find EtatCampagneChercheur from database by code (reference)
    * @param code - reference of EtatCampagneChercheur
    * @return the founded EtatCampagneChercheur , If no EtatCampagneChercheur were
    *         found in database return  null.
    */
    EtatCampagneChercheur findByCode(String code);

    /**
    * find EtatCampagneChercheur from database by id (PK) or code (reference)
    * @param id - id of EtatCampagneChercheur
    * @param code - reference of EtatCampagneChercheur
    * @return the founded EtatCampagneChercheur , If no EtatCampagneChercheur were
    *         found in database return  null.
    */
    EtatCampagneChercheur findByIdOrCode(EtatCampagneChercheur etatCampagneChercheur);


/**
    * delete EtatCampagneChercheur from database
    * @param id - id of EtatCampagneChercheur to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete EtatCampagneChercheur from database by code (reference)
    *
    * @param code - reference of EtatCampagneChercheur to be deleted
    * @return 1 if EtatCampagneChercheur deleted successfully
    */
    int deleteByCode(String code);



}
