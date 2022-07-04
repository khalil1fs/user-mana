package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.RoleEvaluationRechercheUniversitaire;
import com.ird.faa.ws.rest.provided.vo.referentiel.RoleEvaluationRechercheUniversitaireVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface RoleEvaluationRechercheUniversitaireAdminService extends AbstractService<RoleEvaluationRechercheUniversitaire,Long,RoleEvaluationRechercheUniversitaireVo>{


    /**
    * find RoleEvaluationRechercheUniversitaire from database by code (reference)
    * @param code - reference of RoleEvaluationRechercheUniversitaire
    * @return the founded RoleEvaluationRechercheUniversitaire , If no RoleEvaluationRechercheUniversitaire were
    *         found in database return  null.
    */
    RoleEvaluationRechercheUniversitaire findByCode(String code);

    /**
    * find RoleEvaluationRechercheUniversitaire from database by id (PK) or code (reference)
    * @param id - id of RoleEvaluationRechercheUniversitaire
    * @param code - reference of RoleEvaluationRechercheUniversitaire
    * @return the founded RoleEvaluationRechercheUniversitaire , If no RoleEvaluationRechercheUniversitaire were
    *         found in database return  null.
    */
    RoleEvaluationRechercheUniversitaire findByIdOrCode(RoleEvaluationRechercheUniversitaire roleEvaluationRechercheUniversitaire);


/**
    * delete RoleEvaluationRechercheUniversitaire from database
    * @param id - id of RoleEvaluationRechercheUniversitaire to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete RoleEvaluationRechercheUniversitaire from database by code (reference)
    *
    * @param code - reference of RoleEvaluationRechercheUniversitaire to be deleted
    * @return 1 if RoleEvaluationRechercheUniversitaire deleted successfully
    */
    int deleteByCode(String code);



}
