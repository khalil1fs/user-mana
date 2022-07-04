package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.ModeDiffusion;
import com.ird.faa.ws.rest.provided.vo.referentiel.ModeDiffusionVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ModeDiffusionAdminService extends AbstractService<ModeDiffusion,Long,ModeDiffusionVo>{


    /**
    * find ModeDiffusion from database by code (reference)
    * @param code - reference of ModeDiffusion
    * @return the founded ModeDiffusion , If no ModeDiffusion were
    *         found in database return  null.
    */
    ModeDiffusion findByCode(String code);

    /**
    * find ModeDiffusion from database by id (PK) or code (reference)
    * @param id - id of ModeDiffusion
    * @param code - reference of ModeDiffusion
    * @return the founded ModeDiffusion , If no ModeDiffusion were
    *         found in database return  null.
    */
    ModeDiffusion findByIdOrCode(ModeDiffusion modeDiffusion);


/**
    * delete ModeDiffusion from database
    * @param id - id of ModeDiffusion to be deleted
    *
    */
    int deleteById(Long id);


    List<ModeDiffusion> findByTypeSavoirCode(String code);

    int deleteByTypeSavoirCode(String code);

    List<ModeDiffusion> findByTypeSavoirId(Long id);

    int deleteByTypeSavoirId(Long id);


    /**
    * delete ModeDiffusion from database by code (reference)
    *
    * @param code - reference of ModeDiffusion to be deleted
    * @return 1 if ModeDiffusion deleted successfully
    */
    int deleteByCode(String code);



}
