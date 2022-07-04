package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.VieInstitutionnelleDetailEtablissement;
import com.ird.faa.ws.rest.provided.vo.formulaire.VieInstitutionnelleDetailEtablissementVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface VieInstitutionnelleDetailEtablissementAdminService extends AbstractService<VieInstitutionnelleDetailEtablissement,Long,VieInstitutionnelleDetailEtablissementVo>{




/**
    * delete VieInstitutionnelleDetailEtablissement from database
    * @param id - id of VieInstitutionnelleDetailEtablissement to be deleted
    *
    */
    int deleteById(Long id);



    List<VieInstitutionnelleDetailEtablissement> findByVieInstitutionnelleDetailId(Long id);

    int deleteByVieInstitutionnelleDetailId(Long id);
    List<VieInstitutionnelleDetailEtablissement> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<VieInstitutionnelleDetailEtablissement> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);





}
