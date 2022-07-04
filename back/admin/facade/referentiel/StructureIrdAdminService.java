package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.StructureIrd;
import com.ird.faa.ws.rest.provided.vo.referentiel.StructureIrdVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface StructureIrdAdminService extends AbstractService<StructureIrd,Long,StructureIrdVo>{


    /**
    * find StructureIrd from database by code (reference)
    * @param code - reference of StructureIrd
    * @return the founded StructureIrd , If no StructureIrd were
    *         found in database return  null.
    */
    StructureIrd findByCode(String code);

    /**
    * find StructureIrd from database by id (PK) or code (reference)
    * @param id - id of StructureIrd
    * @param code - reference of StructureIrd
    * @return the founded StructureIrd , If no StructureIrd were
    *         found in database return  null.
    */
    StructureIrd findByIdOrCode(StructureIrd structureIrd);


/**
    * delete StructureIrd from database
    * @param id - id of StructureIrd to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete StructureIrd from database by code (reference)
    *
    * @param code - reference of StructureIrd to be deleted
    * @return 1 if StructureIrd deleted successfully
    */
    int deleteByCode(String code);



}
