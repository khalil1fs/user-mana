package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaire;
import com.ird.faa.ws.rest.provided.vo.formulaire.DisciplineScientifiqueEvaluationRechercheUniversitaireVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface DisciplineScientifiqueEvaluationRechercheUniversitaireAdminService extends AbstractService<DisciplineScientifiqueEvaluationRechercheUniversitaire,Long,DisciplineScientifiqueEvaluationRechercheUniversitaireVo>{




/**
    * delete DisciplineScientifiqueEvaluationRechercheUniversitaire from database
    * @param id - id of DisciplineScientifiqueEvaluationRechercheUniversitaire to be deleted
    *
    */
    int deleteById(Long id);


    List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByDisciplineScientifiqueCode(String code);

    int deleteByDisciplineScientifiqueCode(String code);

    List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByDisciplineScientifiqueId(Long id);

    int deleteByDisciplineScientifiqueId(Long id);
    List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireAnnee(Integer annee);

    int deleteByEvaluationRechercheUniversitaireAnnee(Integer annee);

    List<DisciplineScientifiqueEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireId(Long id);

    int deleteByEvaluationRechercheUniversitaireId(Long id);





}
