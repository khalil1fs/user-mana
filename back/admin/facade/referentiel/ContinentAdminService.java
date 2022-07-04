package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Continent;
import com.ird.faa.ws.rest.provided.vo.referentiel.ContinentVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ContinentAdminService extends AbstractService<Continent,Long,ContinentVo>{


    /**
    * find Continent from database by code (reference)
    * @param code - reference of Continent
    * @return the founded Continent , If no Continent were
    *         found in database return  null.
    */
    Continent findByCode(String code);

    /**
    * find Continent from database by id (PK) or code (reference)
    * @param id - id of Continent
    * @param code - reference of Continent
    * @return the founded Continent , If no Continent were
    *         found in database return  null.
    */
    Continent findByIdOrCode(Continent continent);


/**
    * delete Continent from database
    * @param id - id of Continent to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Continent from database by code (reference)
    *
    * @param code - reference of Continent to be deleted
    * @return 1 if Continent deleted successfully
    */
    int deleteByCode(String code);



}
