package com.ird.faa.service.admin.facade.formulaire;

import com.ird.faa.bean.formulaire.CommissionScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.CommissionScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommissionScientifiqueAdminService extends AbstractService<CommissionScientifique,Long,CommissionScientifiqueVo>{


    /**
    * find CommissionScientifique from database by code (reference)
    * @param code - reference of CommissionScientifique
    * @return the founded CommissionScientifique , If no CommissionScientifique were
    *         found in database return  null.
    */
    CommissionScientifique findByCode(String code);

    /**
    * find CommissionScientifique from database by id (PK) or code (reference)
    * @param id - id of CommissionScientifique
    * @param code - reference of CommissionScientifique
    * @return the founded CommissionScientifique , If no CommissionScientifique were
    *         found in database return  null.
    */
    CommissionScientifique findByIdOrCode(CommissionScientifique commissionScientifique);


/**
    * delete CommissionScientifique from database
    * @param id - id of CommissionScientifique to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete CommissionScientifique from database by code (reference)
    *
    * @param code - reference of CommissionScientifique to be deleted
    * @return 1 if CommissionScientifique deleted successfully
    */
    int deleteByCode(String code);



}
