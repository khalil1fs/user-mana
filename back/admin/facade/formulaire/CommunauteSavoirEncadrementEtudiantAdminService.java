package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.CommunauteSavoirEncadrementEtudiant;
import com.ird.faa.ws.rest.provided.vo.formulaire.CommunauteSavoirEncadrementEtudiantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommunauteSavoirEncadrementEtudiantAdminService extends AbstractService<CommunauteSavoirEncadrementEtudiant,Long,CommunauteSavoirEncadrementEtudiantVo>{




/**
    * delete CommunauteSavoirEncadrementEtudiant from database
    * @param id - id of CommunauteSavoirEncadrementEtudiant to be deleted
    *
    */
    int deleteById(Long id);


    List<CommunauteSavoirEncadrementEtudiant> findByCommunauteSavoirCode(String code);

    int deleteByCommunauteSavoirCode(String code);

    List<CommunauteSavoirEncadrementEtudiant> findByCommunauteSavoirId(Long id);

    int deleteByCommunauteSavoirId(Long id);

    List<CommunauteSavoirEncadrementEtudiant> findByEncadrementEtudiantId(Long id);

    int deleteByEncadrementEtudiantId(Long id);





}
