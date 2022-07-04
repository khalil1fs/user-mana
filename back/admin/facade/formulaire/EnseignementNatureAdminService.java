package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EnseignementNature;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementNatureVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnseignementNatureAdminService extends AbstractService<EnseignementNature,Long,EnseignementNatureVo>{




/**
    * delete EnseignementNature from database
    * @param id - id of EnseignementNature to be deleted
    *
    */
    int deleteById(Long id);


    List<EnseignementNature> findByNatureEnseignementCode(String code);

    int deleteByNatureEnseignementCode(String code);

    List<EnseignementNature> findByNatureEnseignementId(Long id);

    int deleteByNatureEnseignementId(Long id);

    List<EnseignementNature> findByEnseignementId(Long id);

    int deleteByEnseignementId(Long id);







}
