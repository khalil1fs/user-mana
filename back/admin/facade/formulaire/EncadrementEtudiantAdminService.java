package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EncadrementEtudiant;
import com.ird.faa.ws.rest.provided.vo.formulaire.EncadrementEtudiantVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EncadrementEtudiantAdminService extends AbstractService<EncadrementEtudiant,Long,EncadrementEtudiantVo>{




/**
    * delete EncadrementEtudiant from database
    * @param id - id of EncadrementEtudiant to be deleted
    *
    */
    int deleteById(Long id);


    List<EncadrementEtudiant> findByNiveauFormationPostBacCode(String code);

    int deleteByNiveauFormationPostBacCode(String code);

    List<EncadrementEtudiant> findByNiveauFormationPostBacId(Long id);

    int deleteByNiveauFormationPostBacId(Long id);
    List<EncadrementEtudiant> findByResponsabiliteEncadrementEtudiantCode(String code);

    int deleteByResponsabiliteEncadrementEtudiantCode(String code);

    List<EncadrementEtudiant> findByResponsabiliteEncadrementEtudiantId(Long id);

    int deleteByResponsabiliteEncadrementEtudiantId(Long id);
    List<EncadrementEtudiant> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<EncadrementEtudiant> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);
    List<EncadrementEtudiant> findByPaysCode(String code);

    int deleteByPaysCode(String code);

    List<EncadrementEtudiant> findByPaysId(Long id);

    int deleteByPaysId(Long id);

    List<EncadrementEtudiant> findByEncadrementId(Long id);

    int deleteByEncadrementId(Long id);
    List<EncadrementEtudiant> findByEtatEtapeCampagneCode(String code);

    int deleteByEtatEtapeCampagneCode(String code);

    List<EncadrementEtudiant> findByEtatEtapeCampagneId(Long id);

    int deleteByEtatEtapeCampagneId(Long id);







}
