package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EncadrementEtudiantDisciplineScientifique;
import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementEtudiantDisciplineScientifiqueVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EncadrementEtudiantDisciplineScientifiqueAdminService extends AbstractService<EncadrementEtudiantDisciplineScientifique,Long,EncadrementEtudiantDisciplineScientifiqueVo>{




/**
    * delete EncadrementEtudiantDisciplineScientifique from database
    * @param id - id of EncadrementEtudiantDisciplineScientifique to be deleted
    *
    */
    int deleteById(Long id);



    List<EncadrementEtudiantDisciplineScientifique> findByEncadrementEtudiantId(Long id);

    int deleteByEncadrementEtudiantId(Long id);
    List<EncadrementEtudiantDisciplineScientifique> findByDisciplineScientifiqueCode(String code);

    int deleteByDisciplineScientifiqueCode(String code);

    List<EncadrementEtudiantDisciplineScientifique> findByDisciplineScientifiqueId(Long id);

    int deleteByDisciplineScientifiqueId(Long id);







}
