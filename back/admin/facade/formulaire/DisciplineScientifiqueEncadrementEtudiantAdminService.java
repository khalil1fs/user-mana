package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEncadrementEtudiant;
import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueEncadrementEtudiantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DisciplineScientifiqueEncadrementEtudiantAdminService extends AbstractService<DisciplineScientifiqueEncadrementEtudiant,Long,DisciplineScientifiqueEncadrementEtudiantVo>{




/**
    * delete DisciplineScientifiqueEncadrementEtudiant from database
    * @param id - id of DisciplineScientifiqueEncadrementEtudiant to be deleted
    *
    */
    int deleteById(Long id);


    List<DisciplineScientifiqueEncadrementEtudiant> findByDisciplineScientifiqueCode(String code);

    int deleteByDisciplineScientifiqueCode(String code);

    List<DisciplineScientifiqueEncadrementEtudiant> findByDisciplineScientifiqueId(Long id);

    int deleteByDisciplineScientifiqueId(Long id);

    List<DisciplineScientifiqueEncadrementEtudiant> findByEncadrementEtudiantId(Long id);

    int deleteByEncadrementEtudiantId(Long id);





}
