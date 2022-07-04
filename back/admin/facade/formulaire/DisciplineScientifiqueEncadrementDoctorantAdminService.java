package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEncadrementDoctorant;
import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueEncadrementDoctorantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DisciplineScientifiqueEncadrementDoctorantAdminService extends AbstractService<DisciplineScientifiqueEncadrementDoctorant,Long,DisciplineScientifiqueEncadrementDoctorantVo>{




/**
    * delete DisciplineScientifiqueEncadrementDoctorant from database
    * @param id - id of DisciplineScientifiqueEncadrementDoctorant to be deleted
    *
    */
    int deleteById(Long id);



    List<DisciplineScientifiqueEncadrementDoctorant> findByEncadrementDoctorantId(Long id);

    int deleteByEncadrementDoctorantId(Long id);
    List<DisciplineScientifiqueEncadrementDoctorant> findByDisciplineScientifiqueCode(String code);

    int deleteByDisciplineScientifiqueCode(String code);

    List<DisciplineScientifiqueEncadrementDoctorant> findByDisciplineScientifiqueId(Long id);

    int deleteByDisciplineScientifiqueId(Long id);







}
