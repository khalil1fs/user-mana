package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.FormationContinuePubliqueProfessionel;
import com.ird.faa.ws.rest.provided.vo.formulaire.FormationContinuePubliqueProfessionelVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface FormationContinuePubliqueProfessionelAdminService extends AbstractService<FormationContinuePubliqueProfessionel,Long,FormationContinuePubliqueProfessionelVo>{




/**
    * delete FormationContinuePubliqueProfessionel from database
    * @param id - id of FormationContinuePubliqueProfessionel to be deleted
    *
    */
    int deleteById(Long id);



    List<FormationContinuePubliqueProfessionel> findByFormationContinueId(Long id);

    int deleteByFormationContinueId(Long id);

    List<FormationContinuePubliqueProfessionel> findByPubliqueProfessionelId(Long id);

    int deleteByPubliqueProfessionelId(Long id);







}
