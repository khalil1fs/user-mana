package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CommunauteSavoirChercheur;
import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirChercheurVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommunauteSavoirChercheurAdminService extends AbstractService<CommunauteSavoirChercheur,Long,CommunauteSavoirChercheurVo>{




/**
    * delete CommunauteSavoirChercheur from database
    * @param id - id of CommunauteSavoirChercheur to be deleted
    *
    */
    int deleteById(Long id);


    List<CommunauteSavoirChercheur> findByCommunauteSavoirCode(String code);

    int deleteByCommunauteSavoirCode(String code);

    List<CommunauteSavoirChercheur> findByCommunauteSavoirId(Long id);

    int deleteByCommunauteSavoirId(Long id);
    List<CommunauteSavoirChercheur> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<CommunauteSavoirChercheur> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);





}
