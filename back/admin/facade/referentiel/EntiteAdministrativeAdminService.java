package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.EntiteAdministrative;
import com.ird.faa.ws.rest.provided.vo.referentiel.EntiteAdministrativeVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EntiteAdministrativeAdminService extends AbstractService<EntiteAdministrative,Long,EntiteAdministrativeVo>{


    /**
    * find EntiteAdministrative from database by code (reference)
    * @param code - reference of EntiteAdministrative
    * @return the founded EntiteAdministrative , If no EntiteAdministrative were
    *         found in database return  null.
    */
    EntiteAdministrative findByCode(String code);

    /**
    * find EntiteAdministrative from database by id (PK) or code (reference)
    * @param id - id of EntiteAdministrative
    * @param code - reference of EntiteAdministrative
    * @return the founded EntiteAdministrative , If no EntiteAdministrative were
    *         found in database return  null.
    */
    EntiteAdministrative findByIdOrCode(EntiteAdministrative entiteAdministrative);


/**
    * delete EntiteAdministrative from database
    * @param id - id of EntiteAdministrative to be deleted
    *
    */
    int deleteById(Long id);


    List<EntiteAdministrative> findByTypeEntiteAdministrativeCode(String code);

    int deleteByTypeEntiteAdministrativeCode(String code);

    List<EntiteAdministrative> findByTypeEntiteAdministrativeId(Long id);

    int deleteByTypeEntiteAdministrativeId(Long id);


    /**
    * delete EntiteAdministrative from database by code (reference)
    *
    * @param code - reference of EntiteAdministrative to be deleted
    * @return 1 if EntiteAdministrative deleted successfully
    */
    int deleteByCode(String code);



}
