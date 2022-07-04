package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.Encadrement;
import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EncadrementAdminService extends AbstractService<Encadrement,Long,EncadrementVo>{




/**
    * delete Encadrement from database
    * @param id - id of Encadrement to be deleted
    *
    */
    int deleteById(Long id);


    List<Encadrement> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<Encadrement> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<Encadrement> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<Encadrement> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<Encadrement> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<Encadrement> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);







}
