package com.ird.faa.service.admin.facade.formulaire;

import com.ird.faa.bean.formulaire.DepartementScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.DepartementScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DepartementScientifiqueAdminService extends AbstractService<DepartementScientifique,Long,DepartementScientifiqueVo>{


    /**
    * find DepartementScientifique from database by code (reference)
    * @param code - reference of DepartementScientifique
    * @return the founded DepartementScientifique , If no DepartementScientifique were
    *         found in database return  null.
    */
    DepartementScientifique findByCode(String code);

    /**
    * find DepartementScientifique from database by id (PK) or code (reference)
    * @param id - id of DepartementScientifique
    * @param code - reference of DepartementScientifique
    * @return the founded DepartementScientifique , If no DepartementScientifique were
    *         found in database return  null.
    */
    DepartementScientifique findByIdOrCode(DepartementScientifique departementScientifique);


/**
    * delete DepartementScientifique from database
    * @param id - id of DepartementScientifique to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete DepartementScientifique from database by code (reference)
    *
    * @param code - reference of DepartementScientifique to be deleted
    * @return 1 if DepartementScientifique deleted successfully
    */
    int deleteByCode(String code);



}
