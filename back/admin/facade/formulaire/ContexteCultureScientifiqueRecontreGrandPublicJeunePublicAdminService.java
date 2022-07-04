package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublic;
import com.ird.faa.ws.rest.provided.vo.formulaire.ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ContexteCultureScientifiqueRecontreGrandPublicJeunePublicAdminService extends AbstractService<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic,Long,ContexteCultureScientifiqueRecontreGrandPublicJeunePublicVo>{




/**
    * delete ContexteCultureScientifiqueRecontreGrandPublicJeunePublic from database
    * @param id - id of ContexteCultureScientifiqueRecontreGrandPublicJeunePublic to be deleted
    *
    */
    int deleteById(Long id);



    List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);

    int deleteByCultureScientifiqueRecontreGrandPublicJeunePublicId(Long id);
    List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findByContexteCode(String code);

    int deleteByContexteCode(String code);

    List<ContexteCultureScientifiqueRecontreGrandPublicJeunePublic> findByContexteId(Long id);

    int deleteByContexteId(Long id);





}
