package com.ird.faa.service.admin.facade.referentiel;


import com.ird.faa.bean.referentiel.DisciplineScientifique;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.referentiel.DisciplineScientifiqueVo;

import java.util.List;

public interface DisciplineScientifiqueAdminService extends AbstractService<DisciplineScientifique,Long, DisciplineScientifiqueVo> {


    /**
    * find DisciplineScientifique from database by code (reference)
    * @param code - reference of DisciplineScientifique
    * @return the founded DisciplineScientifique , If no DisciplineScientifique were
    *         found in database return  null.
    */
    DisciplineScientifique findByCode(String code);

    /**
    * find DisciplineScientifique from database by id (PK) or code (reference)
    * @param disciplineScientifique - id of DisciplineScientifique
    * @return the founded DisciplineScientifique , If no DisciplineScientifique were
    *         found in database return  null.
    */
    DisciplineScientifique findByIdOrCode(DisciplineScientifique disciplineScientifique);


/**
    * delete DisciplineScientifique from database
    * @param id - id of DisciplineScientifique to be deleted
    *
    */
    int deleteById(Long id);


    List<DisciplineScientifique> findAssociated(List<DisciplineScientifique> disciplineScientifiques);

    List<DisciplineScientifique> findByDisciplineScientifiqueCode(String code);

    int deleteByDisciplineScientifiqueCode(String code);

    List<DisciplineScientifique> findByDisciplineScientifiqueId(Long id);

    int deleteByDisciplineScientifiqueId(Long id);


    /**
    * delete DisciplineScientifique from database by code (reference)
    *
    * @param code - reference of DisciplineScientifique to be deleted
    * @return 1 if DisciplineScientifique deleted successfully
    */
    int deleteByCode(String code);




    DisciplineScientifique archiver(DisciplineScientifique disciplineScientifique) ;
    DisciplineScientifique desarchiver(DisciplineScientifique disciplineScientifique);

}
