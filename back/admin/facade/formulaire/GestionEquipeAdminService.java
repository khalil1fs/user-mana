package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;

import com.ird.faa.bean.formulaire.GestionEquipe;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.GestionEquipeVo;

public interface GestionEquipeAdminService extends AbstractService<GestionEquipe,Long,GestionEquipeVo>{




/**
    * delete GestionEquipe from database
    * @param id - id of GestionEquipe to be deleted
    *
    */
    int deleteById(Long id);


    List<GestionEquipe> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<GestionEquipe> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<GestionEquipe> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<GestionEquipe> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<GestionEquipe> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<GestionEquipe> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);






}
