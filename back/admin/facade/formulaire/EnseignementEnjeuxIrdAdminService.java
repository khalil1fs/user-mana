package com.ird.faa.service.admin.facade.formulaire;

import java.util.List;
import com.ird.faa.bean.formulaire.EnseignementEnjeuxIrd;
import com.ird.faa.ws.rest.provided.vo.formulaire.EnseignementEnjeuxIrdVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface EnseignementEnjeuxIrdAdminService extends AbstractService<EnseignementEnjeuxIrd,Long,EnseignementEnjeuxIrdVo>{




/**
    * delete EnseignementEnjeuxIrd from database
    * @param id - id of EnseignementEnjeuxIrd to be deleted
    *
    */
    int deleteById(Long id);



    List<EnseignementEnjeuxIrd> findByEnseignementId(Long id);

    int deleteByEnseignementId(Long id);
    List<EnseignementEnjeuxIrd> findByEnjeuxIrdCode(String code);

    int deleteByEnjeuxIrdCode(String code);

    List<EnseignementEnjeuxIrd> findByEnjeuxIrdId(Long id);

    int deleteByEnjeuxIrdId(Long id);







}
