package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CampagneChercheur;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CampagneChercheurAdminService extends AbstractService<CampagneChercheur,Long,CampagneChercheurVo>{




/**
    * delete CampagneChercheur from database
    * @param id - id of CampagneChercheur to be deleted
    *
    */
    int deleteById(Long id);


    List<CampagneChercheur> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<CampagneChercheur> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<CampagneChercheur> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<CampagneChercheur> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<CampagneChercheur> findByEtatCampagneChercheurCode(String code);

    int deleteByEtatCampagneChercheurCode(String code);

    List<CampagneChercheur> findByEtatCampagneChercheurId(Long id);

    int deleteByEtatCampagneChercheurId(Long id);





}
