package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EnseignementEtFormation;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementEtFormationVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnseignementEtFormationAdminService extends AbstractService<EnseignementEtFormation,Long,EnseignementEtFormationVo>{




/**
    * delete EnseignementEtFormation from database
    * @param id - id of EnseignementEtFormation to be deleted
    *
    */
    int deleteById(Long id);


    List<EnseignementEtFormation> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<EnseignementEtFormation> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);
    List<EnseignementEtFormation> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<EnseignementEtFormation> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<EnseignementEtFormation> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<EnseignementEtFormation> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);







}
