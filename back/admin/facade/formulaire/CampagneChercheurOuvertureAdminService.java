package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CampagneChercheurOuverture;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneChercheurOuvertureVo;import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CampagneChercheurOuvertureAdminService extends AbstractService<CampagneChercheurOuverture,Long,CampagneChercheurOuvertureVo>{




/**
    * delete CampagneChercheurOuverture from database
    * @param id - id of CampagneChercheurOuverture to be deleted
    *
    */
    int deleteById(Long id);


    List<CampagneChercheurOuverture> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<CampagneChercheurOuverture> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<CampagneChercheurOuverture> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<CampagneChercheurOuverture> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);

    List<ChercheurVo> findListChercheursByCampagneId(Long campagneId);



}
