package com.ird.faa.service.admin.facade.formulaire;

import com.ird.faa.bean.formulaire.StructureOganisatrice;
import com.ird.faa.service.core.facade.AbstractService;
import com.ird.faa.ws.rest.provided.vo.formulaire.StructureOganisatriceVo;

import java.util.List;

public interface StructureOganisatriceAdminService extends AbstractService<StructureOganisatrice,Long,StructureOganisatriceVo>{




/**
    * delete StructureOganisatrice from database
    * @param id - id of StructureOganisatrice to be deleted
    *
    */
    int deleteById(Long id);



    List<StructureOganisatrice> findByRencontreGrandPubliqueJeunePubliqueId(Long id);

    int deleteByRencontreGrandPubliqueJeunePubliqueId(Long id);
    List<StructureOganisatrice> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<StructureOganisatrice> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);







}
