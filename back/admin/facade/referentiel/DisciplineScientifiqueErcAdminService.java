package com.ird.faa.service.admin.facade.referentiel;

import java.util.List;
import com.ird.faa.bean.referentiel.DisciplineScientifiqueErc;
import com.ird.faa.ws.rest.provided.vo.referentiel.DisciplineScientifiqueErcVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DisciplineScientifiqueErcAdminService extends AbstractService<DisciplineScientifiqueErc,Long,DisciplineScientifiqueErcVo>{


    /**
    * find DisciplineScientifiqueErc from database by code (reference)
    * @param code - reference of DisciplineScientifiqueErc
    * @return the founded DisciplineScientifiqueErc , If no DisciplineScientifiqueErc were
    *         found in database return  null.
    */
    DisciplineScientifiqueErc findByCode(String code);

    /**
    * find DisciplineScientifiqueErc from database by id (PK) or code (reference)
    * @param id - id of DisciplineScientifiqueErc
    * @param code - reference of DisciplineScientifiqueErc
    * @return the founded DisciplineScientifiqueErc , If no DisciplineScientifiqueErc were
    *         found in database return  null.
    */
    DisciplineScientifiqueErc findByIdOrCode(DisciplineScientifiqueErc disciplineScientifiqueErc);


/**
    * delete DisciplineScientifiqueErc from database
    * @param id - id of DisciplineScientifiqueErc to be deleted
    *
    */
    int deleteById(Long id);


    List<DisciplineScientifiqueErc> findByDisciplineScientifiqueErcCode(String code);

    int deleteByDisciplineScientifiqueErcCode(String code);

    List<DisciplineScientifiqueErc> findByDisciplineScientifiqueErcId(Long id);

    int deleteByDisciplineScientifiqueErcId(Long id);


    /**
    * delete DisciplineScientifiqueErc from database by code (reference)
    *
    * @param code - reference of DisciplineScientifiqueErc to be deleted
    * @return 1 if DisciplineScientifiqueErc deleted successfully
    */
    int deleteByCode(String code);




    DisciplineScientifiqueErc archiver(DisciplineScientifiqueErc disciplineScientifiqueErc) ;
    DisciplineScientifiqueErc desarchiver(DisciplineScientifiqueErc disciplineScientifiqueErc);

}
