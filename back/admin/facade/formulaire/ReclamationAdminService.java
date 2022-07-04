package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.Reclamation;
import com.ird.faa.ws.rest.provided.vo.formulaire.ReclamationVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ReclamationAdminService extends AbstractService<Reclamation,Long,ReclamationVo>{




/**
    * delete Reclamation from database
    * @param id - id of Reclamation to be deleted
    *
    */
    int deleteById(Long id);


    List<Reclamation> findByEtatReclamationCode(String code);

    int deleteByEtatReclamationCode(String code);

    List<Reclamation> findByEtatReclamationId(Long id);

    int deleteByEtatReclamationId(Long id);
    List<Reclamation> findByTypeReclamationCode(String code);

    int deleteByTypeReclamationCode(String code);

    List<Reclamation> findByTypeReclamationId(Long id);

    int deleteByTypeReclamationId(Long id);
    List<Reclamation> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<Reclamation> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);





}
