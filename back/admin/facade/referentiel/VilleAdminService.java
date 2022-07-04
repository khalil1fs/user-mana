package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.Ville;
import com.ird.faa.ws.rest.provided.vo.referentiel.VilleVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface VilleAdminService extends AbstractService<Ville,Long,VilleVo>{


    /**
    * find Ville from database by code (reference)
    * @param code - reference of Ville
    * @return the founded Ville , If no Ville were
    *         found in database return  null.
    */
    Ville findByCode(String code);

    /**
    * find Ville from database by id (PK) or code (reference)
    * @param id - id of Ville
    * @param code - reference of Ville
    * @return the founded Ville , If no Ville were
    *         found in database return  null.
    */
    Ville findByIdOrCode(Ville ville);


/**
    * delete Ville from database
    * @param id - id of Ville to be deleted
    *
    */
    int deleteById(Long id);


    List<Ville> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<Ville> findByPaysId(Long id);

    int deleteByPaysId(Long id);


    /**
    * delete Ville from database by code (reference)
    *
    * @param code - reference of Ville to be deleted
    * @return 1 if Ville deleted successfully
    */
    int deleteByCode(String code);



}
