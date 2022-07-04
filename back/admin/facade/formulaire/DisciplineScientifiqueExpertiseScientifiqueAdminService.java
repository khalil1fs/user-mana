package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueExpertiseScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueExpertiseScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DisciplineScientifiqueExpertiseScientifiqueAdminService extends AbstractService<DisciplineScientifiqueExpertiseScientifique,Long,DisciplineScientifiqueExpertiseScientifiqueVo>{




/**
    * delete DisciplineScientifiqueExpertiseScientifique from database
    * @param id - id of DisciplineScientifiqueExpertiseScientifique to be deleted
    *
    */
    int deleteById(Long id);


    List<DisciplineScientifiqueExpertiseScientifique> findByDisciplineScientifiqueCode(String code);

    int deleteByDisciplineScientifiqueCode(String code);

    List<DisciplineScientifiqueExpertiseScientifique> findByDisciplineScientifiqueId(Long id);

    int deleteByDisciplineScientifiqueId(Long id);
    List<DisciplineScientifiqueExpertiseScientifique> findByExpertiseScientifiqueAnnee(Integer annee);

    int deleteByExpertiseScientifiqueAnnee(Integer annee);

    List<DisciplineScientifiqueExpertiseScientifique> findByExpertiseScientifiqueId(Long id);

    int deleteByExpertiseScientifiqueId(Long id);





}
