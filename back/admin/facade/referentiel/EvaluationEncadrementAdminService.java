package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.EvaluationEncadrement;
import com.ird.faa.ws.rest.provided.vo.referentiel.EvaluationEncadrementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EvaluationEncadrementAdminService extends AbstractService<EvaluationEncadrement,Long,EvaluationEncadrementVo>{


    /**
    * find EvaluationEncadrement from database by code (reference)
    * @param code - reference of EvaluationEncadrement
    * @return the founded EvaluationEncadrement , If no EvaluationEncadrement were
    *         found in database return  null.
    */
    EvaluationEncadrement findByCode(String code);

    /**
    * find EvaluationEncadrement from database by id (PK) or code (reference)
    * @param id - id of EvaluationEncadrement
    * @param code - reference of EvaluationEncadrement
    * @return the founded EvaluationEncadrement , If no EvaluationEncadrement were
    *         found in database return  null.
    */
    EvaluationEncadrement findByIdOrCode(EvaluationEncadrement evaluationEncadrement);


/**
    * delete EvaluationEncadrement from database
    * @param id - id of EvaluationEncadrement to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete EvaluationEncadrement from database by code (reference)
    *
    * @param code - reference of EvaluationEncadrement to be deleted
    * @return 1 if EvaluationEncadrement deleted successfully
    */
    int deleteByCode(String code);



}
