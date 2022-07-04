package com.ird.faa.service.admin.facade.referentiel;

import com.ird.faa.bean.referentiel.Grade;
import com.ird.faa.ws.rest.provided.vo.referentiel.GradeVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface GradeAdminService extends AbstractService<Grade,Long,GradeVo>{


    /**
    * find Grade from database by code (reference)
    * @param code - reference of Grade
    * @return the founded Grade , If no Grade were
    *         found in database return  null.
    */
    Grade findByCode(String code);

    /**
    * find Grade from database by id (PK) or code (reference)
    * @param id - id of Grade
    * @param code - reference of Grade
    * @return the founded Grade , If no Grade were
    *         found in database return  null.
    */
    Grade findByIdOrCode(Grade grade);


/**
    * delete Grade from database
    * @param id - id of Grade to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Grade from database by code (reference)
    *
    * @param code - reference of Grade to be deleted
    * @return 1 if Grade deleted successfully
    */
    int deleteByCode(String code);



}
