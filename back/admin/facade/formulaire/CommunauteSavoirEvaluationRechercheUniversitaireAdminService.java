package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CommunauteSavoirEvaluationRechercheUniversitaire;
import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirEvaluationRechercheUniversitaireVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommunauteSavoirEvaluationRechercheUniversitaireAdminService extends AbstractService<CommunauteSavoirEvaluationRechercheUniversitaire,Long,CommunauteSavoirEvaluationRechercheUniversitaireVo>{




/**
    * delete CommunauteSavoirEvaluationRechercheUniversitaire from database
    * @param id - id of CommunauteSavoirEvaluationRechercheUniversitaire to be deleted
    *
    */
    int deleteById(Long id);


    List<CommunauteSavoirEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireAnnee(Integer annee);

    int deleteByEvaluationRechercheUniversitaireAnnee(Integer annee);

    List<CommunauteSavoirEvaluationRechercheUniversitaire> findByEvaluationRechercheUniversitaireId(Long id);

    int deleteByEvaluationRechercheUniversitaireId(Long id);
    List<CommunauteSavoirEvaluationRechercheUniversitaire> findByCommunauteSavoirCode(String code);

    int deleteByCommunauteSavoirCode(String code);

    List<CommunauteSavoirEvaluationRechercheUniversitaire> findByCommunauteSavoirId(Long id);

    int deleteByCommunauteSavoirId(Long id);





}
