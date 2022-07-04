package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.TypeParticipation;
import com.ird.faa.ws.rest.provided.vo.referentiel.TypeParticipationVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TypeParticipationAdminService extends AbstractService<TypeParticipation,Long,TypeParticipationVo>{


    /**
    * find TypeParticipation from database by code (reference)
    * @param code - reference of TypeParticipation
    * @return the founded TypeParticipation , If no TypeParticipation were
    *         found in database return  null.
    */
    TypeParticipation findByCode(String code);

    /**
    * find TypeParticipation from database by id (PK) or code (reference)
    * @param id - id of TypeParticipation
    * @param code - reference of TypeParticipation
    * @return the founded TypeParticipation , If no TypeParticipation were
    *         found in database return  null.
    */
    TypeParticipation findByIdOrCode(TypeParticipation typeParticipation);


/**
    * delete TypeParticipation from database
    * @param id - id of TypeParticipation to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete TypeParticipation from database by code (reference)
    *
    * @param code - reference of TypeParticipation to be deleted
    * @return 1 if TypeParticipation deleted successfully
    */
    int deleteByCode(String code);





}
