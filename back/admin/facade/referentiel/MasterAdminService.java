package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.Master;
import com.ird.faa.ws.rest.provided.vo.referentiel.MasterVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface MasterAdminService extends AbstractService<Master,Long,MasterVo>{


    /**
    * find Master from database by code (reference)
    * @param code - reference of Master
    * @return the founded Master , If no Master were
    *         found in database return  null.
    */
    Master findByCode(String code);

    /**
    * find Master from database by id (PK) or code (reference)
    * @param id - id of Master
    * @param code - reference of Master
    * @return the founded Master , If no Master were
    *         found in database return  null.
    */
    Master findByIdOrCode(Master master);


/**
    * delete Master from database
    * @param id - id of Master to be deleted
    *
    */
    int deleteById(Long id);


    List<Master> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<Master> findByPaysId(Long id);

    int deleteByPaysId(Long id);


    /**
    * delete Master from database by code (reference)
    *
    * @param code - reference of Master to be deleted
    * @return 1 if Master deleted successfully
    */
    int deleteByCode(String code);



}
