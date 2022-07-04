package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.VieInstitutionnelle;
import com.ird.faa.ws.rest.provided.vo.formulaire.VieInstitutionnelleVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface VieInstitutionnelleAdminService extends AbstractService<VieInstitutionnelle,Long,VieInstitutionnelleVo>{




/**
    * delete VieInstitutionnelle from database
    * @param id - id of VieInstitutionnelle to be deleted
    *
    */
    int deleteById(Long id);


    List<VieInstitutionnelle> findByCampagneCode(String code);

    int deleteByCampagneCode(String code);

    List<VieInstitutionnelle> findByCampagneId(Long id);

    int deleteByCampagneId(Long id);
    List<VieInstitutionnelle> findByChercheurNumeroMatricule(String numeroMatricule);

    int deleteByChercheurNumeroMatricule(String numeroMatricule);

    List<VieInstitutionnelle> findByChercheurId(Long id);

    int deleteByChercheurId(Long id);
    List<VieInstitutionnelle> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<VieInstitutionnelle> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);





}
