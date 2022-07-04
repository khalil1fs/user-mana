package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CampagneRappelChercheur;
import com.ird.faa.ws.rest.provided.vo.formulaire.CampagneRappelChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CampagneRappelChercheurAdminService extends AbstractService<CampagneRappelChercheur,Long,CampagneRappelChercheurVo>{




/**
    * delete CampagneRappelChercheur from database
    * @param id - id of CampagneRappelChercheur to be deleted
    *
    */
    int deleteById(Long id);


    List<CampagneRappelChercheur> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<CampagneRappelChercheur> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);

    List<CampagneRappelChercheur> findByCampagneRappelId(Long id);

    int deleteByCampagneRappelId(Long id);





}
