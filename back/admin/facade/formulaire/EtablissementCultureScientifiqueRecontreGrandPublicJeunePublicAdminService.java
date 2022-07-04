package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic;
import com.ird.faa.ws.rest.provided.vo.formulaire.EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicAdminService extends AbstractService<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic,Long,EtablissementCultureScientifiqueRecontreGrandPublicJeunePublicVo>{




/**
    * delete EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic from database
    * @param id - id of EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic to be deleted
    *
    */
    int deleteById(Long id);



    List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);

    int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);
    List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findByEtablissementCode(String code);

    int deleteByEtablissementCode(String code);

    List<EtablissementCultureScientifiqueRecontreGrandPublicJeunePublic> findByEtablissementId(Long id);

    int deleteByEtablissementId(Long id);





}
