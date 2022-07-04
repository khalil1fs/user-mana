package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EncadrementDoctorant;
import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementDoctorantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EncadrementDoctorantAdminService extends AbstractService<EncadrementDoctorant,Long,EncadrementDoctorantVo>{




/**
    * delete EncadrementDoctorant from database
    * @param id - id of EncadrementDoctorant to be deleted
    *
    */
    int deleteById(Long id);


    List<EncadrementDoctorant> findByResponsabiliteEncadrementDoctorantCode(String code);

    int deleteByResponsabiliteEncadrementDoctorantCode(String code);

    List<EncadrementDoctorant> findByResponsabiliteEncadrementDoctorantId(Long id);

    int deleteByResponsabiliteEncadrementDoctorantId(Long id);
    
    List<EncadrementDoctorant> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<EncadrementDoctorant> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<EncadrementDoctorant> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<EncadrementDoctorant> findByPaysId(Long id);

    int deleteByPaysId(Long id);

    List<EncadrementDoctorant> findByDoctorantId(Long id);

    int deleteByDoctorantId(Long id);

    List<EncadrementDoctorant> findByEncadrementId(Long id);

    int deleteByEncadrementId(Long id);
    List<EncadrementDoctorant> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<EncadrementDoctorant> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);







}
