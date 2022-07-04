package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.Pays;
import com.ird.faa.ws.rest.provided.vo.referentiel.PaysVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface PaysAdminService extends AbstractService<Pays,Long,PaysVo>{


    /**
    * find Pays from database by code (reference)
    * @param code - reference of Pays
    * @return the founded Pays , If no Pays were
    *         found in database return  null.
    */
    Pays findByCode(String code);

    /**
    * find Pays from database by id (PK) or code (reference)
    * @param id - id of Pays
    * @param code - reference of Pays
    * @return the founded Pays , If no Pays were
    *         found in database return  null.
    */
    Pays findByIdOrCode(Pays pays);


/**
    * delete Pays from database
    * @param id - id of Pays to be deleted
    *
    */
    int deleteById(Long id);


    List<Pays> findByContinentCode(String code);

    int deleteByContinentCode(String code);

    List<Pays> findByContinentId(Long id);

    int deleteByContinentId(Long id);


    /**
    * delete Pays from database by code (reference)
    *
    * @param code - reference of Pays to be deleted
    * @return 1 if Pays deleted successfully
    */
    int deleteByCode(String code);



}
