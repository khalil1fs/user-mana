package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.Enseignement;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnseignementAdminService extends AbstractService<Enseignement,Long,EnseignementVo>{




/**
    * delete Enseignement from database
    * @param id - id of Enseignement to be deleted
    *
    */
    int deleteById(Long id);


    List<Enseignement> findByModaliteEtudeCode(String code);

    int deleteByModaliteEtudeCode(String code);

    List<Enseignement> findByModaliteEtudeId(Long id);

    int deleteByModaliteEtudeId(Long id);
    List<Enseignement> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<Enseignement> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);

    List<Enseignement> findByEnseignementEtFormationId(Long id);

    int deleteByEnseignementEtFormationId(Long id);







}
