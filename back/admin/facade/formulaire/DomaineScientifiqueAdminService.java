package com.ird.faa.service.admin.facade.formulaire;

import com.ird.faa.bean.formulaire.DomaineScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.DomaineScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DomaineScientifiqueAdminService extends AbstractService<DomaineScientifique,Long,DomaineScientifiqueVo>{


    /**
    * find DomaineScientifique from database by code (reference)
    * @param code - reference of DomaineScientifique
    * @return the founded DomaineScientifique , If no DomaineScientifique were
    *         found in database return  null.
    */
    DomaineScientifique findByCode(String code);

    /**
    * find DomaineScientifique from database by id (PK) or code (reference)
    * @param id - id of DomaineScientifique
    * @param code - reference of DomaineScientifique
    * @return the founded DomaineScientifique , If no DomaineScientifique were
    *         found in database return  null.
    */
    DomaineScientifique findByIdOrCode(DomaineScientifique domaineScientifique);


/**
    * delete DomaineScientifique from database
    * @param id - id of DomaineScientifique to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete DomaineScientifique from database by code (reference)
    *
    * @param code - reference of DomaineScientifique to be deleted
    * @return 1 if DomaineScientifique deleted successfully
    */
    int deleteByCode(String code);



}
