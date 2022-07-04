package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CampagneChercheurFermeture;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneChercheurFermetureVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CampagneChercheurFermetureAdminService extends AbstractService<CampagneChercheurFermeture,Long,CampagneChercheurFermetureVo>{




/**
    * delete CampagneChercheurFermeture from database
    * @param id - id of CampagneChercheurFermeture to be deleted
    *
    */
    int deleteById(Long id);


    List<CampagneChercheurFermeture> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<CampagneChercheurFermeture> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<CampagneChercheurFermeture> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<CampagneChercheurFermeture> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);





}
