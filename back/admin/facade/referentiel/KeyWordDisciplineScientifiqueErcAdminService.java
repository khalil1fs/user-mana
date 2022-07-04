package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;

import com.ird.faa.bean.referentiel.KeyWordDisciplineScientifiqueErc;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.KeyWordDisciplineScientifiqueErcVo;

public interface KeyWordDisciplineScientifiqueErcAdminService extends AbstractService<KeyWordDisciplineScientifiqueErc,Long,KeyWordDisciplineScientifiqueErcVo>{




/**
    * delete KeyWordDisciplineScientifiqueErc from database
    * @param id - id of KeyWordDisciplineScientifiqueErc to be deleted
    *
    */
    int deleteById(Long id);


    List<KeyWordDisciplineScientifiqueErc> findByKeyWordCode(String code);

    int deleteByKeyWordCode(String code);

    List<KeyWordDisciplineScientifiqueErc> findByKeyWordId(Long id);

    int deleteByKeyWordId(Long id);
    List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcCode(String code);

    int deleteByDisciplineScientifiqueErcCode(String code);

    List<KeyWordDisciplineScientifiqueErc> findByDisciplineScientifiqueErcId(Long id);

    int deleteByDisciplineScientifiqueErcId(Long id);







}
