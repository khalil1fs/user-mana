package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CampagneRelanceChercheur;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneRelanceChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CampagneRelanceChercheurAdminService extends AbstractService<CampagneRelanceChercheur,Long,CampagneRelanceChercheurVo>{




/**
    * delete CampagneRelanceChercheur from database
    * @param id - id of CampagneRelanceChercheur to be deleted
    *
    */
    int deleteById(Long id);


    List<CampagneRelanceChercheur> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<CampagneRelanceChercheur> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);

    List<CampagneRelanceChercheur> findByCampagneRelanceId(Long id);

    int deleteByCampagneRelanceId(Long id);
    
  
    





}
